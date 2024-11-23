import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Extract = ({ componentKey }) => {
  const [article, setArticle] = useState({
    url: "",
    title: "",
    description: "",
    content: "",
    image: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // RTK lazy query
  const [getArticle, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load component-specific data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem(`articles_${componentKey}`)
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, [componentKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getArticle({ articleUrl: article.url });
    if (data) {
      const newArticle = {
        ...article,
        title: data.title,
        description: data.description,
        content: data.content,
        image: data.image,
      };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and component-specific local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem(
        `articles_${componentKey}`,
        JSON.stringify(updatedAllArticles)
      );
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <>
      <header className="w-full flex justify-center items-center flex-col">
        <h1 className="head_text">
          Extract Articles with <br className="max-md:hidden" />
          <span className="orange_gradient ">Sum-Art-Ai</span>
        </h1>
        <h2 className="desc">
          Simplify your reading with Summize, an open-source article summarizer
          that transforms lengthy articles into clear and concise summaries
        </h2>
      </header>
      <section className="mt-16 w-full max-w-xl">
        {/* Search */}
        <div className="flex flex-col w-full gap-2">
          <form
            className="relative flex justify-center items-center"
            onSubmit={handleSubmit}
          >
            <img
              src={linkIcon}
              alt="link-icon"
              className="absolute left-0 my-2 ml-3 w-5"
            />
            <input
              type="url"
              placeholder="Paste the article link"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              onKeyDown={handleKeyDown}
              required
              className="url_input peer"
            />
            <button
              type="submit"
              className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            >
              <p>↵</p>
            </button>
          </form>

          {/* Browse History */}
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.reverse().map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className="link_card"
              >
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <img
                    src={copied === item.url ? tick : copy}
                    alt={copied === item.url ? "tick_icon" : "copy_icon"}
                    className="w-[40%] h-[40%] object-contain"
                  />
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                  {item.url}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Display Result */}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Well, that wasn’t supposed to happen...
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.title && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Details</span>
                </h2>
                <img
                  src={article.image}
                  alt="article"
                  className="w-full h-auto object-cover"
                />
                <h3 className="font-inter font-semibold text-lg text-gray-800">
                  {article.title}
                </h3>
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.description}
                </p>
                <div
                  className="font-inter text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Extract;