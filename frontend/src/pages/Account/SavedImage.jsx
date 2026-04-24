import React, { useContext, useEffect, useState } from "react";
import { UserContextProvider } from "../../context/UserContext";

const SavedImage = () => {
  const { user } = useContext(UserContextProvider);
  const [savedImages, setSavedImg] = useState([]);

  useEffect(() => {
    setSavedImg(user?.savedImg || []);
  }, [user]);

  const isEmpty = savedImages.length === 0;

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-white px-4 sm:px-8 py-12">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
          Saved Collection
        </h1>
        <p className="text-sm md:text-base text-zinc-500 mt-3">
          Your personal gallery of inspiration
        </p>
      </div>

      {/* EMPTY STATE */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center mt-24 text-zinc-500">
          <div className="text-8xl mb-5 animate-pulse">📌</div>
          <h2 className="text-2xl font-semibold text-zinc-300">
            Nothing saved yet
          </h2>
          <p className="text-sm mt-2 text-zinc-600">
            Start exploring and save your favorite visuals
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">

          {savedImages.map((data) => (
            <div
              key={data._id || data.id}
              className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-zinc-900/40 border border-zinc-800/60 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
            >

              {/* IMAGE (CUSTOM) */}
              <div className="relative w-full overflow-hidden">
                <img
                  src={data.image}
                  alt={data.title || "image"}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />

                {/* TOP ACTION (optional future use) */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                  <button className="bg-black/60 backdrop-blur px-3 py-1 text-xs rounded-full">
                    Saved
                  </button>
                </div>
              </div>

              {/* INFO */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-zinc-200 transition">
                  {data.title || "Untitled"}
                </h3>
                <p className="text-xs text-zinc-400 truncate mt-1">
                  {data.description || "No description"}
                </p>
              </div>

              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-white/5 via-transparent to-transparent transition pointer-events-none" />

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default SavedImage;