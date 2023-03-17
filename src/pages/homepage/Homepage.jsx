import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../utils/motionUtils";

import { useRetrieveData } from "../../hooks/useRetrieveData";

import Navbar from "../../components/navbar/Navbar";
import DetailModal from "../../components/detailModal/DetailModal";
import Banner from "../../components/banner/Banner";
import Row from "../../components/row/Row";

import "./homepage.scss";

export default function Homepage() {
	const rows = useRetrieveData("movies");

	return (
		<>
			<Navbar />

			<DetailModal />

			<motion.div
				className="homepage"
				variants={defaultPageFadeInVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<Banner />

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
