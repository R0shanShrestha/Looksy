import React, { useContext, useEffect, useState } from "react";
import { PhotoContextProvider } from "../../context/PhotoContext";
import { Link, useNavigate } from "react-router-dom";
import RecentImageCard from "../../components/RecentImageCard";
import { UserContextProvider } from "../../context/UserContext";
import { TRENDING_SEARCHES } from "../../constants/Filters";
import axios from "axios";

const Home = () => {
  const { setSearch, search, searchImage } = useContext(PhotoContextProvider);
  const { logged } = useContext(UserContextProvider);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const navigate = useNavigate();
  // MOST SEARCHED (trend keywords instead of images)

  const getTrendingSearches = async (query) => {
    if (trendingSearches.some((item) => item.query === query)) return;
    const result = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&per_page=20&query=${query}&client_id=${
        import.meta.env.VITE_ACCESS_KEY
      }`,
    );

    setTrendingSearches((prev) => [
      ...prev,
      {
        url: result.data.results[
          Math.floor(Math.random() * result.data.results.length)
        ]?.urls?.small,
        tag: query,
      },
    ]);
  };
  useEffect(() => {
    // serch images with "trending" keyword to get some random trending images for the section
    TRENDING_SEARCHES.forEach((item) => getTrendingSearches(item));
  }, []);
  const tags = [
    "Anime",
    "Nature",
    "Cars",
    "Technology",
    "Space",
    "Minimal",
    "Portrait",
    "4K Wallpaper",
    "City Night",
  ];

  const trendingSearchHandler = (query) => {
    setSearch(query.toLowerCase());
    searchImage(query, 1);
    navigate("/explore");
  };
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      {/* HERO SECTION */}
      <div className="flex flex-col items-center text-center gap-6 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight max-w-[800px]">
          Discover. Search.{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Explore
          </span>{" "}
          Beautiful Images.
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-[550px]">
          A fast image explorer powered by Unsplash API.
        </p>

        {/* SEARCH BAR */}
        <div className="w-full max-w-[650px] mt-4">
          <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 py-4 px-4 outline-none text-sm text-slate-900"
              placeholder="Search images..."
            />

            <Link
              to="/explore"
              onClick={() => {
                searchImage(search, 1);
                addToTrending(search);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-sm font-medium transition"
            >
              Search
            </Link>
          </div>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => {
                trendingSearchHandler(tag);
              }}
              className="px-4 py-1.5 rounded-full 
              bg-gradient-to-r from-zinc-800 to-zinc-900
              border border-zinc-700
              text-sm text-zinc-200
              hover:scale-105 hover:border-white
              transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* MOST SEARCHED SECTION (*/}
      <div className="py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-20 text-center ">
          🔥 Most Searched Today
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingSearches.map((item, idx) => (
            <div
              key={idx}
              className="hover:scale-[1.02] transition "
              onClick={() => {
                trendingSearchHandler(item.tag);
              }}
            >
              <RecentImageCard data={item.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
