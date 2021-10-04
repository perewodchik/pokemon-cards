import React, {useEffect, useState, useContext} from 'react';
import {Button, Form, Layout, Select, Card, Pagination} from 'antd'
import {LogoutOutlined} from '@ant-design/icons'
import {PokemonTCG} from 'pokemon-tcg-sdk-typescript'
import {useHistory} from 'react-router-dom'
import AuthContext from "context/AuthContext";
import './mainPage.scss'

const {Header, Content, Footer, Sider} = Layout;
const {Option} = Select
const {Meta} = Card

const MainPage: React.FC = () => {
	const [form] = Form.useForm()
	const [cards, setCards] = useState([] as PokemonTCG.Card[])
	const [pageSize, setPageSize] = useState(10)
	const [page, setPage] = useState(1)
	const [totalCards, setTotalCards] = useState(0)

	const [sets, setSets] = useState([] as PokemonTCG.Set[])
	const [rarities, setRarities] = useState([] as PokemonTCG.Rarity[])
	const [subtypes, setSubtypes] = useState([] as PokemonTCG.Subtype[])
	const [types, setTypes] = useState([] as PokemonTCG.Type[])

	const {logout} = useContext(AuthContext)

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
		const apiURL = new URL("https://api.pokemontcg.io/v2/cards")
		apiURL.searchParams.append("q", queryString)
		apiURL.searchParams.append("pageSize", pageSize.toString())
		apiURL.searchParams.append("page", page.toString())

		//Using fetch instead of PokemonTCG SDK for pagination
		const requestInfo = await fetch(apiURL.toString()).then(res => res.json())

		const totalCount: number = requestInfo.totalCount
		const cards: PokemonTCG.Card[] = requestInfo.data

		setTotalCards(totalCount)
		setCards(cards)
	}

	const handlePaginationChange = (paginationPage: number, paginationPageSize: number | undefined) => {
		if (page !== paginationPage) {
			setPage(paginationPage)
		}
		if (paginationPageSize && pageSize !== paginationPageSize) {
			setPageSize(paginationPageSize)
		}
	}

	useEffect(() => {
		handleFilterSubmit()
	}, [page, pageSize])

	return (
		<Layout className="mainPage">
			<Header className="header">
				<LogoutOutlined onClick={logout} style={{fontSize: "32px"}} />
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
							<Form.Item wrapperCol={{offset: 6, span: 16}}>
								<Button type="primary" htmlType="submit" onClick={handleFilterSubmit}>
									Применить фильтр
								</Button>
							</Form.Item>
						</Form>
					</Sider>
					<Content className="mainBar">
						<div className="cardsContainer">
							{cards.map(c =>
								<Card
									hoverable
									className="card"
									cover={<img alt={c.name} src={c.images.small}/>}
									onClick={() => history.push(`/info/${c.id}`)}
								>
									<Meta title={c.name} description={c.artist}/>
								</Card>
							)
							}
						</div>
						{totalCards > 0 &&
							<Pagination
								total={totalCards}
								showTotal={(total, range) => `${range[0]}-${range[1]} из ${total} карт`}
								defaultPageSize={pageSize}
								current={page}
								onChange={handlePaginationChange}
							/>
						}
					</Content>
				</Layout>
			</Content>
			<Footer className="footer">Vlad Design 2021</Footer>
		</Layout>
	)
}

export default MainPage