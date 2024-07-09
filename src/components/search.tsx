import React, { useState } from "react";
import Xsvg from "./SVG/Xsvg";
import { useData } from "../hooks/useContext";
import { IUseData, IPartialOrganization, IActiveFilters } from "../interfaces";
import organizationsService from "../services/organizations.service";

const Search = () => {
  const [input, setInput] = useState<string>("");

  const {
    organizations,
    setFilteredOrganizations,
    activeFilters,
    setActiveFilters,
    theme,
    searchRes,
    setSearchRes,
    searchReq,
    setSearchReq,
    findedItemsCount,
    setFindedItemsCount,
  } = useData() as IUseData;

  async function search(req: string) {
    if (req) {
      // сброс фильтров при поиске
      let newActiveFilters: IActiveFilters = {};
      Object.keys(activeFilters).forEach((group: string) => {
        Object.keys(activeFilters[group]).forEach((cat) => {
          if (!newActiveFilters[group]) {
            newActiveFilters[group] = {};
          }
          newActiveFilters[group][cat] = false;
        });
      });
      setActiveFilters(newActiveFilters);

      const data = await organizationsService.search(req);
      let newOrgs: IPartialOrganization[] = [];
      organizations.forEach((org: IPartialOrganization) => {
        if (data.includes(org._id)) {
          newOrgs.push(org);
        }
      });
      setFilteredOrganizations(newOrgs);
      setInput("");
      setSearchReq(req);
      setFindedItemsCount(data.length);
      setSearchRes(true);
    }
  }

  const clearSearch = () => {
    setSearchRes(false);
    setFilteredOrganizations(organizations);
  };

  return (
    <div className="flex flex-col">
      <div className="border border-black flex flex-row mb-2">
        <div className=" border-e border-black flex flex-row w-full bg-white">
          <input
            id="searchInput"
            value={input}
            className={"p-2 w-full outline-none placeholder:text-black placeholder:font-semibold"}
            placeholder="Поиск"
            type="text"
            aria-label="Строка поиска"
            // title="Строка поиска"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.keyCode === 13 && e.currentTarget.id === "searchInput" ? search(input) : undefined
            }
          />
          {input ? (
            <button className="mx-2 font-semibold" onClick={() => setInput("")} title="Очистить строку поиска">
              <Xsvg color="#000000" />
            </button>
          ) : null}
        </div>
        <button className={"py-2 px-5 font-semibold" + theme.searchButton} onClick={() => search(input)}>
          Найти
        </button>
      </div>
      {searchRes ? (
        <div className="flex flex-col md:flex-row mb-2 justify-between">
          <div className="flex flex-col md:flex-row">
            <button className="text-red-600 w-fit" onClick={() => clearSearch()}>
              Очистить поиск
            </button>
            <div className="md:mx-3">{"Вы искали: " + searchReq}</div>
          </div>

          <div className="">{"Найдено объектов: " + findedItemsCount}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
