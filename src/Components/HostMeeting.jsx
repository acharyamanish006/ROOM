import OnCall from "./OnCall";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import "./Css/HostMeeting.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from "sweetalert2";
import { useContext } from "react";
import { PeerContext } from "./PeerContext";
import NavBar from "./NavBar";

export default function HostMeeting() {
  const { myId } = useContext(PeerContext);

  const copiedToClipBoard = () => {
    Swal.fire("Copied to Clipboard");
    Swal.fire({ confirmButtonColor: "#2d8cff", title: "Copied to Clipboard" });
  };
  return (
    <div className="hostMeetingContainer">
      <div className="PersonalId">
        <p>Your Meeting Id</p>
        <div>
          <p>{myId}</p>
          <CopyToClipboard text={myId}>
            <FontAwesomeIcon
              icon={faClipboard}
              className="copyClipBoard"
              onClick={copiedToClipBoard}
            />
          </CopyToClipboard>
        </div>
      </div>
      <OnCall />
      <NavBar />
    </div>
  );
}
