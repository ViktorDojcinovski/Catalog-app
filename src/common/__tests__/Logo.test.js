import React from 'react';
import { shallow } from 'enzyme';

import { Logo } from '../Logo';

describe('<Logo />', () => {
  let mountedLogo;
  beforeAll(() => {
    mountedLogo = shallow(<Logo />);
  });
  it('renders without crashing', () => {
    shallow(<Logo />);
  });
  it('contains an image', () => {
    const img = mountedLogo.find('img');
    expect(img.length).toBe(1);
  });
});
