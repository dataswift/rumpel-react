import React from 'react';
import App from '../App';
import { shallow } from "enzyme";

// let wrapper: ReactWrapper;
//
// beforeEach(() => {
//   wrapper = mount(<App />)
// });
//
// afterAll(() => {
//   wrapper.unmount();
// });

it('renders without crashing', () => {
  shallow(<App />);
});
