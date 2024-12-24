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
    "rounded-full bg-gray h-10 px-3",
    props.className
  );

  return <input {...props} className={mergedClassNames}></input>;
};

export default Input;
