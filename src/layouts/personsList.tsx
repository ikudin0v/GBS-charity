import React, { useState, useEffect } from "react";
import MainLayout from "./mainLayout";
import PointerItem from "../components/pointerItem";
import { useData } from "../hooks/useContext";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import Loader from "../components/loader";
import { IPerson, IUseData } from "../interfaces";

const PersonsList = () => {
  const { setPage, persons, theme } = useData() as IUseData;
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const pageSize: number = 16;

  useEffect(() => {
    setPage("persons");
		document.title = "Люди"
  }, []);

  return (
    <MainLayout>
      <div className="px-2 lg:px-0 lg:m-auto flex flex-row w-full lg:w-4/5 h-100">
        <div className="grow">
          {persons ? (
            <>
              <h2 className={"text-lg font-medium mb-2 border-b-2" + theme.redBorder} autoFocus={true}>
                {"Люди (" + persons.length + ")"}
              </h2>
              <ul>
                {paginate<IPerson>(persons, paginationPage, pageSize).map(
                  (item: IPerson) => (
                    <PointerItem
                      key={item._id}
                      name={item.name}
                      link={"persons/" + item._id}
                      num={persons.indexOf(item) + 1}
                    />
                  )
                )}
              </ul>
              <Pagination
                productCount={persons.length}
                pageSize={pageSize}
                currentPage={paginationPage}
                onPageChange={(page: number) => setPaginationPage(page)}
              />
            </>
          ) : (
            <Loader title={"Загрузка списка людей..."} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonsList;
