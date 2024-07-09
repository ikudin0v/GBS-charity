import React, { useState } from "react";
import { useData } from "../hooks/useContext";
import { IUseData } from "../interfaces";

interface IGeneratorModal {
  generate(orgs: number, locs: number): any;
  cancel(): any;
}

const GeneratorModal = ({ generate, cancel }: IGeneratorModal) => {
  const { organizations, locations } = useData() as IUseData;
  const [orgs, setOrgs] = useState<string>("");
  const [locs, setLocs] = useState<string>("");

  const inputValidate = (e: String) => {
    let data = "";
    for (let i in e) {
      if (!Number.isNaN(Number(e[i]))) {
        data += e[i];
      }
    }
    return data;
  };

  const generationValidate = () => {
    if (Number(orgs) > 0 && Number(locs) > 0) {
      generate(Number(orgs), Number(locs));
      cancel();
    }
  };

  return (
    <div className="w-fit">
      <div className="text-center border border-black m-2 p-2">
        <div>
          {"Сейчас на карте " +
            (organizations ? organizations.length : 0) +
            " организаций и " +
            (locations ? locations.length : 0) +
            " адресов"}
        </div>
        <div>{"Укажите новое количество организаций и адресов"}</div>
      </div>
      <div className="flex flex-row justify-around">
        <div className="">
          <div className="text-center">Организаций</div>
          <input
            value={orgs}
            type="text"
            className="border border-black mx-2 text-center"
            onChange={(e) => setOrgs(inputValidate(e.target.value))}
          />
        </div>
        <div>
          <div className="text-center">Адресов</div>
          <input
            value={locs}
            type="text"
            className="border border-black mx-2 text-center"
            onChange={(e) => setLocs(inputValidate(e.target.value))}
          />
        </div>
      </div>
      <div className="flex flex-row justify-around mt-3">
        <button
          className="border border-black w-1/4 m-2 hover:bg-slate-200"
          onClick={() => generationValidate()}
        >
          ОК
        </button>
        <button
          className="border border-black w-1/4 m-2 hover:bg-slate-200"
          onClick={() => cancel()}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

export default GeneratorModal;
