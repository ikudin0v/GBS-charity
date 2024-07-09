import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useData } from "../hooks/useContext";
import { IUseData } from "../interfaces";

interface IPointerItem {
  name: string;
  num: number;
  link: string;
  subnames?: string[];
}

const PointerItem = ({ name, num, link, subnames }: IPointerItem) => {
  const { theme } = useData() as IUseData;
  // const history = useHistory();
  return (
    <li>
      {/* <div
        className={"flex flex-row hover:cursor-pointer" + theme.hover + ((num + 1) % 2 === 0 ? theme.pointerItemBg : "")}
        onClick={() => history.push(link)}
      >
        <div className="m-1 ms-3 me-5 flex-none">{num}</div>
        <a className="m-1" href={"/" + link}>
          {name}
        </a>
      </div> */}
      <Link to={link} className={"w-screen lg:w-full flex flex-col" + theme.hover + ((num + 1) % 2 === 0 ? theme.pointerItemBg : "")}>
        <div className="flex flex-row">
          <div className="m-1 ms-3 me-5 flex-none">{num}</div>
          <div className="m-1">{name}</div>
        </div>
        {subnames && subnames.length != 0 ? (
          <div className="flex flex-col w-full">
            <div className="flex flex-row">
              <div className="ms-4 me-5 flex-none text-transparent">{num}</div>
              <div className="">Мероприятия:</div>
            </div>
            {subnames?.map((item: string) => (
              <div className="flex flex-row" key={item}>
                <div className="ms-4 me-5 flex-none text-transparent">{num}</div>
                <div>{item}</div>
              </div>
            ))}
          </div>
        ) : null}
      </Link>
    </li>
  );
};

export default PointerItem;
