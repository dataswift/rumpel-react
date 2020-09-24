import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import { Router } from "react-router";
import Root from "../../../app/Root";
import React from "react";
import { InfoHeader } from "./InfoHeader";

describe('InfoHeader tests', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Router history={history}>
      <Root>
        <InfoHeader />
      </Root>
    </Router>
  );

  it('has the correct icon and title ', () => {
    const authTitleText = wrapper.find("div.text-medium");
    expect(authTitleText.text()).toEqual("What can I do with my HAT?");
  });

  it('has the correct icon and title ', () => {
    const authTitleText = wrapper.find("a.app-header-learn-more");
    expect(authTitleText.text()).toEqual("Learn More");
  });
});
