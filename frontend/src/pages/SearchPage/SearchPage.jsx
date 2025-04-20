import React from "react";
import { FaSearch } from "react-icons/fa";
import data from "../../../Data.json";
import ImageCard from "../../components/ImageCard";
const SearchPage = () => {
  return (
    <div className=" w-full h-full overflow-hidden gap-3 flex flex-col">
      <div className="flex items-center   mx-auto w-[80%] flex-col gap-5">
        <div className="flex items-center border  w-full rounded-xl">
          <input
            type="text"
            placeholder="Search Image..."
            className="p-3  w-full"
          />
          <span className="text-xl px-2">
            <FaSearch />
          </span>
        </div>
        <h1 className="font-medium w-full ">
          Showing results for <span className="font-black">Robots</span>
        </h1>
      </div>

      <div className="outputs overflow-hidden duration-300 no-scroller overflow-y-scroll h-full  justify-center flex flex-wrap gap-5">
        {data.map(({ url, title }) => (
          <ImageCard image={url} title={title}/>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
