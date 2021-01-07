import React from 'react';
import { shallow } from 'enzyme';
import { Route } from '@americanexpress/one-app-router';
import childRoutes from '../../src/childRoutes';
import SecurityWebPortal from '../../src/components/SecurityWebPortal';

describe('SecurityWebPortal should render as expected', () => {
  describe('childRoutes', () => {
    it('should return an array of Routes', () => {
      expect(childRoutes()).toEqual(expect.any(Array));
      childRoutes().forEach((route) => expect(route.type).toEqual(Route));
    });
  });
  it('module should render correct JSX', () => {
    const renderedModule = shallow(<SecurityWebPortal />);
    expect(renderedModule.find('div')).toMatchSnapshot();
  });
});
