import React from "react";

interface ILoader {
  title: string;
}

const Loader = ({ title }: ILoader) => {
  return (
    <div className="flex grow items-center justify-center border border-gray-400 min-h-60">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="mb-2 my-auto text-gray-400">{title}</div>
        <div className=" w-2 h-2 rounded-full block mx-4 my-auto relative text-gray-400 box-border animate-[animloader_1.5s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default Loader;
