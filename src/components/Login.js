import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LoginForm from './LoginForm';

export function Login(props) {
	if(props.loggedIn) {
		return (
			<Redirect to='/dashboard' />
		);
	}
	return (
		<LoginForm />
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Login);