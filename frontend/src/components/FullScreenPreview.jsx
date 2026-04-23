import { useContext } from "react";
import { PhotoContextProvider } from "../context/PhotoContext";
import { FaHeart } from "react-icons/fa";
import { MdDownload, MdClose } from "react-icons/md";

const FullScreenPreview = ({ selectedImage, controller }) => {
  const { toggleFav, favImg } = useContext(PhotoContextProvider);

  if (!selectedImage) return null;
  const isSaved = favImg.some((i) => i.id === selectedImage?.id);

  const handleDownload = async () => {
    const res = await fetch(selectedImage.urls.full);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "image.jpg";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={() => controller(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />

      {/* SIDEBAR */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-zinc-950 z-50 shadow-2xl animate-slideIn flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <img
              src={selectedImage.user?.profile_image?.small}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{selectedImage.user?.name}</span>
          </div>

          <button onClick={() => controller(false)}>
            <MdClose size={22} />
          </button>
        </div>

        {/* IMAGE */}
        <div className="flex-1 overflow-y-auto p-4">
          <img
            src={selectedImage.urls.regular}
            className="w-full rounded-lg object-cover"
          />

          {/* DESCRIPTION */}
          <p className="text-sm text-zinc-400 mt-3">
            {selectedImage.alt_description || "No description"}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="p-4 border-t border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => toggleFav(selectedImage)}>
              <FaHeart
                className={`${isSaved ? "text-red-500" : "text-white"}`}
              />
            </button>

            <span className="text-sm text-zinc-400">
              {selectedImage.likes} likes
            </span>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1 bg-white text-black px-3 py-1.5 rounded-md text-sm"
          >
            <MdDownload />
            Download
          </button>
        </div>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default FullScreenPreview;
