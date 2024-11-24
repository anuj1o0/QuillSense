import React from 'react';
import { useNavigate } from "react-router-dom";
const FeatureCard = ({ title, description, icon, path  }) => {
    const navigate = useNavigate();
  return (
    <div className="group relative w-full md:w-[350px] bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Icon Container with gradient background */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 via-orange-600 to-orange-500 flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:rotate-12">
        <span className="text-2xl text-white">{icon}</span>
      </div>

      {/* Content */}
      <h3 className="font-satoshi font-bold text-xl text-gray-800 mb-2">
        {title}
      </h3>
      <p className="font-inter text-gray-600 text-sm mb-6">
        {description}
      </p>

      {/* Button */}
      <button
        onClick={() => navigate(path)}
        className="group flex items-center gap-2 text-sm font-medium text-white px-4 py-2 bg-gradient-to-r from-amber-500 via-orange-600 to-orange-500 rounded-lg hover:brightness-110 transition-all duration-300"
      >
        Try Now
        <span className="transform transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>

      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-orange-500/10 to-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

const Home = () => {
  const features = [
    {
      title: "Article Summarizer",
      description: "Transform lengthy articles into clear and concise summaries with just a URL.",
      icon: "📰",
      path: "/summarize-article"
    },
    {
      title: "Text Summarizer",
      description: "Get instant summaries of any text content using advanced AI technology.",
      icon: "📝",
      path: "/summarize-text"
    },
    {
      title: "Article Extractor",
      description: "Extract and clean article content from any webpage automatically.",
      icon: "🔍",
      path: "/extract-article"
    }
  ];

  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <h1 className="head_text">
      Simplify, Extract, Summarize <br className="max-md:hidden" />
        <span className="orange_gradient">QuillSense</span>
      </h1>
      <h2 className="desc">
      Effortlessly extract content, summarize articles, and distill key insights with QuillSense. Your go-to tool for smarter, faster text analysis.
      </h2>

      {/* Features Section */}
      <section className="mt-16 w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              path={feature.path}
            />
          ))}
        </div>
      </section>
    </header>
  );
};

export default Home;