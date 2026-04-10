import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-auto border-t border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left text */}
        <p className="text-xs sm:text-sm text-slate-300">
          © 2025 Looksy. All rights reserved.
        </p>

        {/* Right small note */}
        <p className="text-xs text-slate-500">
          Built for creators ✨
        </p>

      </div>
    </footer>
  );
};

export default Footer;