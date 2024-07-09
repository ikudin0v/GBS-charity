import React, { useState } from "react";
import { engToRus } from "../../utils/engToRus";
import NavbarLgItem from "./navbarLgItem";
import { useData } from "../../hooks/useContext";
import NavbarSmItem from "./navbarSmItem";
import Modal from "../modal";
import GeneratorModal from "../generatorModal";
import { generateOrgs, generateLocs } from "../../utils/generator";
import { transformOrganizations } from "../../utils/transformData";
import API from "../../api";
import { CONFIG } from "../../config";
import { IUseData } from "../../interfaces";
import categoriesService from "../../services/categories.service";

const NavbarMenu = () => {
  const { page, setOrganizations, setLocations, setFilteredOrganizations, theme } = useData() as IUseData;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  async function generateData(orgsAmount: number, locsAmount: number) {
    setFilteredOrganizations([]);
    const catsData = await categoriesService.fetchAll();
    setLocations(generateLocs(locsAmount));
    const newOrgsData = transformOrganizations(generateOrgs(orgsAmount, locsAmount), catsData);
    setOrganizations(newOrgsData);
    setFilteredOrganizations(newOrgsData);
  }

  return (
    <>
      {showModal ? (
        <Modal header={"Генератор карты"} close={() => setShowModal(false)}>
          <GeneratorModal
            generate={(orgs: number, locs: number) => generateData(orgs, locs)}
            cancel={() => {
              setShowModal(false);
              document.body.style.overflow = "";
            }}
          />
        </Modal>
      ) : null}
      <nav className={"md:flex hidden mt-4 border-b-2 mx-2 lg:mx-0" + theme.redBorder}>
        <NavbarLgItem header="map" />
        <NavbarLgItem header="organizations" />
        {CONFIG.SHOW_LOCATIONS ? <NavbarLgItem header="locations" /> : null}
        {CONFIG.SHOW_PERSONS ? <NavbarLgItem header="persons" /> : null}
        <NavbarLgItem header="about" />
        {CONFIG.MAP_GENERATOR ? (
          <button
            className={"text-2xl p-2" + theme.primary + theme.hover}
            onClick={() => {
              setShowModal(true);
              document.body.style.overflow = "hidden";
            }}
          >
            Генератор карты
          </button>
        ) : null}
      </nav>

      <nav className={"md:hidden block mt-4 border-b-2 mx-2" + theme.redBorder}>
        <div className="" onClick={() => setShowDropdown(!showDropdown)}>
          <p className={"text-2xl font-bold text-center p-2" + theme.active}>{engToRus(page)}</p>
        </div>
        <div className={showDropdown ? "block border-t-2" : "hidden"} id="navDropdown">
          <NavbarSmItem header="map" onChange={() => setShowDropdown(false)} />
          <NavbarSmItem header="organizations" onChange={() => setShowDropdown(false)} />
          {CONFIG.SHOW_LOCATIONS ? <NavbarSmItem header="locations" onChange={() => setShowDropdown(false)} /> : null}
          {CONFIG.SHOW_PERSONS ? <NavbarSmItem header="persons" onChange={() => setShowDropdown(false)} /> : null}
          <NavbarSmItem header="about" onChange={() => setShowDropdown(false)} />
        </div>
      </nav>
    </>
  );
};

export default NavbarMenu;
