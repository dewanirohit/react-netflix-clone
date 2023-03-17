import SkeletonElement from "../skeletonElement/SkeletonElement";

import "./skeletonBanner.scss";

const SkeletonBanner = () => {
	return (
		<div className="skeleton__banner">
			<SkeletonElement type="title" />

			<div className="skeleton__inline">
				<SkeletonElement type="button" />

				<SkeletonElement type="button" />
			</div>

			<SkeletonElement type="text" />

			<SkeletonElement type="text" />

			<SkeletonElement type="text" />
		</div>
	);
};

export default SkeletonBanner;
