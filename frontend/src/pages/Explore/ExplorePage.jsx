import { useContext, useState, useEffect } from "react";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { PhotoContextProvider } from "../../context/PhotoContext";
import ImageCard from "../../components/ImageCard";
import { UserContextProvider } from "../../context/UserContext";
import { FILTERS } from "../../constants/Filters";
import { toast } from "sonner";
import FullScreenPreview from "../../components/FullScreenPreview";

const filters = FILTERS;

const ExplorePage = () => {
  const { searchImage, storage, isLoading, setSearch, search, favImg } =
    useContext(PhotoContextProvider);

  const { user, logged } = useContext(UserContextProvider);
  const [numPage, setNumPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isOpen, setisOpen] = useState(false);
  const [ImageData, setImageData] = useState(null);
  const filterHandler = (tag) => {
    setActiveFilter(tag);
    const query = tag === "All" ? "random" : tag.toLowerCase();
    setSearch(query == "random" ? "" : query);
    setNumPage(1);
    searchImage(query, 1);
  };

  useEffect(() => {
    if (search != "") {
      return;
    }
    filterHandler("All");
  }, []);

  useEffect(() => {
    if (storage?.results?.length) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [storage?.results]);

  // scroller to top when click new search or filter
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const searchHandler = (e, type, query = "random") => {
    e.preventDefault();

    const finalQuery = search == "" ? query : search;

    if (!finalQuery) {
      toast.error("Please enter a search term.");
      return;
    }

    switch (type) {
      case "search":
        setNumPage(1);
        searchImage(finalQuery, 1);
        scrollToTop();
        break;

      case "more":
        const next = numPage + 1;
        setNumPage(next);
        searchImage(finalQuery, next);
        scrollToTop();
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-128px)] text-white relative">
      {/*  */}
      {isOpen && (
        <FullScreenPreview selectedImage={ImageData} controller={setisOpen} />
      )}
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] h-full">
        {/* LEFT SIDEBAR */}
        <div className="h-full border-r border-zinc-900 p-4">
          <div className="flex flex-col gap-5">
            {/* SEARCH */}
            <div className="space-y-3">
              <h1 className="text-lg font-semibold">Explore Images</h1>

              <form className="flex gap-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search anything..."
                  className="w-full px-3 py-2 text-sm rounded-md bg-zinc-900 border border-zinc-800 outline-none"
                />
                <button
                  onClick={(e) => searchHandler(e, "search")}
                  className="px-4 py-2 text-sm bg-white text-black rounded-md hover:opacity-80 transition"
                >
                  Search
                </button>
              </form>
            </div>

            {/* FILTERS */}
            <div className="space-y-2">
              <h1 className="text-xs text-zinc-500 uppercase tracking-wider">
                Filters
              </h1>

              <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => filterHandler(f)}
                    className={`px-3 py-1 text-xs rounded-full border transition ${
                      activeFilter === f
                        ? "bg-white text-black border-white"
                        : "border-zinc-700 text-zinc-300 hover:border-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* SAVED */}
            <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2">
                <BsBookmarkHeartFill />
                <span className="text-sm">Saved</span>
              </div>
              <span className="text-xs text-zinc-400">{favImg.length}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="h-full overflow-y-auto p-6 no-scroller">
          {storage?.results ? (
            <>
              {/* GRID */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
                {storage.results.map((img) => (
                  <div key={img.id} className="mb-4 break-inside-avoid">
                    <ImageCard
                      data={img}
                      setImageData={setImageData}
                      setisOpen={setisOpen}
                    />
                  </div>
                ))}
              </div>

              {/* LOAD MORE */}
              {numPage < storage.total_pages && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={(e) => searchHandler(e, "more")}
                    className="px-5 py-2 text-sm border border-zinc-700 rounded-md hover:border-white transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 text-zinc-500">
              Search something to explore images
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
