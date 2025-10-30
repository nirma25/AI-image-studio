import React, { useState, useRef } from 'react';
import { removeBackground, fileToBase64 } from '../services/geminiService';
import Spinner from './Spinner';
import { UploadIcon, DownloadIcon } from './Icons';

const BackgroundRemover: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      setProcessedImage(null);
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: base64Data, mimeType } = await fileToBase64(imageFile);
      const resultB64 = await removeBackground(base64Data, mimeType);
      setProcessedImage(`data:image/png;base64,${resultB64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const triggerFileInput = () => {
      fileInputRef.current?.click();
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isLoading}
      />
      
      {!originalImage && (
        <button
          onClick={triggerFileInput}
          className="w-full min-h-[200px] border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300"
          disabled={isLoading}
        >
          <UploadIcon className="w-12 h-12 mb-4" />
          <span className="font-semibold">Click to upload an image</span>
          <span className="text-sm">PNG, JPG, WEBP, etc.</span>
        </button>
      )}

      {error && <div className="mt-6 p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-md">{error}</div>}

      {originalImage && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Original</h3>
              <div className="bg-gray-900/50 rounded-lg p-2 aspect-square flex items-center justify-center">
                <img src={originalImage} alt="Original" className="max-w-full max-h-full rounded-md object-contain" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Result</h3>
              <div className="bg-gray-900/50 rounded-lg p-2 aspect-square flex items-center justify-center bg-transparent" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23374151'%3e%3cpath d='M0 .5H32V32'/%3e%3c/svg%3e")`}}>
                {isLoading && (
                  <div className="text-center">
                    <Spinner className="w-12 h-12 mx-auto" />
                    <p className="mt-4 text-gray-400">Removing background...</p>
                  </div>
                )}
                {!isLoading && processedImage && (
                    <div className="relative group w-full h-full flex items-center justify-center">
                        <img src={processedImage} alt="Background removed" className="max-w-full max-h-full rounded-md object-contain" />
                         <a
                            href={processedImage}
                            download={`${imageFile?.name.split('.')[0]}_no_bg.png`}
                            className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100"
                            aria-label="Download image"
                        >
                            <DownloadIcon className="w-6 h-6" />
                        </a>
                    </div>
                )}
                {!isLoading && !processedImage && <p className="text-gray-500">Result will appear here</p>}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleRemoveBackground}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 w-full sm:w-auto flex items-center justify-center disabled:bg-purple-800 disabled:cursor-not-allowed"
              disabled={isLoading || !originalImage}
            >
              {isLoading ? <Spinner /> : 'Remove Background'}
            </button>
             <button
              onClick={triggerFileInput}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 w-full sm:w-auto"
              disabled={isLoading}
            >
              Choose Another Image
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default BackgroundRemover;