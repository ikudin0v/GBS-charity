import React from "react";
import _ from "lodash";
import { useData } from "../hooks/useContext";
import { IUseData } from "../interfaces";

interface IPagination {
  productCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange(page: number): any;
}

const Pagination = ({ productCount, pageSize, currentPage, onPageChange }: IPagination) => {
  const { theme } = useData() as IUseData;
  const pagesCount: number = Math.ceil(productCount / pageSize);

  if (pagesCount <= 1) {
    return null;
  }

  const pagesList: number[] = _.range(1, pagesCount + 1);

  return (
    <div className="flex flex-row justify-center mt-3">
      <nav className="flex flex-row border border-black">
        <button
          className={
            currentPage === 1
              ? "text-xl h-10 w-10 pb-1 border-e border-black text-center cursor-not-allowed"
              : "text-xl h-10 w-10 pb-1 border-e border-black text-center hover:bg-[#d32f2f] hover:text-white"
          }
          onClick={() => (currentPage !== 1 ? onPageChange(currentPage - 1) : undefined)}
          title="Предыдущая страница"
        >
          {"«"}
        </button>
        {pagesList.map((item) => (
          <button
            key={item}
            className={
              currentPage === item
                ? "text-xl h-10 w-10 pb-1 border-e border-black text-center" + theme.active
                : "text-xl h-10 w-10 pb-1 border-e border-black text-center hover:bg-[#d32f2f] hover:text-white"
            }
            onClick={() => onPageChange(item)}
            title={currentPage === item ? "Текущая страница" : "Страница " + item}
          >
            {item}
          </button>
        ))}
        <button
          className={
            currentPage === pagesList[pagesList.length - 1]
              ? "text-xl h-10 w-10 pb-1 text-center cursor-not-allowed"
              : "text-xl h-10 w-10 pb-1 text-center hover:bg-[#d32f2f] hover:text-white"
          }
          onClick={() => (currentPage !== pagesList[pagesList.length - 1] ? onPageChange(currentPage + 1) : undefined)}
          title="Следующая страница"
        >
          {"»"}
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
