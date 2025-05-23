import axios from "axios";
import React, { createContext, useReducer, useState } from "react";

export const PhotoContextProvider = createContext({
  storage: [],
  recentSearch: [],
  search: "",
  isLoading: false,
  serverMsg: {},
  favImg: [],
  SetServerMsg: () => {},
  setStorage: () => {},
  setSearch: () => {},
  searchImage: () => {},
  setIsLoading: () => {},
  setFavImg: () => {},
});

const PhotoReducer = (initial, action) => {
  let newArr = initial;
  if (action.type == "search") {
    newArr = action.payload;
  }
  return newArr;
};

const PhotoContext = ({ children }) => {
  const [storage, setStorage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [serverMsg, SetServerMsg] = useState({ state: false, msg: "" });
  const [recentSearch, setrecentSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [favImg, setFavImg] = useState([]);

  async function searchImage(query = "anime", page = 1) {
    const uri = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }`;

    try {
      // Set server msg
      SetServerMsg({ state: false, msg: "" });

      setIsLoading(true);
      // fetching the data
      const res = await axios.get(uri);
      // console.log(res.data.results);
      setTimeout(() => {
        setIsLoading(false);
        setrecentSearch(res.data.results);
        setStorage({
          total: res.data.total,
          total_pages: res.data.total_pages,
          results: res.data.results,
        });
        // setIsLoading(false);
      }, 5000);
    } catch (error) {
      if (error.message == "Network Error") {
        SetServerMsg({
          type: "network",
          msg: "No Internet Connection !",
          state: true,
        });

        // Emptying storage
        DispatchStorage({
          type: "search",
          payload: {},
        });
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
        setStorage,
        isLoading,
        search,
        setSearch,
        favImg,
        serverMsg,
        SetServerMsg,
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
