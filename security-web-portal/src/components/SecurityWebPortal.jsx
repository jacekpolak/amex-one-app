import React from 'react';
import { RenderModule, composeModules } from 'holocron';
import { useFetchye } from 'fetchye';
import childRoutes from '../childRoutes';

const SHIPS_API = 'http://localhost:3002/ship_log';

const SecurityWebPortal = () => {
  const { isLoading, data, error } = useFetchye(SHIPS_API);
  const ships = data && data.body;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching Ships</p>;
  }

  return (
    <div>
      <h1>Welcome to One App!</h1>
      {ships &&
        ships.map((shipItem, index) => (
          <div key={`ship-${index}`}>
            <p>Name - {shipItem.name}</p>
            <p>Captain - {shipItem.captain}</p>
          </div>
        ))}
      <RenderModule moduleName="navigation" />
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
  SecurityWebPortal.appConfig = require('../appConfig').default;
}

export const loadModuleData = async ({ store: { dispatch }, fetchClient }) => {
  // Using dispatch (Redux) for getting data
  // Currently this is 2nd call to API besides Fetchye
  await dispatch({ type: 'LOADING_API' });
  const response = await fetchClient(SHIPS_API);
  const data = await response.json();
  await dispatch({ type: 'LOADED_API', data });

  // Connect child module to root component
  await dispatch(composeModules([{ name: 'navigation' }]));
};

SecurityWebPortal.holocron = {
  name: 'SecurityWebPortal',
  loadModuleData,
};

export default SecurityWebPortal;
