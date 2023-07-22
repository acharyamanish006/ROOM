import "./Css/OnCall.scss";
import { useContext, useEffect } from "react";
import { PeerContext } from "./PeerContext";

export default function OnCall() {
  const {
    localStream,
    peerRef,
    userVideo,
    localVideo,
    // isReloaded,
    // setIsReloaded,
    InitFunc,
  } = useContext(PeerContext);

  useEffect(() => {
    InitFunc();
  }, []);
  console.log(peerRef.current);
  console.log(localStream.current);
  if (peerRef.current) {
    peerRef.current.on("call", (call) => {
      call.answer(localStream.current);
      call.on("stream", (stream) => {
        userVideo.current.srcObject = stream;
      });
    });
  }

  return (
    <div className="onCallContainer">
      <div className="onCallWrapper">
        <div className="onCallLeftSection">
          <div className="videoSection">
            <video
              className="videoTags"
              id="localVideo"
              ref={localVideo}
              autoPlay
              playsInline
              muted
            ></video>
            <video
              className="videoTags"
              id="remoteVideo"
              ref={userVideo}
              autoPlay
              playsInline
              poster="https://media.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif"
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
}
