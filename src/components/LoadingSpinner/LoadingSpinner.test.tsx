import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import { Router } from "react-router";
import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import Root from "../../app/Root";

describe('LoadingSpinner tests', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Router history={history}>
      <Root>
        <LoadingSpinner loadingText={'Loading...'} />
      </Root>
    </Router>
  );

  it('has the correct icon and title ', () => {
    const authTitleText = wrapper.find("div.loading-text");
    expect(authTitleText.text()).toEqual("Loading...");
  });
});
