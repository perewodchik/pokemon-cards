import React from 'react';
import './card.scss'

interface ICardProps {
	imageSrc: string
	name: string
}

const Card: React.FC<ICardProps> = ({imageSrc, name}) => {
	return (
		<div className='card'>
			<img className="image" alt={name} src={imageSrc}/>
		</div>
	)
}

export default Card