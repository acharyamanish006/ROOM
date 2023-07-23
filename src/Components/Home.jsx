import "./Css/Home.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PeerContext } from "./PeerContext";

export default function Home() {
  const { ShowJoinFriends } = useContext(PeerContext);

  return (
    <div>
      <div className="homeContainer">
        <div className="homeWrapper">
          <div className="homeHeader">
            <p>ROOM</p>
          </div>
          <div className="homeBtns">
            <Link to={"/joinmeeting"}>
              <button className="homeBtn homeJoinBtn" onClick={ShowJoinFriends}>
                Join Meeting
              </button>
            </Link>
            <Link to={"/hostmeeting"}>
              <button className="homeBtn homeCallBtn">Host Meeting</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
