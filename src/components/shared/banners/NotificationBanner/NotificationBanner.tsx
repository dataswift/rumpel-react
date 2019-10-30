import React, { Component } from "react";
import "./NotificationBanner.scss";

export class NotificationBanner extends Component<INotificationBanner> {
  render() {
    const notification = this.props;

    return (
      <div>
        {notification && (
          <>
            <div
              className={`notification-banner-container notification-banner-container-${notification.type}`}
            >
              {notification.type === "error" && (
                <i className="material-icons notification-banner-container-icon">
                  warning
                </i>
              )}
              {notification.message}
            </div>
          </>
        )}
      </div>
    );
  }
}

interface INotificationBanner {
  type: string;
  message: string;
}
