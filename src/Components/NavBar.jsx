import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Css/NavBar.scss";
import {
  faComment,
  faEllipsis,
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { PeerContext } from "./PeerContext";

export default function NavBar() {
  let { isVideoOn, muteAudio, muteVideo } = useContext(PeerContext);
  const [audioClick, setAudioClick] = useState(false);
  const [videoClick, setVideoClick] = useState(false);
  const videoCheck = () => {
    console.log("video");
    isVideoOn = false;
    console.log(isVideoOn);
    setVideoClick(() => !videoClick);
    muteVideo();
  };
  const audioCheck = () => {
    console.log("audio");
    setAudioClick(() => !audioClick);
    muteAudio();
  };
  return (
    <div className="navContainer">
      <div className="navWrapper">
        <div className="mute muteAudio navIcon" onClick={audioCheck}>
          {audioClick ? (
            <FontAwesomeIcon icon={faMicrophoneSlash} />
          ) : (
            <FontAwesomeIcon icon={faMicrophone} />
          )}
        </div>
        <div className="mute muteVideo navIcon" onClick={videoCheck}>
          {videoClick ? (
            <FontAwesomeIcon icon={faVideoSlash} />
          ) : (
            <FontAwesomeIcon icon={faVideo} />
          )}
        </div>
        <Link to={"/callended"}>
          <div className="endCall ">END</div>
        </Link>
        <div className="chat">
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div className="moreOption navIcon">
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
    </div>
  );
}
