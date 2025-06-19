"use client";
import { techs } from "@/data/techs";
import Link from "next/link";
import Image from "next/image";
import { ContentBlock } from "@/components/ContentBlock";

export default function TechPage() {
  return (
    <div>
      <div className="container-custom py-12">
        <h1 className="section-title">Other</h1>
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
    </div>
  );
} 