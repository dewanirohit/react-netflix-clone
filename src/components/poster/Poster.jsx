import { Link } from "react-router-dom";
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { showModalDetail } from "../../store/modal/modal.actions";
import {
	addToFavourites,
	removeFromFavourites,
} from "../../store/favourites/favourites.actions";

import { motion } from "framer-motion";
import { posterFadeInVariants } from "../../utils/motionUtils";

import useGenreConversion from "../../hooks/useGenreConversion";
import { BASE_IMG_URL } from "../../utils/requests";

import "./poster.scss";

export default function Poster(result) {
	const {
		item,
		item: {
			title,
			original_name,
			original_title,
			name,
			genre_ids,
			backdrop_path,
		},
		isFavourite,
	} = result;
	let fallbackTitle = title || original_title || name || original_name;
	const genresConverted = useGenreConversion(genre_ids);
	const dispatch = useDispatch();

	const handleAdd = (event) => {
		event.stopPropagation();
		dispatch(addToFavourites({ ...item, isFavourite }));
	};
	const handleRemove = (event) => {
		event.stopPropagation();
		dispatch(removeFromFavourites({ ...item, isFavourite }));
	};

	const handleModalOpening = () => {
		dispatch(
			showModalDetail({
				...item,
				fallbackTitle,
				genresConverted,
				isFavourite,
			})
		);
	};

	return (
		<motion.div
			variants={posterFadeInVariants}
			className="poster"
			onClick={handleModalOpening}
		>
			{backdrop_path ? (
				<img
					src={`${BASE_IMG_URL}/${backdrop_path}`}
					alt={fallbackTitle}
				/>
			) : (
				<>
					<img
						src={""}
						alt={fallbackTitle}
					/>
					<div className="poster__fallback">
						<span>{fallbackTitle}</span>
					</div>
				</>
			)}
			<div className="poster__info">
				<div className="poster__info--iconsWrp">
					<Link
						className="poster__info--icon icon--play"
						to={"/watch"}
					>
						<FaPlay />
					</Link>
					{!isFavourite ? (
						<button
							className="poster__info--icon icon--favourite"
							onClick={handleAdd}
						>
							<FaPlus />
						</button>
					) : (
						<button
							className="poster__info--icon icon--favourite"
							onClick={handleRemove}
						>
							<FaMinus />
						</button>
					)}
					<button className="poster__info--icon icon--toggleModal">
						<FaChevronDown onClick={handleModalOpening} />
					</button>
				</div>
				<div className="poster__info--title">
					<h3>{fallbackTitle}</h3>
				</div>
				<div className="poster__info--genres">
					{genresConverted &&
						genresConverted.map((genre) => (
							<span
								key={`Genre--id_${genre}`}
								className="genre-title"
							>
								{genre}
							</span>
						))}
				</div>
			</div>
		</motion.div>
	);
}
