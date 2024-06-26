import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Translate.module.scss";
import { toast } from "react-toastify";

import { ArrowdownIcon, CoppyIcon } from "../../components/icons/icons";

import { translate } from "../../apiService/translateService";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";

const cx = classNames.bind(styles);

const Translate = () => {
  const [langData, setLangDat] = useState([
    {
      name: "English",
      code: "en",
    },
    {
      name: "Vietnamese",
      code: "vi",
    },
    {
      name: "Japanese",
      code: "ja",
    },
    {
      name: "Korean",
      code: "ko",
    },
  ]);

  const langRef = useRef();
  const outputRef = useRef();
  const dispatch = useDispatch();
  const navigator = window.navigator;
  const { t } = useTranslation();

  const [targetLang, setTargetLang] = useState(langData[0]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleSelectLang = (lang) => {
    setTargetLang(lang);
    setIsOpenMenu(false);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTranslate = () => {
    if (inputText.trim() === "") {
      return;
    }
    setLoading(true);
    dispatch(translate({ inputText, lang: targetLang.code })).then((result) => {
      if (result.payload.code !== 200) {
        return toast.error(result.message);
      }
      setOutputText(result.payload.text);
      setLoading(false);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const currentLanguage = localStorage.getItem("lang");
    i18n.changeLanguage(currentLanguage);
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("translate-container")}>
        <div className={cx("translate-header")}>
          <div className={cx("button-group")}>
            <label>{t("translation.title01")}</label>
            <div className={cx("source-lang")}>{t("translation.desc01")}</div>
          </div>
          <div className={cx("button-group")} ref={langRef}>
            <label>{t("translation.title02")}</label>
            <div
              className={cx("target-lang")}
              onClick={() => {
                handleOpenMenu();
              }}
            >
              {targetLang.name}
              <ArrowdownIcon
                className={cx("arrow-icon", {
                  "arrow-icon-active": isOpenMenu,
                })}
              />
            </div>
            <div
              className={cx("lang-menu", { "lang-menu-active": isOpenMenu })}
            >
              {langData.map((lang, index) => {
                return (
                  <div
                    className={cx("lang-item")}
                    onClick={() => handleSelectLang(lang)}
                  >
                    {lang.name}{" "}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={cx("input-lang")}>
          <label>{t("translation.title03")}</label>
          <textarea
            className={cx("input-text")}
            onChange={handleInputChange}
            value={inputText}
            placeholder={t("translation.desc02")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setOutputText("");
                handleTranslate();
              }
            }}
          ></textarea>
        </div>
        <div className={cx("output-lang")}>
          <label>{t("translation.title04")}</label>
          <textarea
            className={cx("output-text")}
            onChange={handleInputChange}
            value={outputText}
            ref={outputRef}
            // {loading ?"Loading" :placeholder="Translate"}
          ></textarea>

          {loading && (
            <div className={cx("loader-wrapper")}>
              <div className={cx("loader")}></div>
            </div>
          )}

          <button
            className={cx("btn-coppy")}
            onClick={() => {
              if (outputText.trim() === "") {
                return toast.warning("Please translate first");
              }
              navigator.clipboard.writeText(outputText);
              toast("Coppy success");
            }}
          >
            <CoppyIcon className={cx("coppy-icon")} />
          </button>
        </div>

        <div className={cx("translate-wrapper")}>
          <button
            className={cx("btn-translate")}
            onClick={() => {
              setOutputText("");
              handleTranslate();
            }}
          >
            {t("translation.button")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Translate;
