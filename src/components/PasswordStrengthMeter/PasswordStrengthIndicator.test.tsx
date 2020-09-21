import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import { Router } from "react-router";
import React from "react";
import Root from "../../app/Root";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

describe('PasswordStrengthIndicator tests', () => {
  const history = createMemoryHistory();

  it('has the correct message when password is strong and match', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={true} passwordMatch={true} />
        </Root>
      </Router>
    );

    const text = wrapper.find("div.password-strength-message");
    expect(text.text()).toEqual("Passwords match!");
  });

  it('has the correct message when password isn\'t strong but match', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={false} passwordMatch={true} />
        </Root>
      </Router>
    );

    const text = wrapper.find("div.password-strength-message");
    expect(text.text()).toEqual("Password must be stronger.*");
  });

  it('has the correct message when password is strong but don\'t match', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={true} passwordMatch={false} />
        </Root>
      </Router>
    );

    const text = wrapper.find("div.password-strength-message");
    expect(text.text()).toEqual("Passwords do not match.");
  });

  it('has the correct message when password isn\'t strong and don\'t match', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={false} passwordMatch={false} />
        </Root>
      </Router>
    );

    const text = wrapper.find("div.password-strength-message");
    expect(text.text()).toEqual("Password must be stronger.*");
  });

  it('has the correct message suggestion when password isn\'t strong', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={false} passwordMatch={false} />
        </Root>
      </Router>
    );

    const text = wrapper.find("div.password-strength-text");
    expect(text.text())
      .toEqual("* Any combination of three random words is one of the strongest passwords you can have.");
  });

  it('doesn\'t have a message suggestion when password is strong', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthIndicator strong={true} passwordMatch={false} />
        </Root>
      </Router>
    );

    const text = wrapper.find("div.password-strength-text");
    expect(text.length).toEqual(0);
  });
});
