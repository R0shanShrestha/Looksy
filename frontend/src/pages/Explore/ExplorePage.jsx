import { useContext, useState } from "react";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { PhotoContextProvider } from "../../context/PhotoContext";
import ImageCard from "../../components/ImageCard";
import { UserContextProvider } from "../../context/UserContext";

const ExplorePage = () => {
  const {
    searchImage,
    storage,
    isLoading,
    SetServerMsg,
    setSearch,
    search,
    favImg,
  } = useContext(PhotoContextProvider);

  const { user, logged } = useContext(UserContextProvider);

  const [numPage, setNumPage] = useState(1);

  const searchHandler = (e, type) => {
    e.preventDefault();

    if (!logged) return;

    if (search === "") {
      SetServerMsg({
        state: true,
        type: "other",
        msg: "Input Required",
      });
      return;
    }

    if (type === "search") {
      setNumPage(1);
      searchImage(search, 1);
    }

    if (type === "more") {
      const nextPage = numPage + 1;
      setNumPage(nextPage);
      searchImage(search, nextPage);
    }
  };

  return (
    <div className="w-full min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 pt-2 mt-6">

      {/* ✅ RESPONSIVE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 w-full">

        {/* LEFT SIDE */}
        <div className="w-full flex flex-col gap-4">

          {/* USER */}
          <div className="bg-zinc-950 w-full py-3 hidden px-3 rounded-md  gap-3 items-center">
            <img
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"
              className="w-[40px] h-[40px] object-cover rounded-full bg-white"
            />
            <h1 className="text-sm font-semibold">
              {user?.username || "Guest"}
            </h1>
          </div>

          {/* SEARCH */}
          <div className="bg-zinc-950 w-full px-3 py-4 rounded-md space-y-3">
            <h1 className="text-lg font-semibold">
              Explore. Find. Get Inspired.
            </h1>

            <form className="flex gap-2">
              <input
                type="text"
                placeholder="Search Images..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white w-full p-2.5 rounded-md text-black text-sm outline-none"
              />
              <button
                onClick={(e) => searchHandler(e, "search")}
                className="px-3 text-sm bg-blue-600 rounded-md hover:bg-blue-800"
              >
                Search
              </button>
            </form>
          </div>

          {/* SAVED */}
          <div className="bg-zinc-950 w-full rounded-md flex flex-col px-2 py-2">
            <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded-md">
              <BsBookmarkHeartFill size={18} />
              <h1 className="text-sm">Saved Image</h1>
            </div>

            {favImg.length > 0 && (
              <div className="border-t mt-2 pt-2 text-xs text-slate-400">
                Images: {favImg.length}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full min-w-0">

          <div className="w-full">

            {/* LOADING */}
            {isLoading ? (
              <div className="flex items-center justify-center flex-col gap-2 py-10">
                <img
                  src="../../../public/loading_icon.gif"
                  className="w-[60px]"
                />
                <h1 className="text-sm">Loading images...</h1>
              </div>

            ) : storage && storage.results ? (
              <>
                {/* PAGE INFO */}
                <div className="text-xs text-slate-400 mb-2">
                  Page {numPage} of {storage.total_pages}
                </div>

                {/* IMAGE GRID */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3">
                  {storage.results.map((img) => (
                    <div
                      key={img.id}
                      className="mb-3 break-inside-avoid w-full"
                    >
                      <ImageCard data={img} />
                    </div>
                  ))}
                </div>

                {/* LOAD MORE */}
                {numPage < storage.total_pages && (
                  <div className="w-full flex justify-center mt-4">
                    <button
                      onClick={(e) => searchHandler(e, "more")}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center w-full py-20">
                <div className="flex flex-col items-center gap-3 text-center px-4">

                  <div className="w-14 h-14 rounded-full bg-zinc-900 border flex items-center justify-center">
                    🔍
                  </div>

                  <h1 className="font-semibold text-lg">
                    Search something you want
                  </h1>

                  <p className="text-xs text-slate-400">
                    Start typing a keyword
                  </p>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;