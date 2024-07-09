import React from "react";
import { YMaps, Map, Placemark, Clusterer, GeoObject } from "@pbe/react-yandex-maps";
import { useData } from "../hooks/useContext";
import { ICategory, ILocation, IPartialOrganization, IPerson } from "../interfaces";
import { CONFIG } from "../config";

class YandexMap extends React.Component<any> {
  state = { balloonContentTemplate: null };

  createTemplateLayoutFactory = (ymaps: any) => {
    const { balloonContentTemplate } = this.state;

    if (ymaps && !balloonContentTemplate) {
      this.setState({
        balloonContentTemplate: ymaps.templateLayoutFactory.createClass(
          [
            //header
            "<div class='max-w-[500px] w-fit'>",
            CONFIG.SHOW_LOCATIONS
              ? "<a class='text-xl font-semibold border-b-2 {{properties.geoObjects[0].properties.theme.redBorder|raw}}' href='/locations/{{properties.geoObjects[0].properties.location._id|raw}}'>{{properties.geoObjects[0].properties.location.adress|raw}}</a>"
              : "<div class='text-xl font-semibold border-b-2 {{properties.geoObjects[0].properties.theme.redBorder|raw}}'>{{properties.geoObjects[0].properties.location.adress|raw}}</div>",
            //header
            //body
            "<div>",
            // "<div class='me-3 mt-2'>",
            "{{properties.geoObjects[0].properties.image|raw}}",
            // "</div>",
            "<div class='text-base'>",
            "{{properties.geoObjects[0].properties.locationDates|raw}}",
            "{{properties.geoObjects[0].properties.locationPersons|raw}}",
            "<div class='mt-2'>{{properties.geoObjects[0].properties.locationInfo|raw}}</div>",
            "</div>",
            "</div>",
            //body
            //footer
            "<div class='flex w-full text-black text-xl font-semibold mt-3 border-b-2 {{properties.geoObjects[0].properties.theme.redBorder|raw}}'>Организации:</div>",
            "<div class='max-h-32 overflow-auto'>", // list
            "{% for geoObject in properties.geoObjects %}",
            "{% if (properties.geoObjects[0]===geoObject) %}",
            "<div class='flex flex-row justify-between'>",
            "{% else %}",
            "<div class='flex flex-row justify-between border-t-2 {{geoObject.properties.theme.pointerItem|raw}}'>",
            "{% endif %}",
            "<div class='flex flex-col px-2 text-black text-base justify-center'>{{ geoObject.properties.orgName|raw }}</div>",
            "<a class='m-1 py-1 px-2 border border-black font-semibold flex justify-center items-center text-center {{geoObject.properties.theme.active|raw}}' href={{geoObject.properties.link|raw}}>Подробнее</a>",
            "</div>",
            "</div>",
            "{% endfor %}",
            "</div>", //list
            "</div>",
          ].join("")
        ),
      });
    }
  };

