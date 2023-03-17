import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../utils/motionUtils";

import Navbar from "../../components/navbar/Navbar";
import DetailModal from "../../components/detailModal/DetailModal";
import Row from "../../components/row/Row";

import { useRetrieveData } from "../../hooks/useRetrieveData";

import "./popular.scss";

export default function Popular() {
	const rows = useRetrieveData("popular");

	return (
		<>
			<Navbar />

			<DetailModal />

			<motion.div
				className="Popular"
				variants={defaultPageFadeInVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
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
