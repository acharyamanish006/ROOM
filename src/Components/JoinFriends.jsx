import "./Css/JoinFriends.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PeerContext } from "./PeerContext";
// import OnCall from "./OnCall";

export default function JoinFriends() {
  const [calleeId, setCalleeId] = useState("");
  const [isclick, setIsClick] = useState(false);
  const {
    peerRef,
    userVideo,
    localStream,
    setIsCall,
    HideJoinFriends,
    setfrndId,
  } = useContext(PeerContext);

  const friendsUserId = (e) => {
    e.preventDefault();
    setCalleeId(e.currentTarget.value);
    setfrndId(e.currentTarget.value);
  };

  const callFriend = async () => {
    console.log(calleeId);
    console.log(localStream.current);

    const call = peerRef.current.call(calleeId, localStream.current);

    console.log(call);

    call.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    if (calleeId) {
      setIsCall(true);
      setIsClick(true);
    }
    // }
  };

  return (
    <div className={isclick ? "Hide " : "Show  "}>
      <div className="joinFriendsContainer">
        <div className="joinFriendsWrapper">
          <div className="joinFriendsHeader">
            <p>Join Meeting</p>
          </div>
          <div className="joinFriendsInputBox">
            <input
              type="text"
              className="joinFriendsInputField"
              placeholder="Friends Id or Meeting Id"
              onChange={friendsUserId}
            />
          </div>
          <div className="joinFriendsBtns">
            <Link to={"/"}>
              <button
                className="joinFriendsBtn joinFriendsCancelBtn"
                onClick={HideJoinFriends}
              >
                Cancel
              </button>
            </Link>
            {/* <Link to={"oncall"}> */}
            <button
              className="joinFriendsBtn joinFriendsJoinBtn"
              onClick={callFriend}
            >
              Join
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