  render() {
    const { balloonContentTemplate } = this.state;
    const { locs, cats, orgs, pers, theme } = this.props;

    function getColor(categories: { [key: string]: string[] }): string | undefined {
      let color = "#FD00FE";
      Object.keys(categories).forEach((group: string) => {
        categories[group].forEach((category: string) => {
          for (let group in cats) {
            for (let cat in cats[group]) {
              if (cats[group][cat]._id === category && cats[group][cat].color) {
                color = cats[group][cat].color;
              }
            }
          }
        });
      });

      return color;
    }

    function getLocation(location: string): ILocation | undefined {
      for (let i in locs) {
        if (locs[i]._id === location) {
          return locs[i];
        }
      }
    }

    function getPerson(person: string): IPerson | undefined {
      for (let i in pers) {
        if (pers[i]._id === person) {
          return pers[i];
        }
      }
    }

    return (
      <div className={"mb-2 w-full overflow-hidden min-h-[58vh]" + theme.primary} tabIndex={-1}>
        <YMaps>
          <Map
            onLoad={this.createTemplateLayoutFactory}
            state={{ center: [59.93, 30.31], zoom: 5 }}
            width={"100%"}
            height={"100%"}
            modules={["layout.PieChart", "geoObject.addon.balloon", "geoObject.addon.hint", "clusterer.addon.balloon", "templateLayoutFactory"]}
            options={{
              minZoom: 5,
              maxZoom: 17,
              restrictMapArea: [
                [59.4, 29.6],
                [60.5, 30.9],
              ],
              suppressMapOpenBlock: true,
            }}
          >
            <Clusterer
              options={{
                preset: "islands#geolocationIcon",
                clusterIconLayout: "default#pieChart",
                groupByCoordinates: CONFIG.MAP_INDIVIDUAL_PLACEMARKS,
                clusterBalloonContentLayout: balloonContentTemplate,
                gridSize: 128,
                balloonPanelMaxMapArea: window.screen.width < 768 ? Infinity : 0,
              }}
            >
              {orgs.length > 0 && locs.length > 0
                ? orgs.map((organization: IPartialOrganization) =>
                    organization.locations.map((orgLocation: string) => (
                      <Placemark
                        key={organization._id + orgLocation}
                        geometry={getLocation(orgLocation)?.geo.split(", ")}
                        options={{
                          preset: "islands#dotIcon",
                          iconColor: getColor(organization.categories),
                          balloonMaxWidth: 500,
                          balloonPanelMaxMapArea: window.screen.width < 768 ? Infinity : 0,
                        }}
                        properties={{
                          balloonContent: [
                            //header
                            "<div class='max-w-[500px] w-fit'>",
                            CONFIG.SHOW_LOCATIONS
                              ? "<a class='text-xl font-semibold border-b-2" +
                                theme.redBorder +
                                "' href='/locations/" +
                                getLocation(orgLocation)?._id +
                                "'>" +
                                getLocation(orgLocation)?.adress +
                                "</a>"
                              : "<div class='text-xl font-semibold border-b-2" + theme.redBorder + "'>" + getLocation(orgLocation)?.adress + "</div>",
                            //body
                            "<div>",
                            // "<div class='me-3 mt-2 w-1/2'>", //image
                            getLocation(orgLocation)?.image //image
                              ? "<div class='me-3 mt-2 w-1/2 h-fit float-left' >" +
                                "<img class='w-full' src='" +
                                (getLocation(orgLocation)?.image?.includes("$")
                                  ? getLocation(orgLocation)?.image?.split("$")[1]
                                  : getLocation(orgLocation)?.image) +
                                "' alt='" +
                                (getLocation(orgLocation)?.image?.includes("$")
                                  ? getLocation(orgLocation)?.image?.split("$")[0]
                                  : "Изображение " + getLocation(orgLocation)?.adress) +
                                "'>" +
                                "</div>"
                              : "",

                            // "</div>",
                            "<div class='text-base'>", //info
                            getLocation(orgLocation)?.dates
                              ? "<div class='mt-2'><span class='font-semibold'>" +
                                CONFIG.LOCATION_PAGE.DATES +
                                ": </span><span>" +
                                getLocation(orgLocation)?.dates +
                                "</span></div>"
                              : "",
                            getLocation(orgLocation)?.persons && getLocation(orgLocation)?.persons?.length !== 0
                              ? "<div class='mt-2'><span class='font-semibold'>" +
                                CONFIG.LOCATION_PAGE.PERSONS +
                                ": </span><span>" +
                                getLocation(orgLocation)
                                  ?.persons?.map((person) => "<span>" + getPerson(person)?.name + "</span>")
                                  .join(", ") +
                                "</span></div>"
                              : "",
                            "<div class='mt-2'>",
                            getLocation(orgLocation)?.info?.replaceAll("\n", "<br>"),
                            "</div>",

                            "</div>",
                            "</div>",
                            //footer
                            "<div class='flex w-full text-black text-xl font-semibold mt-3 border-b-2" + theme.redBorder + "'>Организации:</div>",
                            "<div class='flex flex-row justify-between'>",
                            "<div class='flex flex-col px-2 text-black text-base justify-center'>" + organization.name + "</div>",
                            "<a class='m-1 py-1 px-2 border border-black font-semibold flex justify-center items-center text-center" +
                              theme.active +
                              "' href='./organizations/" +
                              organization._id +
                              "'>Подробнее</a>",
                            "</div>",
                          ].join(""),

                          location: getLocation(orgLocation),
                          locationInfo: getLocation(orgLocation)?.info?.replaceAll("\n", "<br>"),
                          locationDates: getLocation(orgLocation)?.dates
                            ? "<div class='mt-2'><span class='font-semibold'>Даты постройки: </span><span>" +
                              getLocation(orgLocation)?.dates +
                              "</span></div>"
                            : "",
                          locationPersons:
                            getLocation(orgLocation)?.persons && getLocation(orgLocation)?.persons?.length !== 0
                              ? "<div class='mt-2'><span class='font-semibold'>Архитекторы: </span><span>" +
                                getLocation(orgLocation)
                                  ?.persons?.map((person) => "<span>" + getPerson(person)?.name + "</span>")
                                  .join(", ") +
                                "</span></div>"
                              : "",
                          // adress: getLocation(orgLocation)?.adress,
                          orgName: organization.name,
                          image: getLocation(orgLocation)?.image //image
                            ? "<div class='me-3 mt-2 w-1/2 h-fit float-left'>" +
                              "<img src='" +
                              (getLocation(orgLocation)?.image?.includes("$")
                                ? getLocation(orgLocation)?.image?.split("$")[1]
                                : getLocation(orgLocation)?.image) +
                              "' alt='" +
                              (getLocation(orgLocation)?.image?.includes("$")
                                ? getLocation(orgLocation)?.image?.split("$")[0]
                                : "Изображение " + getLocation(orgLocation)?.adress) +
                              "'/>" +
                              "</div>"
                            : "",
                          // geoId: getLocation(orgLocation)?._id,
                          // info: getLocation(orgLocation)?.info,
                          link: "/organizations/" + organization._id,
                          theme: theme,
                          hintContent: organization.name,
                        }}
                      />
                    ))
                  )
                : null}
            </Clusterer>
          </Map>
        </YMaps>
      </div>
    );
  }
}

export default YandexMap;
