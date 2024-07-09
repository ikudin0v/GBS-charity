import React from "react";
import ContextProvider from "./hooks/useContext";
import { Route, Switch, Redirect } from "react-router-dom";
import MapPage from "./layouts/mapPage";
import AboutPage from "./layouts/aboutPage";
import OrganizationsList from "./layouts/organizationsList";
import PersonsList from "./layouts/personsList";
import { ToastContainer } from "react-toastify";
import { CONFIG } from "./config";
import OrganizationPage from "./layouts/organizationPage";
import PersonPage from "./layouts/personPage";
import LocationsList from "./layouts/locationsList";
import LocationPage from "./layouts/locationPage";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Switch>
          <Route path="/map" component={MapPage} />
          <Route
            path="/organizations/:organizationId"
            render={(props) => <OrganizationPage {...props} />}
          />
          <Route path="/organizations" component={OrganizationsList} />
          {CONFIG.SHOW_LOCATIONS ? (
            <Route
              path="/locations/:locationId"
              render={(props) => <LocationPage {...props} />}
            />
          ) : null}
          {CONFIG.SHOW_LOCATIONS ? (
            <Route path="/locations" component={LocationsList} />
          ) : null}
          {CONFIG.SHOW_PERSONS ? (
            <Route
              path="/persons/:personId"
              render={(props) => <PersonPage {...props} />}
            />
          ) : null}
          {CONFIG.SHOW_PERSONS ? (
            <Route path="/persons" component={PersonsList} />
          ) : null}
          <Route path="/about" component={AboutPage} />
          <Redirect from="/" to="/map" />
        </Switch>
      </ContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
