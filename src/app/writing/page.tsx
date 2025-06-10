export default function WritingPage() {
  return (
    <div>
      <div className="container-custom py-12">
        <h1 className="section-title">Game Design Writing</h1>
        <div className="grid grid-cols-1 gap-8">
          {/* Example article card */}
          <article className="card">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  Featured Image
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-semibold mb-3">Article Title</h2>
                <p className="text-gray-600 mb-4">
                  A compelling introduction to the article that hooks the reader and provides a preview of the content...
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>March 15, 2024</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="tag bg-indigo-100 text-indigo-800">Game Design</span>
                  <span className="tag bg-pink-100 text-pink-800">Analysis</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 