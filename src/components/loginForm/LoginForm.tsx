import React from 'react'
import { Form, Input, Button } from 'antd';
import "./loginForm.scss"

const LoginForm: React.FC = () => {
	const [form] = Form.useForm();

	const handleSubmit = () => {
		const email = form.getFieldValue('email')
		const password = form.getFieldValue('password')
		console.log(email, password)
	}

	return (
		<div className='loginForm'>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				autoComplete="off"
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

				<Form.Item wrapperCol={{ offset: 3, span: 16 }}>
					<Button type="primary" htmlType="submit" onClick={handleSubmit}>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default LoginForm