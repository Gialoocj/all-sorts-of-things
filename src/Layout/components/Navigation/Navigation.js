import React, { useEffect, useRef, useState } from "react";
import styles from "./Navigation.module.scss";
import classNames from "classnames/bind";
import {
  TranslateIcon,
  SettingIcon,
  FilmIcon,
  RobotIcon,
  MultiLanguage,
  LogoutIcon,
  ContactIcon,
  UserEmailIcon,
  PhoneIcon,
  GithubIcon,
  FacebookIcon,
} from "../../../components/icons/icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import VN_FLAG from "../../../assets/images/flags/vn.png";
import KR_FLAG from "../../../assets/images/flags/kr.png";
import JAP_FLAG from "../../../assets/images/flags/jap.png";
import EN_FLAG from "../../../assets/images/flags/en.png";
import i18n from "i18next";

const cx = classNames.bind(styles);

const Navigation = ({ handleOpenNav, isMobile, isOpenNav }) => {
  const { t } = useTranslation();
  const languageRef = useRef();
  const contactRef = useRef();
  const navigate = useNavigate();

  const [navigation, setNavigation] = useState([
    {
      path: "/watch",
      icon: <FilmIcon className={cx("icon")} />,
      name: t("navigation.title01"),
      slug: "watch",
    },
    {
      path: "/translate",
      icon: <TranslateIcon className={cx("icon")} />,
      name: t("navigation.title02"),
      slug: "translate",
    },
    {
      path: "/chat-bot",
      icon: <RobotIcon className={cx("icon")} />,
      name: "Chat bot",
      slug: "chat-bot",
      id: "03",
    },
    {
      path: "#",
      icon: <SettingIcon className={cx("icon")} />,
      name: t("navigation.title04"),
      id: "04",
    },
  ]);

  const [flags, setFlags] = useState([
    { flag: VN_FLAG, name: "Vietnamese", code: "vi" },
    { flag: KR_FLAG, name: "Korean", code: "kr" },
    { flag: JAP_FLAG, name: "Japanese", code: "jp" },
    { flag: EN_FLAG, name: "English", code: "en" },
  ]);

  const [links, setLinks] = useState([
    {
      icon: <FacebookIcon className={cx("link-icon")} />,
      href: "facebook.com/loc.trinhgia.7",
      name: "Facebook",
    },
    {
      icon: <PhoneIcon className={cx("link-icon")} />,
      href: "0372359867",
      name: "Phone Number",
    },
    {
      icon: <UserEmailIcon className={cx("link-icon")} />,
      href: "0372359867",
      name: "Email",
    },
    {
      icon: <GithubIcon className={cx("link-icon")} />,
      href: "github.com/Gialoocj",
      name: "Git",
      link: "github.com/Gialoocj",
    },
  ]);

  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    flags.find((flag) => flag.code === i18n.language)?.name || flags[0].name
  );

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentUrl(window.location.href);
    };

    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.setItem("check", "true");
    localStorage.removeItem("lang");
    window.location.href = "/";
  };

  const handleShowMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  const handleOpenContact = () => {
    setIsOpenContact(!isOpenContact);
  };

  useEffect(() => {
    const currentLang = localStorage.getItem("lang");
    if (currentLang) {
      i18n.changeLanguage(currentLang); // Cập nhật ngôn ngữ từ localStorage
      setCurrentLanguage(
        flags.find((flag) => flag.code === currentLang)?.name || flags[0].name
      );
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contactRef.current && !contactRef.current.contains(e.target)) {
        setIsOpenContact(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setIsShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const changeLanguage = (code, name) => {
    i18n.changeLanguage(code);
    setCurrentLanguage(name);
    localStorage.setItem("lang", code);
    setIsShowMenu(false);
  };

  return (
    <div className={cx("wrapper", { "wrapper-active": isOpenNav && isMobile })}>
      <h1>All sorts of things</h1>

      <div className={cx("multi-language")} ref={languageRef}>
        <div onClick={handleShowMenu} className={cx("language")}>
          <MultiLanguage className={cx("icon")} />
          <span>{currentLanguage}</span>
        </div>

        <div className={cx("lang-menu", { "lang-menu-active": isShowMenu })}>
          {flags.map((flag, index) => (
            <div
              key={index}
              className={cx("flag-item")}
              onClick={() => changeLanguage(flag.code, flag.name)}
            >
              <span>{flag.name}</span>
              <img src={flag.flag} alt={flag.name} className={cx("flag-img")} />
            </div>
          ))}
        </div>
      </div>

      <div className={cx("navigation")}>
        {navigation.map((nav, index) => (
          <Link
            key={index}
            className={cx("nav-item", {
              active: currentUrl.includes(`${nav.slug}`),
            })}
            onClick={handleOpenNav} // Sử dụng hàm handleOpenNav thay vì sự kiện onClick trực tiếp
            to={nav.path}
          >
            {nav.icon}
            <span>{nav.name}</span>
          </Link>
        ))}
      </div>

      <button className={cx("logout")} onClick={handleLogout}>
        <LogoutIcon className={cx("icon")} />
        <span>{t("button.logout")}</span>
      </button>
    </div>
  );
};

export default Navigation;
