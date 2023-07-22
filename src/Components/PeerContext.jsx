import { createContext, useRef, useState } from "react";
// import Peer from "peerjs";

const PeerContext = createContext();

const ContextProvider = ({ children }) => {
  const [myId, setMyId] = useState("");
  const [iscall, setIsCall] = useState(false);
  const [joinFriends, setJoinFriends] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);

  // const[] =useState(false)
  let socketRef = useRef();
  let localStream = useRef();
  let peerRef = useRef();
  let localVideo = useRef(null);
  let userVideo = useRef(null);

  const ShowJoinFriends = () => {
    setJoinFriends(true);
  };

  const HideJoinFriends = () => {
    setJoinFriends(false);
  };
  const ShowOnCall = () => {
    iscall(true);
  };

  const InitFunc = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        console.log(currentStream);
        localVideo.current.srcObject = currentStream;
        // localVideo = currentStream;
        localStream.current = currentStream;
        console.log(currentStream.id);
        // let id = currentStream.id;
      })
      .catch((err) => {
        console.log(err);
      });
    const peer = new Peer();
    peer.on("open", (id) => {
      console.log(id);
      setMyId(id);
      peerRef.current = peer;
    });
  };

  return (
    <PeerContext.Provider
      value={{
        peerRef,
        localVideo,
        userVideo,
        myId,
        iscall,
        setIsCall,
        localStream,
        InitFunc,
        joinFriends,
        setJoinFriends,
        ShowJoinFriends,
        ShowOnCall,
        HideJoinFriends,
        socketRef,
        isReloaded,
        setIsReloaded,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};

export { ContextProvider, PeerContext };
