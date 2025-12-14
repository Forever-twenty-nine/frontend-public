import React from "react";
import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const YouTubeButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      style={{ borderRadius: "10px" }}
      className="flex h-8 w-8 items-center cursor-pointer justify-center text-white transition-all duration-200"
      aria-label="YouTube"
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
        <path style={{ fill: '#fff' }} d="M34.2861312,13.5159096s-3.4430915-.4331422-10.8376307-.4331422c-7.1546258,0-10.7559294.4331422-10.7559294.4331422-1.915385.0007161-3.4677314,1.5536425-3.4677314,3.4690275v13.0124203c-.0007167,1.9158908,1.5518387,3.4696076,3.4677289,3.4703249h.0000012s3.3484215.4305494,10.7559294.4305494c7.4036182,0,10.8376319-.4305494,10.8376319-.4305494,1.9144587.0014322,3.4675941-1.5493807,3.4690288-3.4638369,0-.0021643,0-.0043262-.0000025-.0064905v-13.0150113c0-1.9144587-1.5519729-3.466434-3.4664316-3.4664353-.0008657,0-.001729,0-.0025947.0000012ZM19.6786074,28.6447594v-10.303336l9.2516037,5.1484259-9.2516037,5.1549102Z"/>
      </svg>
    </button>
  );
};

export default YouTubeButton;