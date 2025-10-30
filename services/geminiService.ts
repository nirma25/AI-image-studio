import { GoogleGenAI, Modality } from "@google/genai";

export const fileToBase64 = (file: File): Promise<{mimeType: string, data: string}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const [mimePart, dataPart] = result.split(';base64,');
      if (!mimePart || !dataPart) {
        return reject(new Error("Invalid file format for base64 conversion."));
      }
      const mimeType = mimePart.split(':')[1];
      resolve({mimeType, data: dataPart});
    };
    reader.onerror = (error) => reject(error);
  });
};

const getAi = () => {
    // process.env.API_KEY is automatically injected
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateImage = async (prompt: string): Promise<string> => {
  const ai = getAi();
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/png',
      aspectRatio: '1:1',
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error('Image generation failed. No images were returned.');
  }

  const base64ImageBytes = response.generatedImages[0].image.imageBytes;
  return base64ImageBytes;
};

export const removeBackground = async (imageBase64: string, mimeType: string): Promise<string> => {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType,
          },
        },
        {
          text: 'Remove the background of this image. The main subject should be perfectly preserved. The background should be transparent.',
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  const firstPart = response.candidates?.[0]?.content?.parts?.[0];
  if (firstPart && firstPart.inlineData) {
    return firstPart.inlineData.data;
  }
  
  throw new Error('Background removal failed. The model did not return an image.');
};