import React from 'react';
import { mount } from "enzyme";
import { Router } from "react-router";
import { createMemoryHistory } from 'history';
import Root from "../../../app/Root";
import AuthVerifyEmail from "../AuthVerifyEmail";

describe('AuthValidateEmail tests', () => {
  const history = createMemoryHistory();
  history.push('/auth/verify-email/41124?email=test@dataswift.io');

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
        <AuthVerifyEmail />
      </Root>
    </Router>
  );

  it('is truthy', () => {
    expect(wrapper).toBeTruthy();
  });
});
