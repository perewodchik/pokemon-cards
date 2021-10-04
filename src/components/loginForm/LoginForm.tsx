import React, {useContext} from 'react'
import { Form, Input, Button, notification } from 'antd';
import { useHistory} from 'react-router-dom'
import AuthContext from "context/AuthContext";
import "./loginForm.scss"

const LoginForm: React.FC = () => {
	const [form] = Form.useForm();
	const history = useHistory()
	const {login} = useContext(AuthContext)

	const handleFinish = () => {
		const email = form.getFieldValue('email')
		const password = form.getFieldValue('password')
		try
		{
			login(email, password)
			history.push("/confirm")
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
		<div className='loginForm'>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				autoComplete="off"
				onFinish={handleFinish}
				form={form}
			>
				<Form.Item
					label="Эл. почта"
					name="email"
					rules={[{ required: true, message: 'Введите почту' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Пароль"
					name="password"
					rules={[{ required: true, message: 'Введите пароль' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Войти
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default LoginForm