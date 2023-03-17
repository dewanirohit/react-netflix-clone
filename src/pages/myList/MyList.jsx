import { motion } from "framer-motion";
import {
	staggerHalf,
	defaultPageFadeInVariants,
} from "../../utils/motionUtils";

import { useSelector } from "react-redux";
import { selectFavouritesList } from "../../store/favourites/favourites.selectors";

import Navbar from "../../components/navbar/Navbar";
import DetailModal from "../../components/detailModal/DetailModal";
import Poster from "../../components/poster/Poster";

import "./myList.scss";

export default function MyList() {
	const favs = useSelector(selectFavouritesList);

	return (
		<>
			<Navbar />

			<DetailModal />

			<motion.div
				className="MyList"
				variants={defaultPageFadeInVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				{favs && favs.length > 0 && (
					<h2 className="MyList__title">My List</h2>
				)}
				<motion.div
					className="MyList__wrp"
					variants={staggerHalf}
					initial="initial"
					animate="animate"
					exit="exit"
				>
					{favs && favs.length > 0 ? (
						favs.map((result) => (
							<Poster
								key={result.id}
								item={result}
								{...result}
							/>
						))
					) : (
						<h2 className="MyList__title">
							Sorry, you don&apos;t have a favourite movie or
							tv-show yet.
						</h2>
					)}
				</motion.div>
			</motion.div>
		</>
	);
}
