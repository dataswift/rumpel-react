import React, { useState, useRef } from "react";
import './ExpansionPanel.scss';
import Chevron from "../Svg/Chevron";
import { FormatMessage } from "../../features/messages/FormatMessage";

type Props = {
    title: string;
    children: React.ReactNode;
}
const ExpansionPanel: React.FC<Props> = props => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef<HTMLObjectElement>(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${ content?.current?.scrollHeight || 0 }px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section">
      <button className={`accordion ${ setActive }`} onClick={toggleAccordion}>
        <span className="accordion__title">
          <FormatMessage id={props.title} />
        </span>
        <Chevron className={`${ setRotate }`} width={10} fill={"#535353"} />
      </button>
      <div
        ref={content}
        style={{ height: `${ setHeight }` }}
        className="accordion__content outer"
      >
        {props.children}
      </div>
    </div>
  );
};

export default ExpansionPanel;
