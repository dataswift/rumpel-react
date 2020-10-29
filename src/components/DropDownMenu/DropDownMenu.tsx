import React, { useState } from "react";
import './DropDownMenu.scss';

type Props = {
    placeholder: string;
    value?: string;
    options: Array<string>;
}

const DropDownMenu: React.FC<Props> = ({ options, placeholder, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggling = () => setIsOpen(!isOpen);
  const isValueOrPlaceholder = () => !(value || selectedOption) ? 'dropdown-value' : 'dropdown-placeholder';

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };
    
  return (
    <div className={'dropdown-container'}>
      <div className={`dropdown-header ${isValueOrPlaceholder()}`} onClick={toggling}>
        {value || selectedOption || placeholder}
      </div>
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
