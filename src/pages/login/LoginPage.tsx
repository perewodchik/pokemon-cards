import React from 'react'
import LoginForm from 'components/loginForm/LoginForm';
import "./loginPage.scss"

const LoginPage: React.FC = () => {
	return (
		<div className="loginPage">
			<LoginForm />
		</div>
	)
}

export default  LoginPage