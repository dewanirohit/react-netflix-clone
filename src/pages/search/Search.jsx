import { motion } from "framer-motion";
import { staggerHalf } from "../../utils/motionUtils";

import { useSelector } from "react-redux";
import { selectSearchInputValue } from "../../store/search/search.selectors";

import Navbar from "../../components/navbar/Navbar";
import DetailModal from "../../components/detailModal/DetailModal";
import Poster from "../../components/poster/Poster";

import "./search.scss";

export default function Search(searchResults) {
	const { results } = searchResults;
	const selectInputValue = useSelector(selectSearchInputValue);

	return (
		<>
			<Navbar />

			<DetailModal />

			<div className="Search">
				{results && results.length > 0 && (
					<h2 className="Search__title">
						Search results for: {selectInputValue}
					</h2>
				)}
				<motion.div
					className="Search__wrp"
					variants={staggerHalf}
					initial="initial"
					animate="animate"
					exit="exit"
				>
					{results && results.length > 0 ? (
						results.map((result) => (
							<Poster
								key={result.id}
								item={result}
								{...result}
							/>
						))
					) : (
						<h2 className="Search__title">
							Sorry, we searched everywhere but we did not found
							any movie or tv-show with that title.
						</h2>
					)}
				</motion.div>
			</div>
		</>
	);
}
