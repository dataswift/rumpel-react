import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import { Router } from "react-router";
import React from "react";
import Root from "../../app/Root";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

/*
 In PasswordStrengthIndicator's test I created multiple suites as the component couldn't get
 the messages if the component was mounted in every different test.
 */

describe('PasswordStrengthIndicator tests', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Router history={history}>
      <Root>
        <PasswordStrengthIndicator strong={true} passwordMatch={true} />
      </Root>
    </Router>
  );

  it('has the correct message when password is strong and match',  () => {
    const text = wrapper.find("div.password-strength-message");
    expect(text.text()).toEqual("Passwords match!");
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

describe('PasswordStrengthIndicator tests 2', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Router history={history}>
      <Root>
        <PasswordStrengthIndicator strong={false} passwordMatch={true} />
      </Root>
    </Router>
  );

  it('has the correct message when password isn\'t strong but match', () => {
    const text = wrapper.find("div.password-strength-message");
    expect(text.text()).toEqual("Password must be stronger.*");
  });
});

describe('PasswordStrengthIndicator tests 3', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Router history={history}>
      <Root>
        <PasswordStrengthIndicator strong={true} passwordMatch={false} />
      </Root>
    </Router>
  );

  it('has the correct message when password is strong but don\'t match', () => {
    const text = wrapper.find("div.password-strength-message");
    expect(text.text()).toEqual("Passwords do not match.");
  });
});


describe('PasswordStrengthIndicator tests 4', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Router history={history}>
      <Root>
        <PasswordStrengthIndicator strong={false} passwordMatch={false} />
      </Root>
    </Router>
  );


  it('has the correct message when password isn\'t strong and don\'t match', () => {;
    const text = wrapper.find("div.password-strength-message");
    expect(text.text()).toEqual("Password must be stronger.*");
  });
});
