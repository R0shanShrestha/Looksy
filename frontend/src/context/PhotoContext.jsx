import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { GetToken, SetToken } from "../utils/LocalStorageHandler";
import { UserContextProvider } from "./UserContext";

export const PhotoContextProvider = createContext({
  setFavImg: () => {},
});

const PhotoContext = ({ children }) => {
  const { user } = useContext(UserContextProvider);

  const [storage, setStorage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [favImg, setFavImg] = useState(user ? user?.savedImg : []);

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

  const toggleFav = async (data) => {
    const BackendUri = import.meta.env.VITE_BACKEND_URI + "/api/v1/user";
    const token = GetToken("authToken");
    if (!token) {
      toast.error("Login is Requred to save !");
      return;
    }
    const obj = {
      title: data.alt_description,
      image: data.urls.regular,
      description: data.description,
      imageId: data.id,
    };

    try {
      const saveImage = await axios.put(BackendUri + "/toggle-save", obj, {
        headers: {
          authtoken: token,
        },
        withCredentials: true,
      });

      const res = await saveImage.data;
      toast.success(res.msg);
      setFavImg((prev) => {
        const exists = prev.some((image) => image.id === data.id);
        return exists
          ? prev.filter((image) => image.id !== data.id)
          : [...prev, data];
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    }
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
