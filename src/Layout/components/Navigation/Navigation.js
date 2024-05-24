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
  LogoutIcon,
} from "../../../components/icons/icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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

  const handleLogout = () => {
    Cookies.remove("accessToken");
    // localStorage.removeItem("user");
    Cookies.remove("refreshToken");
    localStorage.setItem("check", "true");
    window.location.href = "/";
    console.log("clicked");
  };

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
              onClick={handleOpenNav}
              to={nav.path}
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

        <button
          className={cx("logout")}
          onClick={() => {
            handleLogout();
          }}
        >
          <LogoutIcon className={cx("icon")} />
          <span>Log out</span>
        </button>
      </div>
    </>
  );
};

export default Navigation;
