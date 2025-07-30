import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          AI Resume Generator
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Transform your career story with AI
        </p>
        <div className="space-y-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200">
            Create Resume
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors duration-200">
            Choose Template
          </button>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="h-8 bg-red-400 rounded"></div>
          <div className="h-8 bg-green-400 rounded"></div>
          <div className="h-8 bg-yellow-400 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default App