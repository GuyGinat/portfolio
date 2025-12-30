"use client";

import { games } from "@/data/games";
import { techs } from "@/data/techs";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="flex items-center pt-16" style={{ marginBottom: 'var(--section-gap, 4rem)' }}>
        <div className="container-custom py-12 w-full">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Technical Game Designer
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Hello!<br/> I&apos;m Guy Ginat, a technical game designer. I make games, tools, web apps, experiment with new technologies and input devices, sometimes, I also make some music.
            </p>
            <br/>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              I have previoulsy worked as a mobile games developer and a full stack web developer, I have an MFA in Game Design from the NYU Game Center, and a BSc. in computer science from Reichman University.
            </p>
          </div>
        </div>
      </section>

      

      {/* Games Section */}
      <section id="games" className="flex items-center" style={{ marginBottom: 'var(--section-gap, 4rem)' }}>
        <div className="container-custom py-12 w-full">
          <h1 className="section-title">Game Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              key={"tower"}
              href={`/tower`}
              className="card group transform hover:-translate-y-1 transition-all duration-200"
            >
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                <Image
                  src={"/images/tower/TowerBgSm.png"}
                  alt={"Tower"}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{"Tower"}</h3>
              <p className="text-gray-600 mb-4">{"Tower is an exploratory project looking into systems, grid and game design."}</p>
              <div className="flex gap-2 flex-wrap">                
                <span key={"Grid"} className="tag bg-red-100 text-red-800">
                  {"MFA Thesis Project"}
                </span> 
                <span key={"Systems"} className="tag bg-blue-100 text-blue-800">
                  {"System Design"}
                </span>
                <span key={"Experimental"} className="tag bg-blue-100 text-blue-800">
                  {"Experimental"}
                </span>
              </div>
            </Link>
            {games.map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="card group transform hover:-translate-y-1 transition-all duration-200"
              >
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  <Image
                    src={game.thumbnail}
                    alt={game.title}
                    width={400}
                    height={225}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{game.title}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {game.tags.map((tag) => (
                    <span key={tag} className="tag bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section id="tech" className="flex items-center" style={{ marginBottom: 'var(--section-gap, 4rem)' }}>
        <div className="container-custom py-12 w-full">
          <h1 className="section-title">Tools</h1>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {techs.map((tech) => (
              <Link
                key={tech.slug}
                href={`/tech/${tech.slug}`}
                className="card relative overflow-hidden group transform hover:-translate-y-1 transition-all duration-200"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${tech.thumbnail})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-indigo-400 transition-colors">{tech.title}</h3>
                  <p className="text-gray-200 mb-4">{tech.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {tech.tags.map((tag) => (
                      <span key={tag} className="tag bg-white/20 text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}          
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="flex items-center">
        <div className="container-custom py-12 w-full">
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
                    <Image src="/images/icons/itchio.svg" alt="itch.io" width={32} height={32} className="w-8 h-8 text-orange-600" />
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
      </section>
    </div>
  );
}
