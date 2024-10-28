import React, { useState, useEffect } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

interface Option {
  name: string;
  value: string | number;
}

interface DropdownProps {
  name: string;
  options: Option[];
  placeholder: string;
  errors?: any;
  onSelect: (value: string | number) => void; // Tornada obrigatória
  value?: string | number | boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder,
  errors,
  value,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    options.find((option) => option.value === value)
  );

  useEffect(() => {
    const initialOption = options.find((option) => option.value === value);
    if (initialOption) {
      setSelectedOption(initialOption);
    } else {
      setSelectedOption(undefined);
    }
  }, [value, options]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value); // Chama onSelect com o valor selecionado
  };
  return (
    <>
      <div className="w-64 text-field-text bg-field-filling rounded-lg cursor-pointer">
        {/* Campo de Seleção */}
        <div
          className={`flex items-center justify-between px-4 py-2  ${
            errors ? "border-red-500" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption ? selectedOption.name : placeholder}</span>
          {isOpen ? (
            <BsCaretUpFill className="text-primary-button" size={20} />
          ) : (
            <BsCaretDownFill className="text-primary-button" size={20} />
          )}
        </div>

        {/* Lista de Opções */}
        {isOpen && (
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 hover:bg-secondary-hover cursor-pointer ${
                  selectedOption?.value === option.value ? "bg-blue-200" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {errors && !isOpen && (
        <span className="text-error-600 ml-2">
          {errors.message && errors.message}
        </span>
      )}
    </>
  );
};

export default Dropdown;
