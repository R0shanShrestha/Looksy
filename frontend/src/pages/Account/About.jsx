import React from "react";
import { FcAbout } from "react-icons/fc";

const About = () => {
  return (
    <div className="mt-3 p-3 flex flex-col gap-3">
      {" "}
      <h1 className="font-semibold flex items-center gap-3">
        <FcAbout size={20} />
        About Me
      </h1>
      <p className="text-sm text-slate-300 font-medium">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
        inventore, repellendus quisquam perspiciatis delectus, pariatur impedit
        eveniet harum tempore alias iusto odio aliquid, ab voluptatem placeat
        perferendis id. Corporis in architecto qui.
      </p>
    </div>
  );
};

export default About;
