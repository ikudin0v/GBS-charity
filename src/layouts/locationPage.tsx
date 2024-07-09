import React, { useEffect, useState } from "react";
import MainLayout from "./mainLayout";
import API from "../api";
import Loader from "../components/loader";
import { useData } from "../hooks/useContext";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { CONFIG } from "../config";
import { IUseData, IPerson, ILocation, IPartialLocation, IPartialOrganization } from "../interfaces";
import locationsService from "../services/locations.service";

const LocationPage = ({ match }: RouteComponentProps<{ locationId: string }>) => {
  const [location, setLocation] = useState<ILocation>();
  const { setPage, organizations, locations, persons, theme } = useData() as IUseData;

  async function getLoc(id: string) {
    const locData = await locationsService.getById(id);
    setLocation(locData);
    document.title = locData.adress;
  }

  function getPerson(person: string): IPerson | undefined {
    for (let i in persons) {
      if (persons[i]._id === person) {
        return persons[i];
      }
    }
  }

  function getOrganizations() {
    let newOrgs: IPartialOrganization[] = [];
    organizations.forEach((org: IPartialOrganization) => {
      if (org.locations.includes(location!._id) && !newOrgs.includes(org)) {
        newOrgs.push(org);
      }
    });
    return newOrgs;
  }

  useEffect(() => {
    setLocation(undefined);
    getLoc(match.params.locationId);
  }, [match.params.locationId]);

  useEffect(() => {
    setPage("locations");
  }, []);

  return (
    <MainLayout>
      <div className="px-2 lg:px-0 lg:m-auto flex flex-col w-full lg:w-4/5 h-100">
        {location && locations && persons ? (
          <>
            <h2 className={"w-fit text-center text-3xl pb-1 px-2 font-semibold border-b-2 self-center" + theme.redBorder}>{location.adress}</h2>

            <div className="flex flex-col lg:flex-row mt-3">
              <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/3 flex flex-col h-fit self-center lg:self-start">
                <img
                  src={location.image ? (location.image?.includes("$") ? location.image.split("$")[1] : location.image) : "/IMG/no_img.jpg"}
                  className=" w-full top-0 bottom-0 m-auto "
                  alt={
                    location.image
                      ? location.image?.includes("$")
                        ? location.image.split("$")[0]
                        : "Изображение " + location.adress
                      : "нет изображения"
                  }
                />
                {location.image ? (
                  <div className="m-2 text-center">
                    {location.image?.includes("$") ? location.image.split("$")[0] : "Изображение " + location.adress}
                  </div>
                ) : null}
              </div>
              <main className={location.image ? "w-full lg:w-2/3 flex flex-col lg:ps-3" : "w-full flex flex-col"}>
                {location.dates ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.LOCATION_PAGE.DATES !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.LOCATION_PAGE.DATES}</h3>
                    ) : null}
                    <div className="px-1">{location.dates}</div>
                  </div>
                ) : null}

                {location.info ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.LOCATION_PAGE.INFO !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.LOCATION_PAGE.INFO}</h3>
                    ) : null}
                    <div className="px-1">
                      {location.info.split("\n").map((subStr, i) => (
                        <span key={i}>
                          {subStr}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {location ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.LOCATION_PAGE.ORGANIZATIONS !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.LOCATION_PAGE.ORGANIZATIONS}</h3>
                    ) : null}
                    {getOrganizations().map((org: IPartialOrganization) => (
                      <Link key={org._id} to={"/organizations/" + org._id} className="block underline px-1 w-fit">
                        {org.name}
                      </Link>
                    ))}
                  </div>
                ) : null}

                {location.persons && location.persons.length !== 0 ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.LOCATION_PAGE.PERSONS !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.LOCATION_PAGE.PERSONS}</h3>
                    ) : null}
                    {location.persons.map((person: string) =>
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

                {location.alt_names && location.alt_names.length !== 0 ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.LOCATION_PAGE.ALT_NAMES !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.LOCATION_PAGE.ALT_NAMES}</h3>
                    ) : null}
                    {location.alt_names.map((altName: string) => (
                      <div className="px-1" key={altName}>
                        {altName}
                      </div>
                    ))}
                  </div>
                ) : null}

                {location.links && location.links.length !== 0 ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.LOCATION_PAGE.LINKS !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.LOCATION_PAGE.LINKS}</h3>
                    ) : null}
                    {location.links.map((link: string) =>
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
          </>
        ) : (
          <Loader title={"Загрузка информации об организации..."} />
        )}
      </div>
    </MainLayout>
  );
};

export default LocationPage;
