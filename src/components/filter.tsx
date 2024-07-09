import React from "react";
import { useData } from "../hooks/useContext";
import { IActiveFilters, IUseData, IPartialOrganization } from "../interfaces";

const Filter = () => {
  const { theme, organizations, categories, activeFilters, setSearchRes, setActiveFilters, setFilteredOrganizations } = useData() as IUseData;

  const filterChange = (filterItem?: string, filterGroup?: string, isolate?: boolean) => {
    if (isolate) {
      Object.keys(activeFilters[filterGroup!]).forEach((item: string) => (activeFilters[filterGroup!][item] = false));
    }
    setSearchRes(false);
    let newActiveFilters: IActiveFilters = {};
    Object.keys(activeFilters).forEach((item: string) => {
      newActiveFilters[item] = activeFilters[item];
    });
    if (filterItem && filterGroup) {
      newActiveFilters[filterGroup][filterItem] = !newActiveFilters[filterGroup][filterItem];
    } else {
      Object.keys(newActiveFilters).forEach((group: string) => {
        Object.keys(newActiveFilters[group]).forEach((item: string) => {
          newActiveFilters[group][item] = false;
        });
      });
    }
    setActiveFilters(newActiveFilters);

    if (organizations) {
      let newFilteredOrganizations: IPartialOrganization[] = [];
      organizations.forEach((org: IPartialOrganization) => {
        //перебираем все организации
        let orgCatGroups: { [group: string]: boolean } = {};
        Object.keys(categories).forEach((group) => (orgCatGroups[group] = false));
        // перебираем группы одной организации
        Object.keys(org.categories).forEach((group: string) => {
          //перебираем категориии одной группы одной организации
          if (org.categories[group].length === 0 && Object.keys(activeFilters[group]).every((item: string) => activeFilters[group][item] === false)) {
            orgCatGroups[group] = true;
          } else {
            org.categories[group].forEach((category: string) => {
              if (
                // если все фильтры в категории false или в activeFilters организация true
                Object.keys(activeFilters[group]).every((item: string) => activeFilters[group][item] === false) ||
                activeFilters[group][category] === true
              ) {
                orgCatGroups[group] = true;
              }
            });
          }
        });
        if (Object.keys(orgCatGroups).every((item: string) => orgCatGroups[item] === true) && !newFilteredOrganizations.includes(org)) {
          newFilteredOrganizations.push(org);
        }
      });
      setFilteredOrganizations(newFilteredOrganizations);
    }
  };

  const getColor = (category: string) => {
    for (let group in categories) {
      for (let cat in categories[group]) {
        if (categories[group][cat]._id === category) {
          return categories[group][cat].color;
        }
      }
    }
  };

  const getName = (category: string) => {
    for (let group in categories) {
      for (let cat in categories[group]) {
        if (categories[group][cat]._id === category) {
          return categories[group][cat].name;
        }
      }
    }
  };

  return (
    <div className="h-fit w-full">
      <div className={"text-2xl font-semibold px-2 pt-1 pb-2" + theme.active}>Фильтры:</div>
      {Object.keys(activeFilters).map((group: string) => (
        <div key={group} className="">
          <h3 className={"font-semibold text-xl px-2 pt-2 border-b-2" + theme.primary + theme.redBorder}>{group}</h3>
          <ul className="text-lg font-medium" title={group}>
            {Object.keys(activeFilters[group]).map((category: string) => (
              <li
                key={category}
                className={
                  !activeFilters[group][category]
                    ? "cursor-pointer px-2 mt-1" + theme.hover + theme.primary
                    : "cursor-pointer px-2 mt-1" + theme.active + theme.hover
                }
              >
                <label className="flex flex-row">
                  <input
                    type="checkbox"
                    className="w-0 h-0"
                    title={getName(category)}
                    value={getName(category)}
                    name={getName(category)}
                    checked={activeFilters[group][category]}
                    onChange={() => {}}
                    aria-label={getName(category)}
                    onClick={() => filterChange(category, group)}
                  />

                  <span className="text-left flex flex-row" onDoubleClick={() => filterChange(category, group, true)}>
                    {getColor(category) ? (
                      <div className={"w-4 h-4 rounded-full p-2 me-2 mt-1"} style={{ backgroundColor: getColor(category) }}></div>
                    ) : null}
                    {getName(category)}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className={"font-semibold px-2 pt-1 pb-1 mt-1 cursor-pointer w-full" + theme.active + theme.hover} onClick={() => filterChange()}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filter;
