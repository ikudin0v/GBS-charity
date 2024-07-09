import React from "react";
import { useData } from "../hooks/useContext";
import { IUseData } from "../interfaces";

const StylesMenu = () => {
  const { fontSize, setFontSize, theme, setTheme } = useData() as IUseData;

  const standart = {
    primary: " bg-white text-black",
    secondary: " bg-[#555554] text-white",
    active: " bg-[#d32f2f] text-white",
    hover: " md:hover:bg-[#555554] md:hover:text-white",
    logoColor: "#FFF450",
    logoText: "#000000",
    styleButton: " bg-[#e5e7e8] text-black",
    pointerItemBg: " bg-[#e5e7e8]",
    pointerItem: " border-[#727272]",
    redBorder: " border-[#d32f2f]",
    searchButton: " bg-[#FFF450]",
  };
  const reverse = {
    primary: " bg-white text-black",
    secondary: " bg-black text-white",
    active: " bg-[#2b2b2b] text-white",
    hover: " md:hover:bg-black md:hover:text-white",
    logoColor: "#bfbfbf",
    logoText: "#000000",
    styleButton: " bg-[#2b2b2b] text-white",
    pointerItemBg: " bg-white",
    // pointerItem: " border-[#727272]",
    redBorder: " border-[#2b2b2b]",
    searchButton: " bg-[#bfbfbf]",
  };
  const color = {
    primary: " bg-[#9dd1ff] text-[#00355e]",
    secondary: " bg-[#00355e] text-[#ffffff]",
    active: " bg-[#00477e] text-white",
    hover: " md:hover:bg-[#00355e] md:hover:text-white",
    logoColor: "#c7f8ff",
    logoText: "#00477e",
    styleButton: " bg-[#00477e] text-white",
    pointerItemBg: " bg-[#88c8ff]",
    // pointerItem: " border-[#46a9ff]",
    redBorder: " border-[#00477e]",
    searchButton: " bg-[#c7f8ff]",
  };

  const changeFontSize = (order: string) => {
    switch (order) {
      case "asc":
        if (fontSize < 32) {
          document.documentElement.style.fontSize = Number(fontSize) + 2 + "px";
          localStorage.setItem("fontSize", String(Number(fontSize) + 2));
          setFontSize(Number(fontSize) + 2);
        }
        break;
      case "desc":
        if (fontSize > 16) {
          document.documentElement.style.fontSize = Number(fontSize) - 2 + "px";
          localStorage.setItem("fontSize", String(Number(fontSize) - 2));
          setFontSize(Number(fontSize) - 2);
        }
        break;
    }
  };
  return (
    <div className="hidden lg:flex flex-row fixed right-0 top-0 z-40 border border-black " style={{ fontSize: "20px" }}>
      <button
        className={"text-center font-bold border-e border-black hover:bg-[#d32f2f]" + theme.styleButton}
        style={{ width: "44px", height: "44px" }}
        onClick={() => changeFontSize("desc")}
        title="Изменение размера шрифта - уменьшить шрифт"
      >
        -
      </button>
      <button
        className="text-center font-bold border-e border-black bg-[#fff] hover:bg-[#d32f2f]"
        style={{ width: "44px", height: "44px" }}
        onClick={() => {
          setTheme(standart);
          localStorage.setItem("theme", JSON.stringify(standart));
        }}
        title="Изменение цветовой схемы - стандартный режим"
      >
        A
      </button>
      <button
        className="text-center text-white font-bold border-e border-black bg-[#646464] hover:bg-[#d32f2f]"
        style={{ width: "44px", height: "44px" }}
        onClick={() => {
          setTheme(reverse);
          localStorage.setItem("theme", JSON.stringify(reverse));
        }}
        title="Изменение цветовой схемы - режим инверсии"
      >
        A
      </button>
      <button
        className="text-center font-bold border-e border-black bg-[#9dd1ff] hover:bg-[#d32f2f]"
        style={{ width: "44px", height: "44px" }}
        onClick={() => {
          setTheme(color);
          localStorage.setItem("theme", JSON.stringify(color));
        }}
        title="Изменение цветовой схемы - цветной режим"
      >
        A
      </button>
      <button
        className={"text-center font-bold hover:bg-[#d32f2f]" + theme.styleButton}
        style={{ width: "44px", height: "44px" }}
        onClick={() => changeFontSize("asc")}
        title="Изменение размера шрифта - увеличить шрифт"
      >
        +
      </button>
    </div>
  );
};

export default StylesMenu;
