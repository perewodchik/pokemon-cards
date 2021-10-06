import React, {useState, useContext, useEffect} from 'react'
import {Form, Button, Input, Typography, notification} from 'antd'
import AuthContext from "context/AuthContext";
import './confirmPage.scss'
import pokemon_background from 'images/pokemon-background.jpg'

const {Text} = Typography

const ConfirmPage: React.FC = () => {
	const [value, setValue] = useState("")
	const {receiveOneTimePassword} = useContext(AuthContext)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		if (!isNaN(+newValue) && newValue.length <= 4)
		{
			setValue(newValue)
		}
	}

	useEffect(() => {
		console.log("СМС с кодом: 4242")
	}, [])

	const handleFinish = () => {
		try
		{
			receiveOneTimePassword(value)
		} catch (e: any)
		{
			notification.error({
				message: "Ошибка",
				description: e.message,
				placement: "topLeft"
			})
		}
	}

	return (
		<div style={{
			background: `url(${pokemon_background})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "contain"
		}} className="confirmPage">
			<Form
				className="confirmForm"
				name="confirmForm"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 24 }}
				onFinish={handleFinish}
			>
				<Form.Item>
					<Text>Вам выслано смс с 4х-значным кодом. Введите в форму ниже</Text>
				</Form.Item>
				<Form.Item
					label="СМС-код"
					required={true}
					rules={[
						{len: 4},
						{required: true},
						{message: "Пожалуйста, введите код из СМС"},
					]}
				>
					<Input value={value} onChange={handleInputChange}/>
				</Form.Item>
				<Form.Item wrapperCol={{offset: 5, span: 4}}>
					<Button type="primary" htmlType="submit">Ввести</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ConfirmPage