import React, { useEffect, useState } from "react";
import { PasswordMeter } from "../Svgs/PasswordMeter";
import './PasswordStrengthIndicator.scss';

type Props = {
    strong: boolean;
    passwordMatch?: boolean;
}

export const PasswordStrengthIndicator: React.FC<Props> = ({ strong, passwordMatch }) => {
  const [message, setMessage] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    if (strong) {
      if (typeof passwordMatch === "undefined") {
        setTextColor("#a8c62b");
        setMessage("This password is strong.");
      } else if (passwordMatch) {
        setTextColor("#a8c62b");
        setMessage("Passwords match!");
      } else if (!passwordMatch) {
        setTextColor("#F45F09");
        setMessage( "Passwords do not match.");
      }
    } else {
      setTextColor("#F45F09");
      setMessage("Password must be stronger.*");
    }
  }, [strong, passwordMatch]);

  return (
    <div className={'password-strength'}>
      <PasswordMeter strong={strong}/>
      <div className={'password-strength-message'} style={{ color: textColor }}>{message}</div>
      {!strong &&
        <div className={'password-strength-text'}>
          <span>*</span> Any combination of <a href={'https://docs.dataswift.io'}>three random words</a> is
          one of the strongest passwords you can have.
        </div>
      }
    </div>
  );

};
