import React, { Component, ReactNode } from "react";
import "./PasswordStrengthMeter.scss";

export class PasswordStrengthMeter extends Component<IPasswordStrengthProps> {
  createPasswordLabel = (result: number) => {
    switch (result) {
      case 0:
        return "Too weak";
      case 1:
        return "Too weak";
      case 2:
        return "So-so";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  getPasswordStrengthProgress = (progress: number) => {
    if (progress <= 1) {
      return 1;
    } else if (progress === 2) {
      return 2;
    } else {
      return 4;
    }
  };

  render(): ReactNode {
    const passwordStrength = this.props.passwordStrength;
    return (
      <div className="password-strength-meter">
        {passwordStrength && (
          <>
            <progress
              className={`password-strength-meter-progress strength-${passwordStrength.strength}`}
              value={this.getPasswordStrengthProgress(
                passwordStrength.strength
              )}
              max="4"
            />
            <br />

            <div
              className={`password-strength-meter-label text-strength-${passwordStrength.strength}`}
            >
              {this.createPasswordLabel(passwordStrength.strength)}
            </div>
          </>
        )}
      </div>
    );
  }
}

interface IPasswordStrengthProps {
  passwordStrength: IPasswordStrength;
}

export interface IPasswordStrength {
  isStrong: boolean;
  guesses: number;
  strength: number;
  suggestions?: string[];
}