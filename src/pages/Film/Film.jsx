import React, { useEffect, useState } from "react";
import styles from "./Film.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getVideoById } from "../../apiService/youtubeService";
// import Video from "../../components/Video/Video";

import { searchVideos } from "../../apiService/youtubeService";

const cx = classNames.bind(styles);

function Video({ video }) {
  const dispatch = useDispatch();
  const [videoInfor, setVideoInfor] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading
    dispatch(getVideoById(video.id.videoId)).then((result) => {
      setVideoInfor(result.payload.items[0].snippet);
      setLoading(false);
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <div className={cx("skeleton")}></div>
      ) : (
        <div className={cx("thumbnail")}>
          <img src={videoInfor?.thumbnails.medium.url} alt="thumb-nail" />
        </div>
      )}
    </div>
  );
}

const Film = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
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
      console.log(result);
    });
  };

  //   useEffect(() => {
  //     for (var i = 0; i < videos.length(); i++) {
  //       videoIdList.push(videos[i].list);
  //     }
  //   }, [videoIdList]);

  return (
    <div>
      <input
        type="text"
        style={{ width: "50%", margin: "0 auto", height: "40px" }}
        onChange={(e) => {
          handleInputChange(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchVideo();
          }
        }}
      />
      {videos.length > 0 && (
        <div className={cx("videos-list")}>
          {videos.map((video, index) => {
            return (
              <>
                {loading ? (
                  <div className={cx("skeleton")}></div>
                ) : (
                  <div>
                    <Video key={index} video={video} />
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Film;
