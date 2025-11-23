import React, { useState } from 'react';
import { Plus, Download, Image, Type, Palette, Grid3x3, Sparkles, Menu, X } from 'lucide-react';

// ==================== APP ROUTER ====================
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [editorData, setEditorData] = useState({
    headline: 'Summer Promo',
    subtext: 'Get 40% off today',
    backgroundColor: 'from-purple-300 to-pink-300',
    fontFamily: 'Inter',
  });

  const handleStartEditor = () => {
    setCurrentPage('editor');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="bg-white min-h-screen">
      {currentPage === 'dashboard' ? (
        <Dashboard onStartEditor={handleStartEditor} />
      ) : (
        <Editor 
          editorData={editorData} 
          setEditorData={setEditorData} 
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}

// ==================== DASHBOARD PAGE ====================
function Dashboard({ onStartEditor }) {
  const recentCreations = [
    {
      id: 1,
      title: 'Summer Promo Ad',
      description: 'Retail media creative',
      gradient: 'from-orange-300 to-red-300',
      image: '🌞',
    },
    {
      id: 2,
      title: 'Grocery Discount Banner',
      description: 'Seasonal promotion',
      gradient: 'from-green-300 to-teal-300',
      image: '🛒',
    },
    {
      id: 3,
      title: 'Fashion Flash Sale',
      description: 'Limited time offer',
      gradient: 'from-pink-300 to-purple-300',
      image: '👗',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white bg-opacity-80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CREATO AI
              </h1>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">Create stunning retail media in seconds</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            AI-powered creative editor designed for advertisers. Generate, customize, and export beautiful ads effortlessly.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <button
            onClick={onStartEditor}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Start with Template
          </button>
          <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 flex items-center justify-center gap-2">
            <Image className="w-5 h-5" />
            Upload Product
          </button>
        </div>

        {/* Recent Creations Section */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Recent Creations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCreations.map((creation) => (
              <div
                key={creation.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 cursor-pointer"
              >
                <div className={`h-40 bg-gradient-to-br ${creation.gradient} flex items-center justify-center text-6xl`}>
                  {creation.image}
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{creation.title}</h4>
                  <p className="text-sm text-slate-500">{creation.description}</p>
                  <button className="mt-4 w-full py-2 px-4 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ==================== EDITOR PAGE ====================
function Editor({ editorData, setEditorData, onBack }) {
  const [activePanel, setActivePanel] = useState('headline');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold text-slate-900">Editing: Summer Promo</h1>
          <div className="w-16" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Editor Layout */}
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Left Panel - Canvas */}
        <div className="flex-1 flex flex-col">
          <Canvas editorData={editorData} />
          <SuggestionsBar editorData={editorData} setEditorData={setEditorData} />
        </div>

        {/* Right Panel - Editor Options */}
        <EditorPanel
          editorData={editorData}
          setEditorData={setEditorData}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
        />
      </div>

      {/* Bottom Export Bar */}
      <ExportBar />
    </div>
  );
}

// ==================== CANVAS COMPONENT ====================
function Canvas({ editorData }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-100 rounded-2xl shadow-md overflow-hidden">
      <div
        className={`w-96 h-64 bg-gradient-to-br ${editorData.backgroundColor} rounded-xl shadow-xl p-8 flex flex-col justify-between`}
        style={{ fontFamily: editorData.fontFamily }}
      >
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">{editorData.headline}</h2>
          <p className="text-lg text-white opacity-90">{editorData.subtext}</p>
        </div>
        <div className="text-sm text-white opacity-75">Product Image Here</div>
      </div>
    </div>
  );
}

// ==================== EDITOR PANEL COMPONENT ====================
function EditorPanel({ editorData, setEditorData, activePanel, setActivePanel }) {
  const panelSections = [
    {
      id: 'headline',
      label: 'Headline',
      icon: <Type className="w-5 h-5" />,
    },
    {
      id: 'subtext',
      label: 'Subtext',
      icon: <Type className="w-5 h-5" />,
    },
    {
      id: 'fonts',
      label: 'Fonts',
      icon: <Grid3x3 className="w-5 h-5" />,
    },
    {
      id: 'colors',
      label: 'Colors',
      icon: <Palette className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">Edit Panel</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        {panelSections.map((section) => (
          <div key={section.id} className="border-b border-slate-200">
            <button
              onClick={() => setActivePanel(activePanel === section.id ? null : section.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-600">{section.icon}</span>
                <span className="font-semibold text-slate-900">{section.label}</span>
              </div>
              <span className={`transition-transform ${activePanel === section.id ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {activePanel === section.id && (
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                {section.id === 'headline' && (
                  <input
                    type="text"
                    value={editorData.headline}
                    onChange={(e) => setEditorData({ ...editorData, headline: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter headline"
                  />
                )}

                {section.id === 'subtext' && (
                  <textarea
                    value={editorData.subtext}
                    onChange={(e) => setEditorData({ ...editorData, subtext: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter subtext"
                    rows={3}
                  />
                )}

                {section.id === 'fonts' && (
                  <select
                    value={editorData.fontFamily}
                    onChange={(e) => setEditorData({ ...editorData, fontFamily: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Courier New">Courier</option>
                    <option value="Arial">Arial</option>
                  </select>
                )}

                {section.id === 'colors' && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setEditorData({ ...editorData, backgroundColor: 'from-purple-300 to-pink-300' })}
                      className="w-full h-10 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg hover:scale-105 transition-transform"
                    />
                    <button
                      onClick={() => setEditorData({ ...editorData, backgroundColor: 'from-orange-300 to-red-300' })}
                      className="w-full h-10 bg-gradient-to-r from-orange-300 to-red-300 rounded-lg hover:scale-105 transition-transform"
                    />
                    <button
                      onClick={() => setEditorData({ ...editorData, backgroundColor: 'from-green-300 to-teal-300' })}
                      className="w-full h-10 bg-gradient-to-r from-green-300 to-teal-300 rounded-lg hover:scale-105 transition-transform"
                    />
                    <button
                      onClick={() => setEditorData({ ...editorData, backgroundColor: 'from-blue-300 to-cyan-300' })}
                      className="w-full h-10 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-lg hover:scale-105 transition-transform"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== SUGGESTIONS BAR ====================
function SuggestionsBar({ editorData, setEditorData }) {
  const suggestions = [
    { id: 1, label: 'Layout 1', icon: '■■' },
    { id: 2, label: 'Layout 2', icon: '□□' },
    { id: 3, label: 'Font Set 1', icon: 'A' },
    { id: 4, label: 'Background 1', icon: '◆' },
  ];

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-md border border-slate-200 p-6">
      <h4 className="text-sm font-semibold text-slate-600 mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        AI Suggestions
      </h4>
      <div className="flex gap-3 flex-wrap">
        {suggestions.map((sugg) => (
          <button
            key={sugg.id}
            className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-slate-700 font-medium rounded-full hover:shadow-md hover:scale-105 transition-all duration-300 text-sm"
          >
            {sugg.icon} {sugg.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== EXPORT BAR ====================
function ExportBar() {
  const exportOptions = [
    { id: 'png', label: 'PNG', icon: <Download className="w-4 h-4" /> },
    { id: 'jpg', label: 'JPG', icon: <Download className="w-4 h-4" /> },
    { id: 'story', label: 'Story Size', icon: <Download className="w-4 h-4" /> },
    { id: 'post', label: 'Post Size', icon: <Download className="w-4 h-4" /> },
  ];

  return (
    <div className="border-t border-slate-200 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end gap-3">
        {exportOptions.map((option) => (
          <button
            key={option.id}
            className="px-4 py-2 flex items-center gap-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 hover:shadow-md transition-all duration-300"
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;