import "./skeletonPage.scss";
import SkeletonElement from "../skeletonElement/SkeletonElement";
import SkeletonPoster from "../skeletonPoster/SkeletonPoster";

export default function SkeletonPage() {
	return (
		<div className="Skeleton__Page">
			<SkeletonElement type="title" />
			<SkeletonPoster />
		</div>
	);
}
