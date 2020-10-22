import React from 'react';
import { mount } from "enzyme";
import { Router } from "react-router";
import { createMemoryHistory } from 'history';
import Root from "../../../app/Root";
import AuthChangePassword from "../AuthChangePassword";

describe('AuthChangePassword tests', () => {
  const history = createMemoryHistory();
  history.push('/auth/change-password/21');

  // Mock location's search value to pass query parameters.
  // @ts-ignore
  global.window = Object.create(window);
  const search = "?email=test@dataswift.io";
  Object.defineProperty(window, "location", {
    value: {
      search: search
    },
    writable: true
  });

  const wrapper = mount(
    <Router history={history}>
      <Root>
        <AuthChangePassword />
      </Root>
    </Router>
  );

  it('is truthy', () => {
    expect(wrapper).toBeTruthy();
  });
});
