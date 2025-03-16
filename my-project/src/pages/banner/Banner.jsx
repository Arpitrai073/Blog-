import React from "react";
import bannerImage from "../../assets/pexels-picography-4458.jpg";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[50vh] bg-contain bg-center bg-repeat"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0  flex flex-col justify-center items-center text-black text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold">Blog</h1>
        <p className="text-lg md:text-xl mt-2">Code for Interview</p>
      </div>
    </div>
  );
};

export default Banner;
