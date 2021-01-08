import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { RenderModule, composeModules } from "holocron";
import childRoutes from "../childRoutes";
import reducer from "../duck";

const SHIPS_API = "http://localhost:3002/ship_log";

const SecurityWebPortal = ({ isLoading, isComplete, data, error }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching Ships</p>;
  }

  return (
    <div>
      <h1>Welcome to One App!</h1>
      <RenderModule moduleName="navigation" />
      {!isLoading &&
        isComplete &&
        data &&
        data.map((shipItem, index) => (
          <div key={`ship-${index}`}>
            <p>Name - {shipItem.name}</p>
            <p>Captain - {shipItem.captain}</p>
          </div>
        ))}
    </div>
  );
};

// Read about childRoutes:
// https://github.com/americanexpress/one-app/blob/main/docs/api/modules/Routing.md#childroutes
SecurityWebPortal.childRoutes = childRoutes;

// Read about appConfig:
// https://github.com/americanexpress/one-app/blob/main/docs/api/modules/App-Configuration.md
/* istanbul ignore next */
if (!global.BROWSER) {
  // eslint-disable-next-line global-require
  SecurityWebPortal.appConfig = require("../appConfig").default;
}

export const loadModuleData = async ({ store: { dispatch }, fetchClient }) => {
  await dispatch({ type: "LOADING_API" });
  const response = await fetchClient(SHIPS_API);
  const data = await response.json();
  await dispatch({ type: "LOADED_API", data });

  // Connect child module to root component
  await dispatch(composeModules([{ name: "navigation" }]));
};

SecurityWebPortal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
  data: PropTypes.shape([]).isRequired,
  error: PropTypes.string.isRequired,
};

SecurityWebPortal.holocron = {
  name: "SecurityWebPortal",
  loadModuleData,
  reducer,
};

export const mapStateToProps = (state) => ({
  isComplete: state.getIn(["modules", "security-web-portal", "isComplete"]),
  isLoading: state.getIn(["modules", "security-web-portal", "isLoading"]),
  data: state.getIn(["modules", "security-web-portal", "data"]),
  error: state.getIn(["modules", "security-web-portal", "error"]),
});

export default connect(mapStateToProps)(SecurityWebPortal);
