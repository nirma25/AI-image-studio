import React, { useState } from 'react';
import Tabs from './components/Tabs';
import ImageGenerator from './components/ImageGenerator';
import BackgroundRemover from './components/BackgroundRemover';
import { SparklesIcon, ScissorsIcon } from './components/Icons';

const TABS = [
  { name: 'Image Generator', icon: <SparklesIcon /> },
  { name: 'Background Remover', icon: <ScissorsIcon /> },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].name);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            AI Image Studio
          </h1>
          <p className="text-gray-400 mt-2">Powered by Google Gemini</p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <Tabs 
            tabs={TABS.map(t => ({ name: t.name, icon: t.icon }))} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          <div className="mt-8 bg-gray-800/50 rounded-lg p-6 md:p-8 shadow-2xl backdrop-blur-sm border border-gray-700">
            {activeTab === 'Image Generator' && <ImageGenerator />}
            {activeTab === 'Background Remover' && <BackgroundRemover />}
          </div>
        </div>
      </main>
       <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AI Image Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;