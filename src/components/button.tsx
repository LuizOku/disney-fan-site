import classNames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  variant: "contained" | "outlined";
}

const Button = ({ variant, ...props }: ButtonProps) => {
  const className = classNames({
    "px-4 py-2 rounded font-bold transition duration-200 text-center": true,
    "bg-primary text-white hover:opacity-70": variant === "contained",
    "border border-primary text-primary bg-white hover:bg-primary hover:text-white":
      variant === "outlined",
  });
  const mergedClassNames = twMerge(className, props.className);

  return (
    <button {...props} className={mergedClassNames}>
      {props.children}
    </button>
  );
};

export default Button;
