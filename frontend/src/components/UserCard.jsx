import React from "react";

const UserCard = ({ data }) => {
  return (
    <div
      className="userCard flex items-center gap-2 py-1
             rounded-2xl "
    >
      <div className="userImg">
        <img
          src={data.img}
          alt="not found"
          className="w-[40px] h-[40px]  rounded-full"
        />
      </div>
      <div className="userInfo">
        <h1 className="font-bold text-sm">{data.fullname}</h1>
        <h3 className="text-[10px]">Active: {data.active}</h3>
      </div>
    </div>
  );
};

export default UserCard;
