import React from "react";

const RecentImageCard = ({ data }) => {
  return (
    <div className="relative w-full h-[260px]  overflow-hidden rounded-2xl shadow-md cursor-pointer group">
      {/* Image */}
      <img
        src={data || "/recentimages/1.jpg"}
        alt="recent"
        className="w-full h-full object-cover object-center  transition-transform duration-500 group-hover:scale-105"
      />

      {/* Soft overlay for better look */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
    </div>
  );
};

export default RecentImageCard;
