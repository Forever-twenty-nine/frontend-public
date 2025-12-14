import React from "react";
import { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import Instagram_button from "@/img/svg/redes-09.svg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const InstagramButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      style={{ borderRadius: "10px" }}
      className="flex h-8 w-8 items-center cursor-pointer justify-center  text-white transition-all duration-200 "
      aria-label="Instagram"
    >
      <Image
        src={Instagram_button}
        alt="Instagram"
        width={20}
        height={20}
        className="h-7 w-7"
      />
    </button>
  );
};

export default InstagramButton;
