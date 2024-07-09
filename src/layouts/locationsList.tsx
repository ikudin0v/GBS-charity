import React, { useState, useEffect } from "react";
import MainLayout from "./mainLayout";
import PointerItem from "../components/pointerItem";
import { useData } from "../hooks/useContext";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import Loader from "../components/loader";
import { ILocation, IUseData } from "../interfaces";

const LocationsList = () => {
  const { setPage, locations, theme } = useData() as IUseData;
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const pageSize: number = 16;

  useEffect(() => {
    setPage("locations");
		document.title = "Адреса"
  }, []);

  return (
    <MainLayout>
      <div className="px-2 lg:px-0 lg:m-auto flex flex-row w-full lg:w-4/5 h-100">
        <div className="grow">
          {locations ? (
            <>
              <h2 className={"text-lg font-medium mb-2 border-b-2" + theme.redBorder} autoFocus={true}>
                {"Адреса (" + locations.length + ")"}
              </h2>
              <ul>
                {paginate<ILocation>(locations, paginationPage, pageSize).map(
                  (item: ILocation) => (
                    <PointerItem
                      key={item._id}
                      name={item.adress}
                      link={"locations/" + item._id}
                      num={locations.indexOf(item) + 1}
                    />
                  )
                )}
              </ul>
              <Pagination
                productCount={locations.length}
                pageSize={pageSize}
                currentPage={paginationPage}
                onPageChange={(page: number) => setPaginationPage(page)}
              />
            </>
          ) : (
            <Loader title={"Загрузка списка адресов..."} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default LocationsList;
