import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "sonner";

export const PhotoContextProvider = createContext(null);

const PhotoContext = ({ children }) => {
  const [storage, setStorage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [favImg, setFavImg] = useState([]);
  const [cache, setCache] = useState({});

  //  Caching mechanism to avoid redundant API calls
  async function searchImage(query = "anime", page = 1) {
    const cacheKey = `${query}-${page}`;

    // If already exists → return instantly
    if (cache[cacheKey]) {
      setStorage(cache[cacheKey]);
      return;
    }

    const uri = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${query}&client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }`;

    try {
      setIsLoading(true);

      const res = await axios.get(uri);

      const newData = {
        total: res.data.total,
        total_pages: res.data.total_pages,
        results: res.data.results,
      };

      setStorage(newData);

      // 💾 save to cache
      setCache((prev) => ({
        ...prev,
        [cacheKey]: newData,
      }));
    } catch (err) {
      setStorage(null);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleFav = (img) => {
    setFavImg((prev) => {
      const exists = prev.some((i) => i.id === img.id);
      return exists ? prev.filter((i) => i.id !== img.id) : [...prev, img];
    });

    toast.success("Updated favorites");
  };

  return (
    <PhotoContextProvider.Provider
      value={{
        searchImage,
        storage,
        setStorage,
        isLoading,
        search,
        setSearch,
        favImg,
        toggleFav,
        setFavImg,
      }}
    >
      {children}
    </PhotoContextProvider.Provider>
  );
};

export default PhotoContext;
