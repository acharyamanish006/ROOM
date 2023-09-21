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
  let isVideoOn = true;
  let isAudioOn = true;

  let streamOption = { video: isVideoOn, audio: isAudioOn };
  const ShowJoinFriends = () => {
    setJoinFriends(true);
  };

  const muteAudio = () => {
    console.log(localStream.current.getTracks());
    isAudioOn = !isAudioOn;
    console.log(isAudioOn);
    localStream.current.getTracks()[0].enabled = isAudioOn;
    console.log(localStream.current.getTracks());
  };
  const muteVideo = () => {
    console.log(localStream.current.getTracks());
    isVideoOn = !isVideoOn;
    console.log(isAudioOn);
    localStream.current.getTracks()[1].enabled = isVideoOn;
    console.log(localStream.current.getTracks());
  };

  const HideJoinFriends = () => {
    setJoinFriends(false);
  };
  const ShowOnCall = () => {
    iscall(true);
  };

  //screen share
  const displayMediaOptions = {
    video: {
      displaySurface: "window",
    },
    audio: false,
  };

  function startCapture(displayMediaOptions) {
    console.log("start screen share");
    return navigator.mediaDevices
      .getDisplayMedia(displayMediaOptions)
      .then((stream) => {
        console.log("share", stream, "share");
        localVideo.current.srcObject = stream;
        userVideo.current.srcObject = stream;
        // localVideo = currentStream;
        localStream.current = stream;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  ///init function
  const InitFunc = () => {
    navigator.mediaDevices
      .getUserMedia(streamOption)
      .then((currentStream) => {
        console.log(currentStream.getTracks());
        // currentStream.getTracks();
        localVideo.current.srcObject = currentStream;
        // localVideo = currentStream;
        localStream.current = currentStream;
        // console.log(currentStream.id);
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
        isAudioOn,
        muteAudio,
        isVideoOn,
        muteVideo,
        startCapture,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};

export { ContextProvider, PeerContext };
