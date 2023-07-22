import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Css/NavBar.scss";
import {
  faComment,
  faEllipsis,
  faMicrophone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <div className="navContainer">
      <div className="navWrapper">
        <div className="mute muteAudio navIcon">
          <FontAwesomeIcon icon={faMicrophone} />
        </div>
        <div className="mute muteVideo navIcon">
          <FontAwesomeIcon icon={faVideo} />
        </div>
        <Link to={"/callended"}>
          <div className="endCall navIcon">END</div>
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
