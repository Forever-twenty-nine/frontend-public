import React from "react";
import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const FacebookButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      style={{ borderRadius: "10px" }}
      className="flex h-8 w-8 items-center cursor-pointer justify-center text-white transition-all duration-200"
    >
      <svg
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 46.9799995 46.980999"
        width="20"
        height="20"
        className="h-7 w-7"
      >
        <path style={{ fill: '#427fbe' }} d="M38.5919991,46.980999H8.3889999c-4.6329999,0-8.3889999-3.7560005-8.3889999-8.3889999V8.3889999C0,3.756,3.756,0,8.3889999,0h30.2029991c4.6329994,0,8.3889999,3.756,8.3889999,8.3889999v30.2029991c-.0009995,4.6329994-3.7560005,8.3889999-8.3889999,8.3889999Z"/>
        <path style={{ fill: '#fff' }} d="M31.6397293,8.4292527l-4.5282357-.0054791c-4.3912663,0-7.2279201,2.909248-7.2279201,7.416939v3.4174073h-4.5433033v6.1842067h4.5433033l-.0054784,13.1148988h6.3567898l.0054784-13.1149014h5.2130869l-.0041095-6.1828365h-5.2089775v-2.8996607c0-1.3943565.3300972-2.0997537,2.1449539-2.0997537l3.2407148-.0013703.0136973-5.8294534v.0000033Z"/>
      </svg>
    </button>
  );
};

export default FacebookButton;