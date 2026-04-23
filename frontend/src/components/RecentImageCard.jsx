import React from "react";

const RecentImageCard = ({ data }) => {
  return (
    <div className="relative w-full h-[260px] rounded-2xl overflow-hidden group cursor-pointer">
      
      {/* Glow border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

      {/* Image */}
      <img
        src={data || "/recentimages/1.jpg"}
        alt="recent"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div>

      {/* Bottom content (appears on hover) */}
      <div className="absolute bottom-0 left-0 w-full p-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
        <p className="text-sm text-white font-medium">Explore Image</p>
        <p className="text-xs text-slate-300">Click to view more</p>
      </div>

      {/* Top subtle tag */}
      <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-xs px-3 py-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition">
        Recent
      </div>
    </div>
  );
};

export default RecentImageCard;