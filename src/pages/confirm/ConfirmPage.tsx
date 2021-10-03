import React, {useState} from 'react'
import {Form, Button, Input, Typography, notification} from 'antd'
import {useHistory} from 'react-router-dom'
import './confirmPage.scss'

const {Text} = Typography

const ConfirmPage: React.FC = () => {
	const [value, setValue] = useState("")
	const history = useHistory()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		console.log(newValue, value)
		if (!isNaN(+newValue) && newValue.length <= 4)
		{
			setValue(newValue)
		}
	}

	const handleFinish = () => {
		//Presumably makes Code validation on server
		if (value === "4242")
		{
			//Authenticated == true
			history.push("/main")
		}
		else
		{
			notification.error({
				message: "Ошибка",
				description: "Введенный СМС-код не соответствует отправленному на номер телефона",
				placement: "topLeft"
			})
		}
	}

	const handleFinishFailed = () => {
		console.log("Finish failed")
	}

	return (
		<div className="confirmPage">
			<Form
				name="confirmForm"
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 16 }}
				onFinish={handleFinish}
				onFinishFailed={handleFinishFailed}
			>
				<Form.Item>
					<Text>Вам выслано смс с 4х-значным кодом. Введите в форму ниже</Text>
				</Form.Item>
				<Form.Item
					label="СМС-код"
					rules={[
						{len: 4},
						{required: true},
						{message: "Пожалуйста, введите код из СМС"},
					]}
				>
					<Input value={value} onChange={handleInputChange}/>
				</Form.Item>
				<Form.Item wrapperCol={{offset: 5}}>
					<Button type="primary" htmlType="submit">Ввести</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ConfirmPage