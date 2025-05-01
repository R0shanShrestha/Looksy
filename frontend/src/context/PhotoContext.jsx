import axios from "axios";
import React, { createContext, useReducer, useState } from "react";

export const PhotoContextProvider = createContext({
  storage: [],
  recentSearch: [],
  search: "",
  isLoading: false,
  isError: false,
  favImg: [],
  isFullScreen: false,
  setFullScreen: () => {},
  setSearch: () => {},
  searchImage: () => {},
  setIsLoading: () => {},
  setFavImg: () => {},
});

const PhotoReducer = (initial, action) => {
  let newArr = initial;
  if (action.type == "search") {
    // console.log(action.payload);
    newArr = action.payload;
    // console.log(newArr);
  }
  return newArr;
};

const PhotoContext = ({ children }) => {
  const [storage, DispatchStorage] = useReducer(PhotoReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isError, setError] = useState({ err: false, msg: "" });
  const [recentSearch, setrecentSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [favImg, setFavImg] = useState([]);

  async function searchImage(query = "anime", page = 1, per_page) {
    const uri = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }`;

    try {
      setError({ err: false, msg: "" });
      setIsLoading(true);

      const res = await axios.get(uri);
      setrecentSearch(res.data.results);
      setIsLoading(false);

      DispatchStorage({
        type: "search",
        payload: {
          total: res.data.total,
          total_pages: res.data.total_pages,
          results: res.data.results,
        },
      });
    } catch (error) {
      // console.log(error.message);
      if (error.message == "Network Error") {
        setError({ err: true, msg: "No Internet Connection !" });
      }
      setIsLoading(false);
    }
  }

  return (
    <PhotoContextProvider.Provider
      value={{
        searchImage,
        storage,
        recentSearch,
        isLoading,
        search,
        setSearch,
        favImg,
        isError,
        setFavImg,
        isFullScreen,
        setFullScreen,
      }}
    >
      {children}
    </PhotoContextProvider.Provider>
  );
};

export default PhotoContext;
