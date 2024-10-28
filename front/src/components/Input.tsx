import IMask from "imask";
import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";

interface InputProps {
  label?: string;
  id: string;
  type?: "number" | "text" | "email" | "password";
  placeholder?: string;
  register?: any;
  name: string;
  errors?: any;
  disabled?: boolean;
  onBlur?: (ev: FocusEvent<HTMLInputElement>) => void;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  mask?: any;
  dynamicMask?: any;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  name,
  errors,
  disabled = false,
  onBlur,
  onChange,
  readonly = false,
  mask,
  dynamicMask = "",
  ...rest
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    if (mask) {
      const inputElement = document.getElementById(id) as HTMLInputElement;
      if (inputElement) {
        const dynamicMaskOptions = [{ mask }, { mask: dynamicMask }];

        let maskConfig;

        if (mask === "money") {
          maskConfig = {
            mask: Number,
            thousandsSeparator: ".",
            padFractionalZeros: true,
            min: 0,
          };
        } else {
          maskConfig = { mask: dynamicMaskOptions };
        }

        const maskInstance = IMask(inputElement, maskConfig);

        return () => {
          maskInstance.destroy();
        };
      }
    }
  }, [id, dynamicMask, mask]);

  return (
    <div className="w-full ">
      {label && (
        <label htmlFor={id} className="text-white text-xs block mb-0.5 ml-3.5">
          {label}
        </label>
      )}
      <div className="relative rounded-xl flex text-white hover:text-primary bg-ghost-selected-fill hover:bg-secondary-hover">
        <input
          type={type === "password" && !hidePassword ? "text" : type}
          readOnly={readonly}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full text-[15px] h-[36px] shadow appearance-none rounded-xl py-2 px-4 leading-4 placeholder-white transition-all bg-transparent border hover:placeholder-primary focus:outline-none focus:border focus:shadow-outline ${
            errors
              ? "border-error"
              : "border-ghost-selected-fill focus:border-primary"
          }`}
          {...register(
            name,
            {
              keepOriginalHandlers: true,
              onChange,
            },
            { ...rest }
          )}
          {...rest}
          onBlur={onBlur}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setHidePassword(!hidePassword)}
            className={`absolute right-4 top-2 ${
              disabled ? "" : "hover:cursor-pointer"
            }`}
          >
            {hidePassword ? (
              <BsEyeSlashFill size={18} />
            ) : (
              <BsEyeFill size={18} />
            )}
          </button>
        )}
      </div>
      {errors && typeof errors != "boolean" && (
        <span className="text-xs text-error ml-3.5">
          {errors.message ? errors.message : errors}
        </span>
      )}
    </div>
  );
};

export default Input;
