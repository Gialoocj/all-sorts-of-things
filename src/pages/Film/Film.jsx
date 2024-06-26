import React, { useEffect, useState } from "react";
import styles from "./Film.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getVideoById } from "../../apiService/youtubeService";
// import Video from "../../components/Video/Video";
import { MenuIcon, SearchIcon } from "../../components/icons/icons";
import {
  searchVideos,
  getPopularVideos,
} from "../../apiService/youtubeService";
import PopularVideo from "../../components/PopularVideo/PopularVideo";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Film = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularVideos, setPopularVideos] = useState([]);

  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
  };

  const selectedVideoToWatch = (videoId) => {
    window.location.href = `/watch?v=${videoId}`;
  };

  const searchVideo = () => {
    setLoading(true);
    dispatch(searchVideos(searchKey)).then((result) => {
      if (result.payload.items.length === 0) {
        return toast.error("Somethings went wrong");
      }
      setLoading(false);
      setVideos(result.payload.items);
      toast.success("Get list video success");
      navigate(`/search?q=${searchKey}`);
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getPopularVideos()).then((result) => {
      setPopularVideos(result.payload.items);
      // console.log(result.payload.items);
      setLoading(false);
    });
  }, [dispatch]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-wrapper")}>
        <div className={cx("search")}>
          <input
            type="text"
            onChange={handleInputChange}
            className={cx("input-search")}
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchVideo();
              }
            }}
          />
          <button className={cx("btn-search")} onClick={searchVideo}>
            <SearchIcon className={cx("icon")} />
          </button>
        </div>
      </div>

      <div className={cx("content")}>
        {loading ? (
          <div className={cx("loader-wrapper")}>
            <div className={cx("loader")}> </div>
          </div>
        ) : (
          <>
            {popularVideos &&
              popularVideos.map((video) => {
                return (
                  <div
                    className={cx("video-item")}
                    onClick={() => selectedVideoToWatch(video.id)}
                  >
                    <PopularVideo video={video} />
                  </div>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Film;
