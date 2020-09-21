import React from 'react';
import { mount } from "enzyme";
import { Router } from "react-router";
import { createMemoryHistory } from 'history';
import Root from "../../../app/Root";
import AuthValidateEmail from "../AuthValidateEmail";

describe('AuthValidateEmail tests', () => {
  const history = createMemoryHistory();
  history.push('/auth/validate-email/41124?email=test@dataswift.io');

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
        <AuthValidateEmail />
      </Root>
    </Router>
  );

  it('has correct the buttons', () => {
    const recoverBtn = wrapper.find("button.auth-login-btn");

    expect(recoverBtn).toHaveLength(1);
  });

  it('has the correct title ', () => {
    const authTitleText = wrapper.find("h2.auth-login-title");
    expect(authTitleText.text()).toEqual("Create a password");
  });
});
