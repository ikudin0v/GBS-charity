import React from "react";
import Xsvg from "./SVG/Xsvg";

interface IModal {
  header: string;
  children: React.ReactNode;
  close(): any;
}

const Modal = ({ header, children, close }: IModal) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "modal") {
      close();
      document.body.style.overflow = "";
    }
  };

  return (
    <div
      id={"modal"}
      className=" w-screen h-screen fixed left-0 top-0 bg-gray-500/75 z-40"
      onClick={(e) => {
        closeModal(e);
      }}
    >
      <div className="w-fit h-fit m-auto absolute left-0 top-0 bottom-0 right-0 border border-black bg-white z-50">
        <div className="relative">
          <div className="text-center font-semibold">{header}</div>
          <button
            className="text-center font-semibold absolute right-0 top-0 h-7 w-7 text-red-600"
            onClick={() => {
              close();
              document.body.style.overflow = "";
            }}
          >
            <Xsvg color="#000000" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
