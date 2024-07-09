import React from "react";
import { useData } from "../../hooks/useContext";
import { engToRus } from "../../utils/engToRus";
import { useHistory } from "react-router-dom";
import { IUseData } from "../../interfaces";

interface INavbarSmItem {
  header: string;
  onChange(header: string): any;
}

const NavbarSmItem = ({ header, onChange }: INavbarSmItem) => {
  const { page, setPage, theme } = useData() as IUseData;
  const history = useHistory();

  return (
    <button
      className={"cursor-pointer flex justify-center" + theme.primary + theme.hover}
      onClick={() => {
        setPage(header);
        onChange(header);
        history.push("/" + header);
      }}
      title={"Перейти на страницу - " + engToRus(header)}
    >
      <p className={page === header ? "text-2xl text-center m-1 w-fit border-b-2" + theme.redBorder : "text-2xl text-center m-1 w-fit"}>
        {engToRus(header)}
      </p>
    </button>
  );
};

export default NavbarSmItem;
