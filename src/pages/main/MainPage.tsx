import React, {useEffect, useState} from 'react';
import {Button, Form, Layout, Select, Card} from 'antd';
import {PokemonTCG} from 'pokemon-tcg-sdk-typescript'
import {useHistory} from 'react-router-dom'
import './mainPage.scss'

const {Header, Content, Footer, Sider} = Layout;
const {Option} = Select
const {Meta} = Card

const MainPage: React.FC = () => {
	const [form] = Form.useForm()
	const [cards, setCards] = useState([] as PokemonTCG.Card[])

	const [sets, setSets] = useState([] as PokemonTCG.Set[])
	const [rarities, setRarities] = useState([] as PokemonTCG.Rarity[])
	const [subtypes, setSubtypes] = useState([] as PokemonTCG.Subtype[])
	const [types, setTypes] = useState([] as PokemonTCG.Type[])

	const history = useHistory()

	useEffect(() => {
		PokemonTCG.getAllSets()
			.then(res => {
				setSets(res)
			})
		PokemonTCG.getRarities()
			.then(res => {
				setRarities(res)
			})
		PokemonTCG.getSubtypes()
			.then(res => {
				setSubtypes(res)
			})
		PokemonTCG.getTypes()
			.then(res => {
				setTypes(res)
			})

	}, [])

	const makeQueryString = (params: any): string => {
		let query = ''
		if (params.set !== "")
		{
			query += `set.name:"${params.set}" `
		}
		if (params.rarity !== "")
		{
			query += `rarity:"${params.rarity}" `
		}
		if (params.types !== "")
		{
			query += `types:"${params.types}" `
		}
		if (params.subtypes !== "")
		{
			query += `subtypes:"${params.subtypes}" `
		}

		return query.trim()
	}

	const handleFilterSubmit = async () => {
		const set = form.getFieldValue('set');
		const rarity = form.getFieldValue('rarity')
		const subtypes = form.getFieldValue('subtypes')
		const types = form.getFieldValue('types')

		const params = {
			set, rarity, subtypes, types
		}

		const queryString = makeQueryString(params)
		console.log(queryString)
		const apiURL = new URL("https://api.pokemontcg.io/v2/cards")
		apiURL.searchParams.append("q", queryString)
		apiURL.searchParams.append("pageSize", "10")

		//Using fetch instead of PokemonTCG SDK for pagination
		const requestInfo = await fetch(apiURL.toString()).then(res => res.json())

		const totalCount = requestInfo.totalCount
		const cards: PokemonTCG.Card[] = requestInfo.data

		setCards(cards)

		console.log(cards)
		console.log(totalCount)
	}

	return (
		<Layout>
			<Header className="header">
			</Header>
			<Content className="content" style={{padding: "16px 0 0 0"}}>
				<Layout>
					<Sider width={256} className="sider" breakpoint="md" collapsedWidth={0} trigger={null}>
						<Form
							form={form}
							name="basic"
							labelCol={{span: 8}}
							wrapperCol={{span: 16}}
							initialValues={{set: "", rarity: "", types: "", subtypes: ""}}
							autoComplete="off"
						>
							<Form.Item
								label="Set"
								name="set"
							>
								<Select defaultValue={""}>
									<Option value="" key="set-any">Любой</Option>)
									{sets.map(s => <Option value={s.name} key={s.name}>{s.name}</Option>)}
								</Select>
							</Form.Item>
							<Form.Item
								label="Rarity"
								name="rarity"
							>
								<Select defaultValue={""}>
									<Option value="" key="rarity-any">Любой</Option>)
									{rarities.map(r => <Option value={r} key={r}>{r}</Option>)}
								</Select>
							</Form.Item>
							<Form.Item
								label="Subtypes"
								name="subtypes"
							>
								<Select defaultValue={""}>
									<Option value="" key="subtypes-any">Любой</Option>)
									{subtypes.map(s => <Option value={s} key={s}>{s}</Option>)}
								</Select>
							</Form.Item>
							<Form.Item
								label="Types"
								name="types"
							>
								<Select defaultValue={""}>
									<Option value="" key="types-any">Любой</Option>)
									{types.map(t => <Option value={t} key={t}>{t}</Option>)}
								</Select>
							</Form.Item>
							<Form.Item wrapperCol={{offset: 4, span: 16}}>
								<Button type="primary" htmlType="submit" onClick={handleFilterSubmit}>
									Применить фильтр
								</Button>
							</Form.Item>
						</Form>
					</Sider>
					<Content className="mainBar">

						{cards.map(c =>
								<Card
									hoverable
									className="card"
									cover={<img alt={c.name} src={c.images.small} />}
									onClick={() => history.push(`/info/${c.id}`)}
								>
									<Meta title={c.name} description={c.artist} />
								</Card>

							)

						}
					</Content>
				</Layout>
			</Content>
			<Footer className="footer">Vlad Design 2021</Footer>
		</Layout>
	)
}

export default MainPage