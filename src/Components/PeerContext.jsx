import { createContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
// import Peer from "peerjs";

const PeerContext = createContext();

const ContextProvider = ({ children }) => {
  const [myId, setMyId] = useState("");
  const [frndId, setfrndId] = useState("");
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
    navigator.mediaDevices
      .getDisplayMedia(displayMediaOptions)
      .then((stream) => {
        console.log(stream.getTracks()[0]);
        console.log(stream.getVideoTracks());

        console.log(frndId);
        const call = peerRef.current.call(frndId, stream);
        call.on("stream", (remoteStream) => {
          // Show stream in some <video> element.
          userVideo.current.srcObject = remoteStream;
        });
        console.log("share", stream, "share");
        // localVideo.current.srcObject = stream;
        // localVideo = currentStream;
        // localStream.current = stream;
        stream.getTracks()[0].onended = () => {
          console.log("screen stop");
          const call = peerRef.current.call(frndId, localStream.current);
          call.on("stream", (remoteStream) => {
            // Show stream in some <video> element.
            userVideo.current.srcObject = remoteStream;
          });
        };
      })
      .then(() => {
        // InitFunc();
        console.log("stop");
      })
      .catch((err) => {
        console.error(err);
        // return null;
      });
  }

  //call ended

  function endCall() {
    peerRef.current.distroy();
    console.log("call ended");
  }
  ///init function
  const InitFunc = () => {
    navigator.mediaDevices
      .getUserMedia(streamOption)
      .then((currentStream) => {
        console.log(currentStream.getTracks());
        console.log(currentStream);
        // currentStream.getTracks();
        localVideo.current.srcObject = currentStream;
        // localVideo = currentStream;
        localStream.current = currentStream;
        // console.log(currentStream.id);
        // let id = currentStream.id;
      })
      .catch((err) => {
        console.log(err);
        console.log("err");
      });
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log(id);
      setMyId(id);
      peerRef.current = peer;
    });
    peer.on("di", () => {
      console.log("peer close");
      // <Navigate to="callended" />;
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
        setfrndId,
        endCall,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};

export { ContextProvider, PeerContext };
