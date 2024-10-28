import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "ghost" | "secondary" | "danger" | "confirmed";
  disabled?: boolean;
  type?: "button" | "submit";
  size?: "small" | "medium" | "big";
  icon?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  type = "button",
  disabled = false,
  icon,
  ...rest
}) => {
  const colorSheet = {
    primary: ` ${
      disabled
        ? "bg-primary-disabled text-primary-disabled-text"
        : "bg-primary text-white hover:bg-primary-hover focus:bg-primary-selected"
    }`,
    ghost: `${
      disabled
        ? "bg-secondary-disabled-text border border-primary-disabled text-ghost-disabled-text"
        : "bg-transparent text-white border border-primary hover:bg-ghost-selected-fill focus:bg-ghost-selected-fill focus:border-ghost-selected-stroke"
    }`,
    secondary: `${
      disabled
        ? "bg-secondary-disabled text-white"
        : "bg-secondary text-primary hover:bg-secondary-hover focus:bg-secondary-selected-fill focus:border focus:border-primary focus:text-white"
    }`,
    danger: "bg-error hover:bg-error-hover",
    confirmed: "bg-success hover:bg-success-hover",
  };

  return (
    <button
      type={type}
      className={`${
        variant === "primary"
          ? colorSheet.primary
          : variant === "ghost"
          ? colorSheet.ghost
          : variant === "secondary"
          ? colorSheet.secondary
          : variant === "danger"
          ? colorSheet.danger
          : colorSheet.confirmed
      }  
        ${
          size == "small"
            ? "w-[120px]"
            : size == "medium"
            ? "w-[144px]"
            : size == "big"
            ? "w-[168px]"
            : "w-full"
        }
        h-9 px-3 font-semibold rounded-xl transition-all focus:shadow-outline`}
      disabled={disabled}
      {...rest}
    >
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        {icon}
        {children}
      </div>
    </button>
  );
};

export default Button;
