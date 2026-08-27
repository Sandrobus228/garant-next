import React from "react";

import styles from "./SocialLinks.module.scss";

import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

interface IProps {
  className?: string;
}

const SocialLinks = ({ className }: IProps) => {
  return (
    <div className={`${styles.socialLinks} ${className}`}>
      <a
        href="https://t.me/garantabh"
        target="_blank"
        rel="nofollow noopener"
      >
        <SvgSelector id={ESvgName.TELEGRAM_ROUNDED} />
      </a>
      <a
        href="https://wa.me/79407411000"
        target="_blank"
        rel="nofollow noopener"
      >
        <SvgSelector id={ESvgName.WHATSAPP_ROUNDED} />
      </a>
      <a href="mailto:info@garant-abh.com" rel="nofollow">
        <SvgSelector id={ESvgName.EMAIL_ROUNDED} />
      </a>
    </div>
  );
};

export default SocialLinks;
