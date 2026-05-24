import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdBookmarkAdd, MdBookmarkAdded, MdDownload } from "react-icons/md";
import { PhotoContextProvider } from "../context/PhotoContext";

const ImageCard = ({ data, setImageData, setisOpen }) => {
  const { favImg, toggleFav } = useContext(PhotoContextProvider);
  const [loaded, setLoaded] = useState(false);

  // const isSaved = ;

  const handleDownload = async (e) => {
    e.stopPropagation(); // prevent fullscreen open

    try {
      const res = await fetch(data?.urls?.full);
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `image-${data.id}.jpg`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="relative w-full cursor-pointer break-inside-avoid overflow-hidden rounded-xl bg-zinc-900 group"
      onClick={() => {
        setImageData(data);
        setisOpen(true);
      }}
    >
      {/* IMAGE */}
      <img
        src={data?.urls?.regular}
        alt={data?.alt_description || "image"}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`
          w-full h-auto object-cover block transition-all duration-500 ease-out
          ${
            loaded
              ? "opacity-100 scale-100 blur-0"
              : "opacity-0 scale-105 blur-lg"
          }
        `}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />

      {/* TOP ACTION BAR */}
      <div className="absolute top-2 left-2 right-2 px-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">
        {/* USER */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full max-w-[60%]">
          <img
            src={data?.user?.profile_image?.small || "/avatar.png"}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-white truncate max-w-[90px]">
            {data?.user?.name || "Unknown"}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full shrink-0">
          {/* DOWNLOAD */}
          <button
            onClick={handleDownload}
            className="text-white hover:text-blue-400 transition"
          >
            <MdDownload size={18} />
          </button>

          {/* SAVE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFav(data);
            }}
          >
            {favImg.some((item) => item.imageId === data.id) ? (
              <MdBookmarkAdded size={18} className="text-yellow-300" />
            ) : (
              <MdBookmarkAdd size={18} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* BOTTOM INFO */}
      <div className="absolute bottom-0 left-0 w-full p-3 flex justify-between items-center text-white opacity-0 group-hover:opacity-100 transition">
        <div className="flex items-center gap-1 text-red-400">
          <FaHeart size={12} />
          <span className="text-xs">{data?.likes || 0}</span>
        </div>

        <p className="text-[11px] text-slate-200 truncate max-w-[70%] text-right">
          {data?.alt_description || "Untitled"}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
