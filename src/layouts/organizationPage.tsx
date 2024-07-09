import React, { useEffect, useState } from "react";
import MainLayout from "./mainLayout";
import API from "../api";
import Loader from "../components/loader";
import { useData } from "../hooks/useContext";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { CONFIG } from "../config";
import OrganizationPageMap from "../components/organizationPageMap";
import { IFullOrganization, IUseData, IPerson, ILocation, IPartialOrganization, ICategory } from "../interfaces";
import organizationsService from "../services/organizations.service";

const OrganizationPage = ({ match }: RouteComponentProps<{ organizationId: string }>) => {
  const [organization, setOrganization] = useState<IFullOrganization>();
  const [activeImg, setActiveImg] = useState<string>();
  const { setPage, organizations, locations, persons, categories, theme } = useData() as IUseData;

  async function getOrg(id: string) {
    const orgData = await organizationsService.getById(id);
    setOrganization(orgData);
    if (orgData?.gallery && orgData?.gallery.length !== 0) {
      setActiveImg(orgData.gallery[0]);
    } else {
      setActiveImg("нет изображения$/IMG/no_img.jpg");
    }
    document.title = orgData.name;
  }

  function getLocation(location: string): ILocation | undefined {
    for (let i in locations) {
      if (locations[i]._id === location) {
        return locations[i];
      }
    }
  }

  function getPerson(person: string): IPerson | undefined {
    for (let i in persons) {
      if (persons[i]._id === person) {
        return persons[i];
      }
    }
  }

  function getOrganization(org: string): IPartialOrganization | undefined {
    for (let i in organizations) {
      if (organizations[i]._id === org) {
        return organizations[i];
      }
    }
  }

  function getCategory(cat: string): ICategory | undefined {
    for (let group in categories) {
      for (let category in categories[group])
        if (categories[group][category]._id === cat) {
          return categories[group][category];
        }
    }
  }

  function getCategoriesAsObj(cats: string[]) {
    const newCats: any = {};
    cats.forEach((cat: string) => {
      const newCat: any = getCategory(cat);
      if (!newCats[newCat?.group]) {
        newCats[newCat?.group] = [];
      }
      newCats[newCat?.group].push(newCat.name);
    });
    return newCats;
  }

  useEffect(() => {
    setOrganization(undefined);
    getOrg(match.params.organizationId);
  }, [match.params.organizationId]);

  useEffect(() => {
    setPage("organizations");
    setTimeout(() => {
      Array.from(document.getElementsByClassName("ymaps-2-1-79-copyright")).forEach((el) => el.remove());
    }, 700);
  }, []);

  return (
    <MainLayout>
      <div className="px-2 lg:px-0 lg:m-auto flex flex-col w-full lg:w-4/5 h-100">
        {organization && locations && persons ? (
          <>
            <h2 className={"w-fit text-center text-3xl pb-1 px-2 font-semibold border-b-2 self-center" + theme.redBorder}>{organization.name}</h2>

            <div className="flex flex-col lg:flex-row mt-3">
              {organization.gallery ? (
                <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/3 flex flex-col h-fit self-center lg:self-start">
                  <img
                    src={activeImg?.includes("$") ? activeImg.split("$")[1] : activeImg}
                    className=" w-full top-0 bottom-0 m-auto"
                    alt={activeImg?.includes("$") ? activeImg.split("$")[0] : "Изображение " + organization.name}
                  />
                  {organization.gallery.length !== 0 ? (
                    <div className="m-2 text-center">{activeImg?.includes("$") ? activeImg.split("$")[0] : "Изображение " + organization.name}</div>
                  ) : null}
                  <div className="flex flex-row overflow-auto lg:justify-between h-fit self-center">
                    {organization.gallery.length > 1
                      ? organization.gallery.map((img: string) => (
                          <img
                            key={img}
                            src={img?.includes("$") ? img.split("$")[1] : img}
                            className={activeImg === img ? "h-28 w-36 mx-1 my-2 border-2 p-1 border-black" : "h-28 w-36 mx-1 my-2"}
                            onClick={() => setActiveImg(img)}
                            alt={
                              img?.includes("$") ? img.split("$")[0] : "Изображение " + organization.gallery?.indexOf(img) + " " + organization.name
                            }
                          />
                        ))
                      : null}
                  </div>
                </div>
              ) : null}

              <main
                className={
                  organization.gallery && organization.gallery.length !== 0 ? "w-full lg:w-2/3 flex flex-col lg:ps-3" : "w-full flex flex-col"
                }
              >
                {organization.categories ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.ORGANIZATION_PAGE.CATEGORIES !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.ORGANIZATION_PAGE.CATEGORIES}</h3>
                    ) : null}
                    {Object.keys(getCategoriesAsObj(organization.categories)).map((group) => (
                      <div key={group}>{group + ": " + getCategoriesAsObj(organization.categories)[group].join(", ")}</div>
                    ))}
                  </div>
                ) : null}

                {organization.info ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.ORGANIZATION_PAGE.INFO !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.ORGANIZATION_PAGE.INFO}</h3>
                    ) : null}
                    <div className="px-1">
                      {organization.info.split("\n").map((subStr, i) => (
                        <span key={i}>
                          {subStr}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {organization.locations ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.ORGANIZATION_PAGE.LOCATIONS !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.ORGANIZATION_PAGE.LOCATIONS}</h3>
                    ) : null}
                    {organization.locations.map((location: string) =>
                      CONFIG.SHOW_LOCATIONS ? (
                        <Link key={location} to={"/locations/" + location} className="block underline px-1 w-fit">
                          {getLocation(location)?.adress}
                        </Link>
                      ) : (
                        <div className="px-1" key={location}>
                          {getLocation(location)?.adress}
                        </div>
                      )
                    )}
                  </div>
                ) : null}

                {organization.persons && organization.persons.length !== 0 ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.ORGANIZATION_PAGE.PERSONS !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.ORGANIZATION_PAGE.PERSONS}</h3>
                    ) : null}
                    {organization.persons.map((person: string) =>
                      CONFIG.SHOW_PERSONS ? (
                        <Link key={person} to={"/persons/" + person} className="block underline px-1 w-fit">
                          {getPerson(person)?.name}
                        </Link>
                      ) : (
                        <div className="px-1" key={person}>
                          {getPerson(person)?.name}
                        </div>
                      )
                    )}
                  </div>
                ) : null}

                {organization.organizations && organization.organizations.length !== 0 ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.ORGANIZATION_PAGE.ORGANIZATIONS !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.ORGANIZATION_PAGE.ORGANIZATIONS}</h3>
                    ) : null}
                    {organization.organizations.map((org: string) => (
                      <Link key={org} to={"/organizations/" + org} className="block underline px-1 w-fit">
                        {getOrganization(org)?.name}
                      </Link>
                    ))}
                  </div>
                ) : null}

                {organization.alt_names && organization.alt_names.length !== 0 ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.ORGANIZATION_PAGE.ALT_NAMES !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.ORGANIZATION_PAGE.ALT_NAMES}</h3>
                    ) : null}
                    {organization.alt_names.map((altName: string) => (
                      <div className="px-1" key={altName}>
                        {altName}
                      </div>
                    ))}
                  </div>
                ) : null}

                {organization.links && organization.links.length !== 0 ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.ORGANIZATION_PAGE.LINKS !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.ORGANIZATION_PAGE.LINKS}</h3>
                    ) : null}
                    {organization.links.map((link: string) =>
                      link.includes("$") ? (
                        <a key={link} href={link.split("$")[1]} className="underline block px-1" target="_blank">
                          {link.split("$")[0] !== "" ? link.split("$")[0] : link.split("$")[1]}
                        </a>
                      ) : (
                        <div className="px-1" key={link}>
                          {link}
                        </div>
                      )
                    )}
                  </div>
                ) : null}
              </main>
            </div>

            {organization.locations && organization.locations.length !== 0 ? (
              <div className="w-full ">
                <OrganizationPageMap locations={organization.locations.map((loc) => getLocation(loc))} />
              </div>
            ) : null}
          </>
        ) : (
          <Loader title={"Загрузка информации об организации..."} />
        )}
      </div>
    </MainLayout>
  );
};

export default OrganizationPage;
