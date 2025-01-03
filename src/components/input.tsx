import React from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {}

const Input = (props: InputProps) => {
  const mergedClassNames = twMerge(
    "rounded bg-white h-8 px-3 border",
    props.className
  );

  return <input {...props} className={mergedClassNames}></input>;
};

export default Input;
