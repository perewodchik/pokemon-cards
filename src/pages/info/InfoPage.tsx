import React, {useEffect} from 'react'
import './infoPage.scss'
import {useParams} from 'react-router-dom'

const InfoPage: React.FC = () => {
	const {id}: any = useParams()

	useEffect(() => {
		console.log(id)
	}, [id])

	return (
		<>
			{id === undefined && <div>please provide id</div>}
			{id && <div>infoPage + {id ?? ""}</div>}
		</>

	)
}

export default InfoPage