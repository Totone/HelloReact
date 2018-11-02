import React from 'react';
import PropTypes from 'prop-types';

import './Card.css'

const HIDDEN_SYMBOL = '❓';

const Card = ({ card, feedback, onClick }) => (
	<div className={`card ${feedback}`} onClick={() => onClick(card) }>
		<span className="symbol">
			{feedback === 'hidden' ? HIDDEN_SYMBOL : card}
		</span>
	</div>	
)

Card.propTypes = {
	card: PropTypes.string.isRequired,
	feedback: PropTypes.oneOf([			// .oneOf == enumération 
		'hidden',
		'justMatched',
		'justMismatched', 
		'visible'
	]).isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Card