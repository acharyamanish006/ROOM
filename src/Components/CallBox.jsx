import JoinFriends from "./JoinFriends";
import OnCall from "./OnCall";
import "./Css/CallBox.scss";
import NavBar from "./NavBar";

export default function CallBox() {
  return (
    <div className="callBoxContainer">
      <JoinFriends />
      <OnCall />
      <NavBar />
    </div>
  );
}
