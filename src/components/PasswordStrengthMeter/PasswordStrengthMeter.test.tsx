import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import { Router } from "react-router";
import React from "react";
import Root from "../../app/Root";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

describe('PasswordStrengthMeter', () => {
  const history = createMemoryHistory();

  it('has the correct message when score is 0', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 0 }} />
        </Root>
      </Router>
    );

    const progress = wrapper.find("progress.password-strength-meter-progress");
    const text = wrapper.find("div.password-strength-meter-label");

    expect(progress.props().value).toEqual(1);
    expect(text.text()).toEqual("Too weak");
  });

  it('has the correct message when score is 1', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 1 }} />
        </Root>
      </Router>
    );

    const progress = wrapper.find("progress.password-strength-meter-progress");
    const text = wrapper.find("div.password-strength-meter-label");

    expect(progress.props().value).toEqual(1);
    expect(text.text()).toEqual("Too weak");
  });

  it('has the correct message when score is 2', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 2 }} />
        </Root>
      </Router>
    );

    const progress = wrapper.find("progress.password-strength-meter-progress");
    const text = wrapper.find("div.password-strength-meter-label");

    expect(progress.props().value).toEqual(2);
    expect(text.text()).toEqual("So-so");
  });

  it('has the correct message when score is 3', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 3 }} />
        </Root>
      </Router>
    );

    const progress = wrapper.find("progress.password-strength-meter-progress");
    const text = wrapper.find("div.password-strength-meter-label");

    expect(progress.contains("4")).toEqual(false);
    expect(text.text()).toEqual("Strong");
  });

  it('has the correct message when score is 4', () => {
    const wrapper = mount(
      <Router history={history}>
        <Root>
          <PasswordStrengthMeter passwordStrength={{ score: 4 }} />
        </Root>
      </Router>
    );

    const progress = wrapper.find("progress.password-strength-meter-progress");
    const text = wrapper.find("div.password-strength-meter-label");

    expect(progress.props().value).toEqual(4);
    expect(text.text()).toEqual("Very Strong");
  });
});
