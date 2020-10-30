import React, { useState } from "react";
import './DropDownMenu.scss';
import Input from "../form/Input";

type Props = {
    placeholder: string;
    value?: string;
    options: Array<string>;
    profileField?: boolean;
}

const DropDownMenu: React.FC<Props> = ({ options, placeholder, profileField, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };
    
  return (
    <div className={'dropdown-container'}>
      <Input label={placeholder}
        id={'gender'}
        type={'text'}
        value={value || selectedOption || ''}
        onClick={() => setIsOpen(!isOpen)}
        profileField={profileField}
        onChange={() => {}}
      />

      {isOpen && (
        <div className={'dropdown-list-container'}>
          <ul className={'dropdown-list'}>
            {options.map(option => {
              return (
                <li onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )
      }
    </div>
  );
};

export default DropDownMenu;
