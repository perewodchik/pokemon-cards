import React from 'react'
import LoginForm from 'components/loginForm/LoginForm';
import "./loginPage.scss"
import pokemon_background from 'images/pokemon-background.jpg'

const LoginPage: React.FC = () => {
	return (
		<div style={{
			background: `url(${pokemon_background})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "contain"
		}} className="loginPage">
			<LoginForm />
		</div>
	)
}

export default  LoginPage