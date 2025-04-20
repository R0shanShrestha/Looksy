import React from "react";

const ImageCard = ({ image, title }) => {
  return (
    <div className="card overflow-hidden  rounded-xl  w-full max-w-[300px] hover:scale-120 duration-300  h-fit flex flex-col justify-between">
      <div className="cardImg rounded-xl overflow-hidden h-fit">
        <img
          src={image}
          alt="not found"
          className=" w-full h-full object-cover object-top rounded-xl"
        />
      </div>
      <div className="border bg-white text-indigo-600 px-5 py-3 text-sm text-center">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default ImageCard;
