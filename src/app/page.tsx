import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="container-custom py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Technical Game Designer & Other Stuff
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hello!<br/> I'm Guy Ginat, a technical game designer. I love making games, tools, web apps, and sometimes, I also make some music.
          </p>
        </section>

        {/* Section Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Games Section Preview */}
          <Link href="/games" className="card group transform hover:-translate-y-1 transition-all duration-200">
            <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-16 h-16 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 group-hover:text-indigo-600 transition-colors">Games</h2>
            <p className="text-gray-600">
              Explore my Unity web builds and game development projects
            </p>
          </Link>

          {/* Tech & Code Section Preview */}
          <Link href="/tech" className="card group transform hover:-translate-y-1 transition-all duration-200">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-16 h-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">Tech & Code</h2>
            <p className="text-gray-600">
              Browse through code snippets and technical implementations
            </p>
          </Link>

          {/* Game Design Writing Section Preview */}
          <Link href="/writing" className="card group transform hover:-translate-y-1 transition-all duration-200">
            <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-16 h-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 group-hover:text-purple-600 transition-colors">Game Design Writing</h2>
            <p className="text-gray-600">
              Read my thoughts and analysis on game design principles
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
