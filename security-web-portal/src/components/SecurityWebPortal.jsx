import React from 'react';
import { RenderModule, composeModules } from 'holocron';
import childRoutes from '../childRoutes';

const SecurityWebPortal = () => (
  <div>
    <h1>Welcome to One App!</h1>
    <RenderModule moduleName="navigation" />
  </div>
);

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

export const loadModuleData = async ({ store: { dispatch } }) => {
  await dispatch(composeModules([{ name: 'navigation' }]));
};

SecurityWebPortal.holocron = {
  name: 'SecurityWebPortal',
  loadModuleData,
};

export default SecurityWebPortal;
