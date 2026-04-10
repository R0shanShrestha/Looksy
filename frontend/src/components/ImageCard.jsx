import { useContext, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdBookmarkAdd, MdBookmarkAdded, MdDownload } from "react-icons/md";
import { PhotoContextProvider } from "../context/PhotoContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ImageCard = ({ data }) => {
  const { favImg, toggleFav, setFullScreen } = useContext(PhotoContextProvider);

  const [isHover, setHover] = useState(false);
  const descBoxRef = useRef();

  // animation
  useGSAP(() => {
    if (!descBoxRef.current) return;

    gsap.to(descBoxRef.current, {
      duration: 0.2,
      y: isHover ? 0 : "100%",
      ease: "power2.out",
    });
  }, [isHover]);

  // check saved
  const isSaved = favImg.some((item) => item.id === data.id);

  const handleFav = () => {
    toggleFav(data);
  };

  //  DOWNLOAD FUNCTION
  const handleDownload = async () => {
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
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="relative w-full break-inside-avoid overflow-hidden rounded-xl bg-zinc-900 shadow-md">
      
      {/* TOP BAR */}
      <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between p-2 bg-black/50 backdrop-blur-md text-white">
        
        {/* USER */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={data?.user?.profile_image?.small || "/avatar.png"}
            className="w-[28px] h-[28px] rounded-full object-cover"
          />
          <span className="text-sm font-medium truncate max-w-[120px]">
            {data?.user?.name || "Unknown"}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          
          {/* DOWNLOAD */}
          <button
            onClick={handleDownload}
            className="hover:scale-110 transition text-xl"
          >
            <MdDownload />
          </button>

          {/* SAVE */}
          <button
            onClick={handleFav}
            className="hover:scale-110 transition text-xl"
          >
            {isSaved ? (
              <MdBookmarkAdded className="text-yellow-300" />
            ) : (
              <MdBookmarkAdd className="text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* IMAGE */}
      <img
        src={data?.urls?.regular}
        alt={data?.alt_description || "image"}
        loading="lazy"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setFullScreen(data)}
        className="w-full h-auto object-cover block"
      />

      {/* BOTTOM INFO */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-between p-2 text-white bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-1 text-red-400">
          <FaHeart />
          <span className="text-xs bg-black/40 px-2 py-0.5 rounded-full">
            {data?.likes || 0}
          </span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div
        ref={descBoxRef}
        className="absolute bottom-0 left-0 w-full bg-white text-black p-2 text-sm translate-y-full"
      >
        <p className="line-clamp-3">
          {data?.alt_description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;