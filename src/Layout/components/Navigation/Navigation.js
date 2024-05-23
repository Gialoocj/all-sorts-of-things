import React, { useEffect, useState } from "react";
import styles from "./Navigation.module.scss";
import classNames from "classnames/bind";
import {
  TranslateIcon,
  SettingIcon,
  FilmIcon,
  ConvertIcon,
  RobotIcon,
  ImageIcon,
  MenuIcon,
} from "../../../components/icons/icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Navigation = ({ handleOpenNav, isMobile, isOpenNav }) => {
  const [navigation, setNavigation] = useState([
    {
      path: "/watch",
      icon: <FilmIcon className={cx("icon")} />,
      name: "Watch",
      slug: "watch",
    },
    {
      path: "/translate",
      icon: <TranslateIcon className={cx("icon")} />,
      name: "Translate",
      slug: "translate",
    },

    {
      path: "/convert",
      icon: <ConvertIcon className={cx("icon")} />,
      name: "Convert to words",
      slug: "convert",
    },

    {
      path: "/chat-bot",
      icon: <RobotIcon className={cx("icon")} />,
      name: "Chat bot",
      slug: "chat-bot",
    },

    {
      path: "/text",
      icon: <ImageIcon className={cx("icon")} />,
      name: "Image to text",
      slug: "text",
    },

    {
      path: "#",
      icon: <SettingIcon className={cx("icon")} />,
      name: "Setting",
    },
  ]);

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const url = window.location.href;

    setCurrentUrl(url);
  }, [window.location.href]);

  return (
    <>
      <div
        className={cx("wrapper", { "wrapper-active": isOpenNav && isMobile })}
      >
        <h1>All sorts of things</h1>
        <div className={cx("navigation")}>
          {navigation.map((nav, index) => (
            <Link
              key={index}
              className={cx("nav-item", {
                active: currentUrl.includes(`${nav.slug}`),
              })}
            >
              {nav.icon}
              <span>{nav.name}</span>
            </Link>
          ))}
          <div className={cx("profile")}>
            <div className={cx("profile-image")}></div>
            <span className={cx("profile-name")}>Profile</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
