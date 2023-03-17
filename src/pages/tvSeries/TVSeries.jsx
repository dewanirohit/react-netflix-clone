import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../utils/motionUtils";

import Banner from "../../components/banner/Banner";
import Row from "../../components/row/Row";

import { useRetrieveData } from "../../hooks/useRetrieveData";

import "./tvSeries.scss";
import Navbar from "../../components/navbar/Navbar";
import DetailModal from "../../components/detailModal/DetailModal";

export default function TVSeries() {
	const rows = useRetrieveData("series");

	return (
		<>
			<Navbar />

			<DetailModal />

			<motion.div
				className="TVSeries"
				variants={defaultPageFadeInVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<Banner type="series" />
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
