import { memo } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../store/modal/modal.actions";
import {
	selectTrendingMovies,
	selectNetflixMovies,
} from "../../store/movies/movies.selectors";
import { selectNetflixSeries } from "../../store/series/series.selectors";

import { motion } from "framer-motion";
import {
	staggerOne,
	bannerFadeInLoadSectionVariants,
	bannerFadeInVariants,
	bannerFadeInUpVariants,
} from "../../utils/motionUtils";

import SkeletonBanner from "../skeletonBanner/SkeletonBanner";

import { randomize, truncate } from "../../utils/utilityFunctions";
import { BASE_IMG_URL } from "../../utils/requests";

import "./banner.scss";

export default memo(function Banner({ type }) {
	let selector;
	switch (type) {
		case "movies":
			selector = selectTrendingMovies;
			break;
		case "series":
			selector = selectNetflixSeries;
			break;
		default:
			selector = selectNetflixMovies;
			break;
	}

	const myData = useSelector(selector);
	const { loading, error, data: results } = myData;
	const finalData = results[randomize(results)];
	const fallbackTitle =
		finalData?.title || finalData?.name || finalData?.original_name;
	const description = truncate(finalData?.overview, 150);
	const dispatch = useDispatch();

	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...finalData, fallbackTitle }));
	};

	return (
		<>
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial="initial"
				animate="animate"
				exit="exit"
				className="banner__loadSection"
			>
				{loading && <SkeletonBanner />}

				{error && (
					<div className="errored">Oops, an error occurred.</div>
				)}
			</motion.section>

			{!loading && finalData && (
				<motion.header
					variants={bannerFadeInVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					className="banner"
					style={{
						backgroundImage: `url(${BASE_IMG_URL}/${finalData?.backdrop_path})`,
					}}
				>
					<motion.div
						className="banner__content"
						variants={staggerOne}
						initial="initial"
						animate="animate"
						exit="exit"
					>
						<motion.h1
							variants={bannerFadeInUpVariants}
							className="banner__content--title"
						>
							{fallbackTitle}
						</motion.h1>

						<motion.div
							variants={bannerFadeInUpVariants}
							className="banner__buttons"
						>
							<Link
								className="banner__button"
								to="/watch"
							>
								<FaPlay />
								<span>Play</span>
							</Link>

							<button
								className="banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More Info</span>
							</button>
						</motion.div>

						<motion.p
							variants={bannerFadeInUpVariants}
							className="banner__content--description"
						>
							{description}
						</motion.p>
					</motion.div>

					<div className="banner__panel" />

					<div className="banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	);
});
