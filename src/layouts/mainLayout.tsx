import React from "react";
import { useData } from "../hooks/useContext";
import Header from "../components/header/header";
import Footer from "../components/footer";
import { IUseData } from "../interfaces";

interface IMainLayout {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayout) => {
  const { theme } = useData() as IUseData;
  return (
    <div
      className={
        "flex flex-col justify-between min-h-screen m-0 p-0" + theme.primary
      }
    >
      <div className="m-0 p-0">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
