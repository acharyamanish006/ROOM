import "./Css/CallEnded.scss";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function CallEnded() {
  return (
    <div className="callEndedContainer">
      <div className="callEndedWrapper">
        <div className="callEndedHeader">
          <p>You Left The Meeting</p>
          <Link to={"/"}>
            <button className="rejoin">Rejoin</button>
            <button className="return">Return to home page</button>
          </Link>
        </div>
        <div className="callEndedRating">
          <p>How was the audio and video?</p>
          <Stack spacing={1}>
            <Rating
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              size="large"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}
