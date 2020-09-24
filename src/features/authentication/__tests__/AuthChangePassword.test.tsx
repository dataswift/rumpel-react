import React from 'react';
import { mount } from "enzyme";
import { Router } from "react-router";
import { createMemoryHistory } from 'history';
import Root from "../../../app/Root";
import AuthChangePassword from "../AuthChangePassword";

fdescribe('AuthChangePassword tests', () => {
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

  it('has correct the buttons', () => {
    const nextBtn = wrapper.find("button.auth-login-btn");

    expect(nextBtn).toHaveLength(1);
  });

  it('has correct the correct text for having an account ', () => {
    const authAccountText = wrapper.find("h2.auth-login-email-title");
    expect(authAccountText.text()).toEqual("test@dataswift.io");
  });

  it('has the correct title ', () => {
    const authTitleText = wrapper.find("h2.auth-login-title");
    expect(authTitleText.text()).toEqual("Reset password");
  });
});
