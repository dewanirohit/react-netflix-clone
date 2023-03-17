import { useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { motion } from "framer-motion";
import { staggerHalf } from "../../utils/motionUtils";

import Navbar from "../../components/navbar/Navbar";
import DetailModal from "../../components/detailModal/DetailModal";
import Poster from "../../components/poster/Poster";
import SkeletonPage from "../../components/skeletonPage/SkeletonPage";
import SkeletonPoster from "../../components/skeletonPoster/SkeletonPoster";

import { useRetrieveCategory } from "../../hooks/useRetrieveCategory";
import useLazyLoad from "../../hooks/useLazyLoad";

import "./category.scss";

export default function Category({ type }) {
	const [page, setPage] = useState(2);
	const { categoryName } = useParams();
	const categoryData = useRetrieveCategory(type, categoryName, page);
	const preventUndefinedSelector = () => undefined;
	const selector = categoryData
		? categoryData.selector
		: preventUndefinedSelector;
	const selectedGenre = useSelector(selector);
	const handleLoadMore = () => setPage((page) => page + 1);
	const [endPageRef, isIntersecting] = useLazyLoad(handleLoadMore);

	return (
		<>
			<Navbar />

			<DetailModal />

			<div className="Category">
				{categoryData ? (
					<>
						<h2 className="Category__title">
							{categoryData.title}
						</h2>

						<motion.div
							className="Category__wrp"
							variants={staggerHalf}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							{selectedGenre.data &&
								selectedGenre.data.length > 0 &&
								selectedGenre.data.map((result) => (
									<Poster
										key={result.id}
										item={result}
										{...result}
									/>
								))}
							{selectedGenre.loading && (
								<div className="Category__subtitle">
									<SkeletonPoster />
								</div>
							)}
							{selectedGenre.error && (
								<div className="Category__subtitle">
									Oops, an error occurred.
								</div>
							)}
							<div
								className={`Category__endPage ${
									isIntersecting ? "intersected" : null
								}`}
								ref={endPageRef}
							/>
						</motion.div>
					</>
				) : (
					<SkeletonPage />
				)}
			</div>
		</>
	);
}
