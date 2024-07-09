import React, { useEffect, useState } from "react";
import MainLayout from "./mainLayout";
import API from "../api";
import Loader from "../components/loader";
import { useData } from "../hooks/useContext";
import { RouteComponentProps, Link } from "react-router-dom";
import { IPerson, IUseData } from "../interfaces";
import { CONFIG } from "../config";
import personsService from "../services/persons.service";

const PersonPage = ({ match }: RouteComponentProps<{ personId: string }>) => {
  const [person, setPerson] = useState<IPerson>();
  const [activeImg, setActiveImg] = useState<string>();
  const { setPage, persons, theme } = useData() as IUseData;

  async function getOrg(id: string) {
    const persData = await personsService.getById(id);
    setPerson(persData);
    if (persData?.gallery && persData?.gallery.length !== 0) {
      setActiveImg(persData.gallery[0]);
    } else {
      setActiveImg("нет изображения$/IMG/no_img.jpg");
    }
    document.title = persData.name;
  }

  function getPerson(person: string): IPerson | undefined {
    for (let i in persons) {
      if (persons[i]._id === person) {
        return persons[i];
      }
    }
  }

  useEffect(() => {
    setPerson(undefined);
    getOrg(match.params.personId);
  }, [match.params.personId]);

  useEffect(() => {
    setPage("persons");
  }, []);

  return (
    <MainLayout>
      <div className="px-2 lg:px-0 lg:m-auto flex flex-col w-full lg:w-4/5 h-100">
        {person ? (
          <>
            <h2 className={"w-fit text-center text-3xl pb-1 px-2 font-semibold border-b-2 self-center" + theme.redBorder}>{person.name}</h2>

            <div className="flex flex-col lg:flex-row mt-3">
              {person.gallery ? (
                <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/3 flex flex-col h-fit self-center lg:self-start">
                  <img
                    src={activeImg?.includes("$") ? activeImg.split("$")[1] : activeImg}
                    className=" w-full top-0 bottom-0 m-auto"
                    alt={activeImg?.includes("$") ? activeImg.split("$")[0] : "Изображение " + person.name}
                  />
                  {person.gallery.length !== 0 ? (
                    <div className="m-2 text-center">{activeImg?.includes("$") ? activeImg.split("$")[0] : "Изображение " + person.name}</div>
                  ) : null}
                  <div className="flex flex-row overflow-auto lg:justify-between h-fit self-center">
                    {person.gallery.length > 1
                      ? person.gallery.map((img: string) => (
                          <img
                            key={img}
                            src={img?.includes("$") ? img.split("$")[1] : img}
                            className={activeImg === img ? "h-28 w-36 mx-1 my-2 border-2 p-1 border-black" : "h-28 w-36 mx-1 my-2"}
                            onClick={() => setActiveImg(img)}
                            alt={img?.includes("$") ? img.split("$")[0] : "Изображение " + person.gallery?.indexOf(img) + " " + person.name}
                          />
                        ))
                      : null}
                  </div>
                </div>
              ) : null}

              <main className={person.gallery ? "w-full lg:w-2/3 flex flex-col lg:ps-3" : "w-full flex flex-col"}>
                {person.info ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.PERSON_PAGE.INFO !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.PERSON_PAGE.INFO}</h3>
                    ) : null}
                    <div className="px-1">
                      {person.info.split("\n").map((subStr, i) => (
                        <span key={i}>
                          {subStr}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {person.persons && person.persons.length !== 0 ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.PERSON_PAGE.PERSONS !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.PERSON_PAGE.PERSONS}</h3>
                    ) : null}
                    {person.persons.map((person: string) =>
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

                {/* {person.organizations && CONFIG.PERSON_PAGE.ORGANIZATIONS !== "" ? (
                  <div className="lg:px-3 pb-3">
                    <h3
                      className={
                        "w-fit font-semibold border-b-2 px-1" + theme.redBorder
                      }
                    >
                      {CONFIG.PERSON_PAGE.ORGANIZATIONS}
                    </h3>
                    {person.organizations.map((org: string) => (
                      <Link
                        key={org}
                        to={"/organizations/" + getOrganization(org)?._id}
                        className="block underline px-1"
                      >
                        {getOrganization(org)?.name}
                      </Link>
                    ))}
                  </div>
                ) : null} */}

                {person.links && person.links.length !== 0 ? (
                  <div className="lg:px-3 pb-3">
                    {CONFIG.PERSON_PAGE.LINKS !== "" ? (
                      <h3 className={"w-fit font-semibold border-b-2 px-1" + theme.redBorder}>{CONFIG.PERSON_PAGE.LINKS}</h3>
                    ) : null}
                    {person.links.map((link: string) =>
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
          <Loader title={"Загрузка информации о человеке..."} />
        )}
      </div>
    </MainLayout>
  );
};

export default PersonPage;
