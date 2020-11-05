import React, { useState } from "react";
import './DropDownMenu.scss';
import Input from "../form/Input";

type Props = {
    placeholder: string;
    value?: string;
    options: Array<string>;
    profileField?: boolean;
    errorMessage?: string;
    onChange: (value: string) => void;
}

const DropDownMenu: React.FC<Props> = (props) => {
  const { options, placeholder, errorMessage, onChange, profileField, value } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const onOptionClicked = (newValue: string) => () => {
    setSelectedOption(newValue);
    setIsOpen(false);
    onChange(newValue);
  };
    
  return (
    <div className={'dropdown-container'}>
      <Input label={placeholder}
        id={'gender'}
        type={'text'}
        value={selectedOption || value}
        onClick={() => setIsOpen(!isOpen)}
        profileField={profileField}
        errorMessage={errorMessage}
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
