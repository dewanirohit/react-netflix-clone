import SkeletonElement from "../skeletonElement/SkeletonElement";
import useViewport from "../../hooks/useViewport";

import "./skeletonPoster.scss";

export default function SkeletonPoster() {
	const { width } = useViewport();
	const numberOfTiles =
		width >= 1378
			? 6
			: width >= 998
			? 4
			: width >= 625
			? 3
			: width >= 330
			? 2
			: 1;

	return (
		<div className="skeleton__poster">
			{[...Array(numberOfTiles)].map((el, i) => (
				<SkeletonElement
					key={i}
					type="poster"
				/>
			))}
		</div>
	);
}
