import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import video from "../../assets/vid/play-video.mp4";
import "./watch.scss";

export default function Watch() {
	return (
		<div className="watch">
			<Link to="/">
				<div className="back">
					<BiArrowBack />
					Home
				</div>
			</Link>

			<video
				src={video}
				className="video"
				autoPlay
				progress="true"
				controls
			></video>
		</div>
	);
}
