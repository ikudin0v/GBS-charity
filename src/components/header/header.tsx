import React from "react";
import NavbarMenu from "./navbarMenu";
import StylesMenu from "../stylesMenu";
import Logo from "../SVG/logo";
import { useHistory } from "react-router-dom";
import { CONFIG } from "../../config";

const Header = () => {
  const history = useHistory();
  return (
    <header className="sm:m-auto py-2 flex flex-col lg:w-4/5">
      <StylesMenu />
      <div className="flex justify-center lg:justify-start">
        <div className="md:block hidden w-1/6 h-fit hover:cursor-pointer" onClick={() => history.push("/")}>
          <Logo />
        </div>

        <div className="md:block hidden border border-solid border-black mx-5"></div>
        <h1 className="flex text-4xl font-semibold self-center text-center hover:cursor-pointer" onClick={() => history.push("/")}>
          {CONFIG.MAIN_PAGE.HEADER}
        </h1>
      </div>
      <NavbarMenu />
    </header>
  );
};

export default Header;
