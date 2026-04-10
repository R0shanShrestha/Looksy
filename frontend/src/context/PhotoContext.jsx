import axios from "axios";
import React, { createContext, useState } from "react";

export const PhotoContextProvider = createContext(null);

const PhotoContext = ({ children }) => {
  const [storage, setStorage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [favImg, setFavImg] = useState([]);
  const [serverMsg, SetServerMsg] = useState(null);
  const [isFullScreen, setFullScreen] = useState(null);

  async function searchImage(query = "anime", page = 1) {
    const uri = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }`;

    try {
      setIsLoading(true);
      SetServerMsg(null);

      const res = await axios.get(uri);

      setStorage({
        total: res.data.total,
        total_pages: res.data.total_pages,
        results: res.data.results,
      });
    } catch (err) {
      setStorage(null);
      SetServerMsg({ type: "error", msg: "Network error" });
    } finally {
      setIsLoading(false);
    }
  }

  const toggleFav = (img) => {
    setFavImg((prev) => {
      const exists = prev.some((i) => i.id === img.id);
      return exists ? prev.filter((i) => i.id !== img.id) : [...prev, img];
    });
  };

  return (
    <PhotoContextProvider.Provider
      value={{
        searchImage,
        storage,
        setStorage, // ✅ MUST exist
        isLoading,
        search,
        setSearch,
        favImg,
        toggleFav,
        setFavImg,
        SetServerMsg,
        isFullScreen,
        setFullScreen,
      }}
    >
      {children}
    </PhotoContextProvider.Provider>
  );
};

export default PhotoContext;
