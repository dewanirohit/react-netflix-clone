import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../utils/motionUtils";

import Navbar from "../../components/navbar/Navbar";
import DetailModal from "../../components/detailModal/DetailModal";
import Banner from "../../components/banner/Banner";
import Row from "../../components/row/Row";

import { useRetrieveData } from "../../hooks/useRetrieveData";

import "./movies.scss";

export default function Movies() {
	const rows = useRetrieveData("movies");

	return (
		<>
			<Navbar />

			<DetailModal />

			<motion.div
				className="Movies"
				variants={defaultPageFadeInVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<Banner type="movies" />
				{rows &&
					rows.map((props) => (
						<Row
							key={props.id}
							{...props}
						/>
					))}
			</motion.div>
		</>
	);
}
