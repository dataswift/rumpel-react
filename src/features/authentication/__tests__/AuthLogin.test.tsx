import React from 'react';
import { mount } from "enzyme";
import AuthLogin from "../AuthLogin";
import { Router } from "react-router";
import { createMemoryHistory } from 'history';
import Root from "../../../app/Root";

describe('AuthLogin tests with default settings', () => {
  const history = createMemoryHistory();
  const query = {
    repeat: false,
    email: null,
  };
  const state = { from: '/auth/oauth', query: query };
  history.push('/auth/login', state);
  const wrapper = mount(
    <Router history={history}>
      <Root>
        <AuthLogin />
      </Root>
    </Router>
  );

  it('has correct the buttons', () => {
    const signupButton = wrapper.find("button.auth-login-btn-signup");
    const login = wrapper.find("button.auth-login-btn");

    expect(signupButton).toHaveLength(1);
    expect(login).toHaveLength(1);
  });

  it('has correct the Links', () => {
    const linkButton = wrapper.find("Link");

    expect(linkButton).toHaveLength(1);
  });

  it('has correct the correct text for having an account ', () => {
    const authAccountText = wrapper.find("h2.auth-login-email-title");
    expect(authAccountText.text()).toEqual("");
  });

  it('has correct the correct title ', () => {
    const authTitleText = wrapper.find("h2.auth-login-title");
    expect(authTitleText.text()).toEqual("Enter your password");
  });

  it('has correct the correct text for having an account ', () => {
    const authAccountText = wrapper.find("p.auth-login-have-an-account");
    expect(authAccountText.text()).toEqual("Don't have an account?");
  });
});

describe('AuthLogin tests for repeated signup', () => {
  const history = createMemoryHistory();
  const query = {
    repeat: true,
    email: 'test@dataswift.io',
  };
  const state = { from: '/auth/oauth', query: query };
  history.push('/auth/login', state);
  const wrapper = mount(
    <Router history={history}>
      <Root>
        <AuthLogin />
      </Root>
    </Router>
  );

  it('has correct number of buttons', () => {
    const signupButton = wrapper.find("button.auth-login-btn-signup");
    const login = wrapper.find("button.auth-login-btn");

    expect(signupButton).toHaveLength(1);
    expect(login).toHaveLength(1);
  });

  it('has correct the correct text for having an account ', () => {
    const authAccountText = wrapper.find("h2.auth-login-email-title");
    expect(authAccountText.text()).toEqual("test@dataswift.io");
  });

  it('has correct number of Links', () => {
    const linkButton = wrapper.find("Link");

    expect(linkButton).toHaveLength(1);
  });

  it('has correct the correct title ', () => {
    const authTitleText = wrapper.find("h2.auth-login-title");
    expect(authTitleText.text()).toEqual("It looks like you already have an account.");
  });

  it('has correct the correct text for having an account ', () => {
    const authAccountText = wrapper.find("p.auth-login-have-an-account");
    expect(authAccountText.text()).toEqual("Want to create a new account?");
  });
});
