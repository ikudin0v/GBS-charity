import React from "react";
import { useData } from "../hooks/useContext";
import { ILocation, IUseData } from "../interfaces";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

interface IOrganizationPageMap {
  locations: any;
}

const OrganizationPageMap = ({ locations }: IOrganizationPageMap) => {
  const { theme } = useData() as IUseData;

  return (
    <div className="w-full overflow-hidden h-[375px] mt-3" tabIndex={-1}>
      <YMaps>
        <Map
          // state={{ center: [59.93, 30.31], zoom: 10 }}
          state={{ center: locations[0].geo.split(", "), zoom: 15 }}
          width={"100%"}
          height={"100%"}
          modules={["geoObject.addon.balloon"]}
          options={{ suppressMapOpenBlock: true }}
        >
          {locations.map((loc: ILocation) => (
            <Placemark
              key={loc._id}
              defaultGeometry={loc.geo.split(", ")}
              options={{
                balloonMaxWidth: 500,
                balloonPanelMaxMapArea: window.screen.width < 768 ? Infinity : 0,
              }}
              properties={{
                balloonContent: [
                  //header
                  "<div class='max-w-[500px]'>",
                  "<div class='text-xl font-semibold mb-3 border-b-2" + theme.redBorder + "'>" + loc.adress + "</div>",
                  //body
                  "<div class=''>",
                  // "<div class='me-3'>",
                  // loc.image ? "<img src='" + loc.image + "'/>" : "",
                  // "</div>",
                  loc.image //image
                    ? "<div class='me-3 mt-2 w-1/2 h-fit float-left' >" +
                      "<img class='w-full' src='" +
                      (loc.image?.includes("$") ? loc.image?.split("$")[1] : loc.image) +
                      "' alt='" +
                      (loc.image?.includes("$") ? loc.image?.split("$")[0] : "Изображение " + loc.adress) +
                      "'/>" +
                      "</div>"
                    : "",
                  "<div class='text-base w-fit'>",
                  loc.info,
                  "</div>",
                  "</div>",
                  "</div>",
                ].join(""),
              }}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default OrganizationPageMap;
