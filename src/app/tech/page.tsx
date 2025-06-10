export default function TechPage() {
  return (
    <div>
      <div className="container-custom py-12">
        <h1 className="section-title">Tech & Code</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Example code snippet card */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Code Snippet Title</h3>
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <pre className="text-gray-100 overflow-x-auto">
                <code>{`// Example code snippet\nfunction example() {\n  console.log(\"Hello, World!\");\n}`}</code>
              </pre>
            </div>
            <p className="text-gray-600">
              Explanation of the code snippet and its use cases.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="tag bg-purple-100 text-purple-800">JavaScript</span>
            </div>
          </div>
          {/* Example technical article card */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Technical Article Title</h3>
            <p className="text-gray-600 mb-4">
              Brief overview of the technical concept or implementation being discussed.
            </p>
            <div className="flex gap-2">
              <span className="tag bg-yellow-100 text-yellow-800">Tutorial</span>
              <span className="tag bg-red-100 text-red-800">Game Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 