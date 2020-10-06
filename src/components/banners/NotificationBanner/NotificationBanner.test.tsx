import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import { Router } from "react-router";
import Root from "../../../app/Root";
import React from "react";
import { NotificationBanner } from "./NotificationBanner";

describe('NotificationBanner tests', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <Router history={history}>
      <Root>
        <NotificationBanner type={'error'} display={true}>An error message</NotificationBanner>
      </Root>
    </Router>
  );

  it('has the correct icon and title ', () => {
    const authTitleText = wrapper.find("div.notification-banner-container");
    expect(authTitleText.text()).toEqual("warningAn error message");
  });
});
