import React, { useEffect } from "react";
import MainLayout from "./mainLayout";
import ContactsData from "../components/contactsData";
import { CONFIG } from "../config";
import { useData } from "../hooks/useContext";
import { IUseData } from "../interfaces";

const AboutPage = () => {
  const { setPage } = useData() as IUseData;

  useEffect(() => {
    setPage("about");
		document.title = "О проекте"
  }, []);

  return (
    <MainLayout>
      <div className="px-2 lg:px-0 lg:m-auto flex flex-col w-full lg:w-4/5 h-100">
        <h1 className="text-4xl my-3 font-semibold">О ресурсе</h1>
        {CONFIG.ABOUT_PAGE.map((p: string) => (
          <p key={CONFIG.ABOUT_PAGE.indexOf(p)} className="text-lg mt-3">
            {p}
          </p>
        ))}
      </div>
    </MainLayout>
  );
};

export default AboutPage;
