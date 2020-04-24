import React from './node_modules/react';
import { shallow } from './node_modules/enzyme';

import Footer from '../Footer';

describe('Footer', () => {
  let mountedFooter;
  beforeEach(() => {
    mountedFooter = shallow(<Footer />);
  });
  it('renders without crashing', () => {
    shallow(<Footer />);
  });
});
