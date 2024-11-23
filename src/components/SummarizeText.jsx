import { useState } from "react";
import { loader } from "../assets";

const SummarizeText = () => {
  const [textInput, setTextInput] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const preprocessText = (text) => {
    return JSON.stringify({
      lang: "en",
      text: text,
    });
  };

  const handleSummarize = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const url =
      "https://article-extractor-and-summarizer.p.rapidapi.com/summarize-text";
    const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: preprocessText(textInput),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.summary) {
        setSummary(data.summary);
      } else {
        alert("Failed to summarize the text.");
      }
    } catch (error) {
      console.error("Error summarizing text:", error);
      alert("An error occurred while summarizing.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="w-full flex justify-center items-center flex-col">
        <h1 className="head_text">
          Summarize Text with <br className="max-md:hidden" />
          <span className="orange_gradient ">Sum-Art-Ai</span>
        </h1>
        <h2 className="desc">
          Simplify your reading with Summize, an open-source article summarizer
          that transforms lengthy articles into clear and concise summaries
        </h2>
      </header>
      <section className="mt-16 w-full max-w-xl">
        {/* Input Form */}
        
        <div className="w-full max-w-2xl mx-auto">
          <form
            className="relative flex flex-col w-full gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-md transition-all hover:shadow-lg"
            onSubmit={handleSummarize}
          >
            <textarea
              placeholder="Enter text to summarize..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              required
              className="w-full min-h-[200px] p-4 rounded-lg border border-gray-200 focus:border-orange-500 outline-none resize-y font-satoshi text-gray-700 text-sm transition-all placeholder:text-gray-500"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-amber-500 via-orange-600 to-orange-500 hover:brightness-110 text-white rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 group"
              >
                Summarize
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Display Loader or Summary */}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isLoading ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : (
            summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Summarized <span className="blue_gradient">Text</span>
                </h2>
                <p className="font-inter text-gray-700">{summary}</p>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default SummarizeText;
