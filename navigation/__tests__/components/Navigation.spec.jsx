import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../../src/components/Navigation';

describe('Navigation should render as expected', () => {
  it('module should render correct JSX', () => {
    const renderedModule = shallow(<Navigation />);
    expect(renderedModule.find('div')).toMatchSnapshot();
  });
});
