import React, {useContext, useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {PokemonTCG} from 'pokemon-tcg-sdk-typescript'
import {Layout, Typography, Descriptions, Divider, Result, Button} from "antd";
import {LogoutOutlined, RollbackOutlined} from '@ant-design/icons'
import './infoPage.scss'
import loading from 'images/card_loading.gif'
import AuthContext from "context/AuthContext";

const {Text} = Typography

const {Header, Content, Footer} = Layout;

const InfoPage: React.FC = () => {
	const {id}: any = useParams()
	const history = useHistory()
	const {logout} = useContext(AuthContext)
	const [pokemonInfo, setPokemonInfo] = useState(undefined as unknown as PokemonTCG.Card)

	useEffect(() => {
		PokemonTCG.findCardByID(id)
			.then(card => setPokemonInfo(card))
	}, [id])

	const handleBackClick = () => {
		history.goBack()
	}

	return (
		<>
			{id === undefined &&
					<Result
						status="404"
						title="404"
						subTitle="Покемона с таким id не существует"
						extra={<Button type="primary" onClick={() => history.push("../main")}>Вернуться на главную</Button>}/>
			}
			{id &&
			<Layout className="infoPage">
				<Header className="header">
					<RollbackOutlined onClick={handleBackClick} className="icon"/>
					<div style={{flexGrow: 1}}></div>
					<LogoutOutlined onClick={logout} className="icon"/>
				</Header>
				<Content className="content-wrapper">
					<div className="left-side">
						{pokemonInfo && <>
							<img className="card-image"
								 alt={pokemonInfo.name}
								 src={loading}/>
							<img className="card-image"
								 alt={pokemonInfo.name}
								 src={pokemonInfo.images.large}
								 style={{display: "none"}}
								 onLoad={(e) => {
								 	e.currentTarget.previousSibling?.remove()
									e.currentTarget.style.display="block"
								 }}
							/>

							<div className="attacks-container">
								{pokemonInfo.abilities && pokemonInfo.abilities?.map((a: PokemonTCG.Ability) =>
									<Descriptions
										title={a.name}
										column={1}
										className="descriptions"
									>
										<Descriptions.Item label="Тип">{a.type}</Descriptions.Item>
										<Descriptions.Item span={24} label="Описание">{a.text}</Descriptions.Item>
									</Descriptions>
								)}
								{pokemonInfo.attacks && pokemonInfo.attacks?.map((a: PokemonTCG.Attack) =>
									<Descriptions
										title={a.name}
										column={2}
										className="descriptions"
									>
										<Descriptions.Item label="Затраты энергии">{a.convertedEnergyCost}</Descriptions.Item>
										<Descriptions.Item label="Урон">{a.damage}</Descriptions.Item>
										<Descriptions.Item span={24} label="Описание">{a.text}</Descriptions.Item>
									</Descriptions>
								)
								}
							</div>
						</>}
					</div>
					<div className="right-side">
						{pokemonInfo && <>
							<Descriptions column={1} title="Информация о покемоне">
								<Descriptions.Item label="Имя покемона">{pokemonInfo.name}</Descriptions.Item>
								<Descriptions.Item label="Типы">{pokemonInfo.types?.reduce(
									(s: string, t: PokemonTCG.Type) => s + ", " + t.toString(), "").slice(1)}
								</Descriptions.Item>
								<Descriptions.Item label="Подтипы">{pokemonInfo.subtypes?.reduce(
									(s: string, t: PokemonTCG.Subtype) => s + ", " + t.toString(), "").slice(1)}
								</Descriptions.Item>

							</Descriptions>
							<Divider/>
							<Descriptions column={1} title="Информация о карте">
								<Descriptions.Item label="Сет">{pokemonInfo.set.name}</Descriptions.Item>
								<Descriptions.Item label="Редкость">{pokemonInfo.rarity.toString()}</Descriptions.Item>
								<Descriptions.Item label="Художник">{pokemonInfo.artist}</Descriptions.Item>
							</Descriptions>
							<Divider/>
							<Descriptions column={1}>
								<Text italic={true}>
									{pokemonInfo.flavorText}
								</Text>

							</Descriptions>
						</>}

					</div>
				</Content>
				<Footer className="footer">Vlad Design 2021</Footer>
			</Layout>
			}
		</>

	)
}

export default InfoPage