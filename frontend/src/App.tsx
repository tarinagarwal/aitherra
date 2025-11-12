function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Aitherra
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Your AI-Powered Programming Language Tutor
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              🚀 Getting Started
            </h2>
            <p className="text-blue-700">
              Tailwind CSS is configured and ready to use!
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              ✅ Tech Stack
            </h2>
            <ul className="text-green-700 space-y-1">
              <li>• React + TypeScript</li>
              <li>• Vite</li>
              <li>• Tailwind CSS v4</li>
              <li>• FastAPI Backend</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
