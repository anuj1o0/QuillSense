import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useGetVideoSummaryMutation } from "../services/youtube";

const YouTubeSummarizer = () => {
  const [video, setVideo] = useState({
    url: "",
    summary: "",
    title: "",
    description: "",
    keypoints: [],
    keywords: []
  });
  const [allVideos, setAllVideos] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useGetVideoSummaryMutation();

  useEffect(() => {
    const videosFromLocalStorage = JSON.parse(
      localStorage.getItem("youtubeVideos")
    );

    if (videosFromLocalStorage) {
      setAllVideos(videosFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingVideo = allVideos.find(
      (item) => item.url === video.url
    );

    if (existingVideo) return setVideo(existingVideo);

    try {
      const response = await getSummary({ videoUrl: video.url });
      if (response.data) {
        const newVideo = {
          ...video,
          summary: response.data.summary,
          title: response.data.title,
          description: response.data.description,
          keypoints: response.data.keypoints,
          keywords: response.data.keywords
        };
        const updatedAllVideos = [newVideo, ...allVideos];

        setVideo(newVideo);
        setAllVideos(updatedAllVideos);
        localStorage.setItem("youtubeVideos", JSON.stringify(updatedAllVideos));
      }
    } catch (error) {
      console.error("Error fetching video summary:", error);
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
          Summarize YouTube Videos with <br className="max-md:hidden" />
          <span className="orange_gradient">QuillSense</span>
        </h1>
        <h2 className="desc">
          Get instant summaries, key points, and insights from any YouTube video
        </h2>
      </header>

      <section className="mt-16 w-full max-w-xl">
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
              type="text"
              placeholder="Enter YouTube video URL"
              value={video.url}
              onChange={(e) => setVideo({ ...video, url: e.target.value })}
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

          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allVideos.reverse().map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setVideo(item)}
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
                  {item.title || item.url}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Well, that wasn&apos;t supposed to happen...
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            video.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Video <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <h3 className="font-satoshi font-bold text-lg mb-2">{video.title}</h3>
                  <p className="font-inter font-medium text-sm text-gray-700 mb-4">
                    {video.description}
                  </p>
                  
                  <h4 className="font-satoshi font-bold text-md mb-2">Summary:</h4>
                  <p className="font-inter font-medium text-sm text-gray-700 mb-4">
                    {video.summary}
                  </p>

                  <h4 className="font-satoshi font-bold text-md mb-2">Key Points:</h4>
                  <ul className="list-disc pl-4 mb-4">
                    {video.keypoints.map((point, index) => (
                      <li key={index} className="font-inter font-medium text-sm text-gray-700 mb-1">
                        <span className="font-bold">{point.topic}:</span> {point.keypoint}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-satoshi font-bold text-md mb-2">Keywords:</h4>
                  <div className="flex flex-wrap gap-2">
                    {video.keywords.map((keyword, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default YouTubeSummarizer; 