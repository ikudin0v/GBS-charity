import React, { useState, useEffect } from "react";
import MainLayout from "./mainLayout";
import PointerItem from "../components/pointerItem";
import { useData } from "../hooks/useContext";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import Loader from "../components/loader";
import { IPartialOrganization, IUseData } from "../interfaces";

const OrganizationsList = () => {
  const { setPage, organizations, theme } = useData() as IUseData;
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const pageSize: number = 16;

  useEffect(() => {
    setPage("organizations");
    document.title = "Организации";
  }, []);

  return (
    <MainLayout>
      <div className="px-2 lg:px-0 lg:m-auto flex flex-row w-full lg:w-4/5 h-100">
        <div className="grow">
          {organizations ? (
            <>
              <h2 className={"text-lg font-medium mb-2 border-b-2" + theme.redBorder} autoFocus={true}>
                {"Организации (" + organizations.length + ")"}
              </h2>
              <ul>
                {paginate<IPartialOrganization>(organizations, paginationPage, pageSize).map((item: IPartialOrganization) => (
                  <PointerItem
                    key={item._id}
                    name={item.name}
                    link={"organizations/" + item._id}
                    num={organizations.indexOf(item) + 1}
                    subnames={item.subnames}
                  />
                ))}
              </ul>
              <Pagination
                productCount={organizations.length}
                pageSize={pageSize}
                currentPage={paginationPage}
                onPageChange={(page: number) => setPaginationPage(page)}
              />
            </>
          ) : (
            <Loader title={"Загрузка списка организаций..."} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default OrganizationsList;
