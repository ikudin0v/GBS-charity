import React from "react";
import ContactsData from "./contactsData";
import { Link } from "react-router-dom";
import { useData } from "../hooks/useContext";
import { CONFIG } from "../config";
import { IUseData } from "../interfaces";

const Footer = () => {
  const { setPage, theme } = useData() as IUseData;

  return (
    <footer className="mx-2 lg:mx-auto lg:flex-row lg:w-4/5">
      <div className={"mt-5 p-2 flex flex-col border-t-2" + theme.redBorder}>
        <div className="flex flex-row">
          <nav className="flex flex-col me-10">
            <h4 className={"text-lg font-semibold border-b-2 w-fit" + theme.redBorder}>Разделы:</h4>
            <Link to="/map" onClick={() => setPage("map")}>
              Карта
            </Link>
            <Link to="/organizations" onClick={() => setPage("organizations")}>
              Организации
            </Link>
            {CONFIG.SHOW_PERSONS ? (
              <Link to="/persons" onClick={() => setPage("persons")}>
                Люди
              </Link>
            ) : null}
            <Link to="/about" onClick={() => setPage("about")}>
              О проекте
            </Link>
          </nav>
          <div className="flex flex-col me-10">
            <h4 className={"text-lg font-semibold border-b-2 w-fit" + theme.redBorder}>Контакты:</h4>
            <ContactsData />
          </div>
        </div>

        <div className="flex w-full mt-5">{"© СПб ГБУК ГСЦБС, 2012-" + new Date().getFullYear() + " гг."}</div>
      </div>
    </footer>
  );
};

export default Footer;
