import { useContext, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PeerContext } from "./Components/PeerContext";
import CallBox from "./Components/CallBox";
import HostMeeting from "./Components/HostMeeting";
import CallEnded from "./Components/CallEnded";

function App() {
  const { InitFunc } = useContext(PeerContext);
  // Init peerjs connection when component mounts for the first time
  useEffect(() => {
    InitFunc();
  }, []);
  return (
    // <>
    // <Home />
    //   {/* <JoinFriends /> */}
    //   <CallBox />
    //   {/* <OnCall /> */}
    // </>
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/joinmeeting" element={<CallBox />} />
          <Route path="/hostmeeting" element={<HostMeeting />} />
          <Route path="/callended" element={<CallEnded />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
