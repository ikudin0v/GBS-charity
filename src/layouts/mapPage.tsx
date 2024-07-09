import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
import MainLayout from "./mainLayout";
import Filter from "../components/filter";
import YandexMap from "../components/yandexMap";
import Loader from "../components/loader";
import { useData } from "../hooks/useContext";
import Search from "../components/search";
import PointerItem from "../components/pointerItem";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import { IUseData, IActiveFilters, IPartialOrganization, ICategory } from "../interfaces";
import Xsvg from "../components/SVG/Xsvg";
import { declOfNumText } from "../utils/helpers";
import { CONFIG } from "../config";

const MapPage = () => {
  const {
    setPage,
    organizations,
    locations,
    categories,
    persons,
    activeFilters,
    setActiveFilters,
    filteredOrganizations,
    setFilteredOrganizations,
    theme,
    setSearchRes,
  } = useData() as IUseData;

  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const pageSize: number = 10;

  useEffect(() => {
    setPage("map");
    document.title = CONFIG.MAIN_PAGE.HEADER;
    setTimeout(() => {
      Array.from(document.getElementsByClassName("ymaps-2-1-79-copyright")).forEach((el) => el.remove());
    }, 500);
  }, []);

  return (
    <>
      <div className={showFilter ? "fixed min-h-full bg-white w-full z-50 p-2" : "hidden"}>
        <div className="relative">
          <button
            className="text-center font-semibold absolute right-0 top-0 h-7 w-7 m-2 text-white"
            onClick={() => {
              setShowFilter(false);
              document.body.style.overflow = "";
            }}
            title="закрыть"
          >
            <Xsvg color="#ffffff" />
          </button>
          {categories && activeFilters ? <Filter /> : <Loader title={"Загрузка фильтра..."} />}
        </div>
      </div>
      <MainLayout>
        <div className="sm:m-auto px-2 lg:px-0 flex flex-col w-full lg:w-4/5 h-100">
          <Search />
          <div className="m-auto flex w-full">
            <div className="hidden md:flex h-full w-1/6 z-10 min-h-[58vh]">
              {categories && activeFilters ? <Filter /> : <Loader title={"Загрузка фильтра..."} />}
            </div>
            <div className="flex flex-col w-full md:w-5/6 md:ps-2 min-h-[58vh]">
              <button
                className={"md:hidden p-1 mb-2 text-2xl font-semibold border border-black" + theme.searchButton}
                onClick={() => {
                  setShowFilter(true);
                  document.body.style.overflow = "hidden";
                }}
              >
                Фильтры
              </button>
              {categories && locations && filteredOrganizations ? (
                <YandexMap locs={locations} cats={categories} orgs={filteredOrganizations} pers={persons} theme={theme} />
              ) : (
                <Loader title={"Загрузка карты..."} />
              )}
              <hr className="h-0 opacity-0" />
              <main className="flex flex-col">
                {filteredOrganizations.length !== 0 ? (
                  <h2 className="mb-2 text-lg font-medium">
                    {"На карте показаны " + declOfNumText(filteredOrganizations.length, ["организация", "организации", "организаций"], true) + ":"}
                  </h2>
                ) : null}
                <ul>
                  {filteredOrganizations
                    ? paginate(filteredOrganizations, paginationPage, pageSize).map((org: IPartialOrganization) => (
                        <PointerItem key={org._id} name={org.name} link={"organizations/" + org._id} num={filteredOrganizations.indexOf(org) + 1} />
                      ))
                    : null}
                </ul>
                <Pagination
                  productCount={filteredOrganizations.length}
                  pageSize={pageSize}
                  currentPage={paginationPage}
                  onPageChange={(page: number) => setPaginationPage(page)}
                />
              </main>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default MapPage;
