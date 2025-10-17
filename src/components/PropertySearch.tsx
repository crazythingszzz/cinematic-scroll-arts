import { useState, useEffect } from 'react';

interface PropertySearchProps {
  isVisible: boolean;
}

export default function PropertySearch({ isVisible }: PropertySearchProps) {
  const [activeTab, setActiveTab] = useState('Buy');
  const [location, setLocation] = useState('');
  const [resultsCount] = useState(1049);
  const [animationClass, setAnimationClass] = useState('');

  const tabs = ['Buy', 'Rent', 'Off-plan'];

  useEffect(() => {
    if (isVisible) {
      setAnimationClass('animate-fade-in-up');
    } else {
      setAnimationClass('animate-outro');
    }
  }, [isVisible]);

  return (
    <div className={`w-full h-full flex items-center justify-center transition-all duration-1000 ${animationClass}`}>
      <div className="w-full max-w-4xl">
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-white text-lg font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-b-2 border-white'
                  : 'hover:text-white/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-2xl p-4">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          {/* Location Input */}
          <div className="flex-1">
            <label className="block text-gray-700 text-xs font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-0 pr-3 py-2 bg-white border-0 focus:outline-none text-black placeholder-gray-500 text-sm"
            />
          </div>

          {/* Filters Button */}
          <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 font-medium h-10 text-sm">
            Filters
          </button>

          {/* Search Button */}
          <button className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center space-x-2 h-10 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>{resultsCount.toLocaleString()} results</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
