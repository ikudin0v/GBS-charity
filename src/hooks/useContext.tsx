import React, { useContext, useState, useEffect } from "react";
import API from "../api";
import { transformCategories } from "../utils/transformData";
import { transformOrganizations } from "../utils/transformData";
import { getActiveFilters } from "../utils/transformData";
import "react-toastify/dist/ReactToastify.css";
import { IPartialOrganization, ILocation, ICategory, IPerson, IActiveFilters, ITheme } from "../interfaces";
import categoriesService from "../services/categories.service";
import locationsService from "../services/locations.service";
import organizationsService from "../services/organizations.service";
import personsService from "../services/persons.service";

interface IContextProvider {
  children: React.ReactNode;
}

const Context = React.createContext({});

export const useData = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }: IContextProvider) => {
  const [page, setPage] = useState<string>(document.URL.split("/")[3] ? document.URL.split("/")[3] : "map");
  const [organizations, setOrganizations] = useState<IPartialOrganization[]>();
  const [locations, setLocations] = useState<ILocation[]>();
  const [categories, setCategories] = useState<{
    [key: string]: ICategory[];
  }>();
  const [persons, setPersons] = useState<IPerson[]>();
  const [activeFilters, setActiveFilters] = useState<IActiveFilters>({});
  const [filteredOrganizations, setFilteredOrganizations] = useState<IPartialOrganization[]>([]);
  const [fontSize, setFontSize] = useState<number>(localStorage.fontSize ? Number(localStorage.getItem("fontSize")) : 16);
  const [searchReq, setSearchReq] = useState<string>("");
  const [findedItemsCount, setFindedItemsCount] = useState<number>(0);
  const [searchRes, setSearchRes] = useState<boolean>(false);
  const [theme, setTheme] = useState<ITheme>(
    localStorage.theme
      ? JSON.parse(localStorage.getItem("theme")!)
      : {
          primary: " bg-white text-black",
          secondary: " bg-[#555554] text-white",
          active: " bg-[#d32f2f] text-white",
          hover: " md:hover:bg-[#555554] md:hover:text-white",
          logoColor: "#FFF450",
          logoText: "#000000",
          styleButton: " bg-[#e5e7e8] text-black",
          pointerItemBg: " bg-[#e5e7e8]",
          // pointerItem: " border-[#727272]",
          redBorder: " border-[#d32f2f]",
          searchButton: " bg-[#FFF450]",
        }
  );

  async function getData() {
    // первым грузим данные для фильтра
    const catsData = await categoriesService.fetchAll();
    setCategories(transformCategories(catsData));
    setActiveFilters(getActiveFilters(catsData));

    // грузим всё для показа карты
    const locsData = await locationsService.fetchAll();
    const orgsData = await organizationsService.fetchAll();
    console.log(orgsData);
    setLocations(locsData);
    // повторно сбрасываем фильтр после загрузки данных для карты
    // setActiveFilters(getActiveFilters(catsData));
    const newOrgsData = transformOrganizations(orgsData, catsData);
    setOrganizations(newOrgsData);
    setFilteredOrganizations(newOrgsData);

    // персоны последними - они не важны при старте главной
    const persData = await personsService.fetchAll();
    setPersons(persData);
  }

  useEffect(() => {
    getData();
  }, []);

  document.documentElement.style.fontSize = fontSize + "px";

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        organizations,
        setOrganizations,
        locations,
        setLocations,
        categories,
        setCategories,
        activeFilters,
        setActiveFilters,
        filteredOrganizations,
        setFilteredOrganizations,
        fontSize,
        setFontSize,
        theme,
        setTheme,
        persons,
        setPersons,
        searchReq,
        setSearchReq,
        findedItemsCount,
        setFindedItemsCount,
        searchRes,
        setSearchRes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
