export default function ContactPage() {
  return (
    <div>
      <div className="container-custom py-12">
        <h1 className="section-title">Contact</h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-gray-400 mb-12 text-center">
            Get in touch with me through any of these channels
          </p>
          
          <div className="space-y-8">
            {/* Email */}
            <div className="card group transform hover:-translate-y-1 transition-all duration-200">
              <a 
                href="mailto:guyginat@gmail.com" 
                className="flex items-center space-x-4 p-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-red-600 transition-colors">Email</h3>
                  <p className="text-gray-600">guyginat@gmail.com</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* LinkedIn */}
            <div className="card group transform hover:-translate-y-1 transition-all duration-200">
              <a 
                href="https://www.linkedin.com/in/guy-ginat/" 
                className="flex items-center space-x-4 p-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">LinkedIn</h3>
                  <p className="text-gray-600">Connect with me professionally</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* itch.io */}
            <div className="card group transform hover:-translate-y-1 transition-all duration-200">
              <a 
                href="https://guyginat.itch.io/" 
                className="flex items-center space-x-4 p-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                  <img src="/images/icons/itchio.svg" alt="itch.io" className="w-8 h-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors">itch.io</h3>
                  <p className="text-gray-600">Check out my game projects</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 