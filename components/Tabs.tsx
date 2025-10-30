import React from 'react';

interface Tab {
  name: string;
  icon: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`flex items-center gap-2 px-4 py-3 text-sm md:text-base font-medium transition-colors duration-300 focus:outline-none
            ${
              activeTab === tab.name
                ? 'border-b-2 border-purple-500 text-white'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent'
            }
          `}
        >
          {tab.icon}
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;