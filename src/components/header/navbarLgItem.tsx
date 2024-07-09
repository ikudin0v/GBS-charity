import React from "react";
import { useData } from "../../hooks/useContext";
import { engToRus } from "../../utils/engToRus";
import { useHistory } from "react-router-dom";
import { IUseData } from "../../interfaces";

interface INavbarLgItem {
  header: string;
}

const NavbarLgItem = ({ header }: INavbarLgItem) => {
  const { page, setPage, theme } = useData() as IUseData;
  const history = useHistory();
  return (
    <button
      className={page === header ? "cursor-pointer" + theme.active : "cursor-pointer" + theme.primary + theme.hover}
      onClick={() => {
        setPage(header);
        history.push("/" + header);
      }}
      title={"Перейти на страницу - " + engToRus(header)}
    >
      <p className="text-2xl p-2 text-center">{engToRus(header)}</p>
    </button>
  );
};

export default NavbarLgItem;
