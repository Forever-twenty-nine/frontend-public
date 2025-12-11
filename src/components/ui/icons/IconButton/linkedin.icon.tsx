import React from "react";
import { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import Linkedin_button from "@/img/svg/redes-10.svg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const LinkedInButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      style={{ borderRadius: "5px" }}
      className="flex h-8 w-8 items-center cursor-pointer justify-center text-white transition-all duration-200"
    >
      <Image
        src={Linkedin_button}
        alt="LinkedIn"
        width={20}
        height={20}
        className="h-7 w-7"
      />
    </button>
  );
};

export default LinkedInButton;
