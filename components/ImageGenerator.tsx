import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import Spinner from './Spinner';
import { DownloadIcon } from './Icons';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageB64 = await generateImage(prompt);
      setGeneratedImage(`data:image/png;base64,${imageB64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A majestic lion wearing a crown in a futuristic city"
            className="flex-grow bg-gray-700 text-white placeholder-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center disabled:bg-purple-800 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Generate'}
          </button>
        </div>
      </form>

      {error && <div className="mt-6 p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-md">{error}</div>}

      <div className="mt-8 min-h-[400px] w-full aspect-square bg-gray-900/50 rounded-lg flex items-center justify-center p-4 border-2 border-dashed border-gray-600">
        {isLoading && (
          <div className="text-center">
            <Spinner className="w-12 h-12 mx-auto" />
            <p className="mt-4 text-gray-400">Generating your masterpiece...</p>
          </div>
        )}
        {!isLoading && generatedImage && (
          <div className="relative group">
            <img src={generatedImage} alt={prompt} className="rounded-md max-w-full max-h-[512px] shadow-lg" />
            <a
              href={generatedImage}
              download={`${prompt.slice(0, 30).replace(/\s/g, '_')}.png`}
              className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100"
              aria-label="Download image"
            >
              <DownloadIcon className="w-6 h-6" />
            </a>
          </div>
        )}
        {!isLoading && !generatedImage && (
          <div className="text-center text-gray-500">
            <p>Your generated image will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageGenerator;