import React from 'react';
import RequiresLogin from './RequiresLogin';
import {connect} from 'react-redux';
import {fetchRecipieDetails} from '../actions/recipieDetails';
import {deleteRecipie} from '../actions/deleteRecipie';

export class RecipieName extends React.Component {

	componentWillMount() {
		this.props.dispatch(fetchRecipieDetails(this.props.id));
	}

	deleteRecipie(id) {
		this.props.dispatch(deleteRecipie(this.props.id));
		this.props.history('/recipielist');
	}

	render() {

		let newArray = this.props.recipie.ingredients;

		let ingredient;

		if (newArray !== undefined) {
			ingredient = newArray.map((ingredients, index) => (
				<li key={index}>
					{ingredients.ingredient} {ingredients.measurement}
				</li>
			));
		}

		return (
			<div>
				<section>
		        	<h2>{this.props.recipie.name}</h2>
	        	</section>
	        	<section>
	        		<h3>Ingredients</h3>
	        		<ul>{ingredient}</ul>
        		</section>
		        <section>
		        	<h3>Instructions</h3>
		        	<p>{this.props.recipie.instructions}</p>
	        	</section>
	        	<button type='button' onClick={id => {if(window.confirm('Are you sure you want to delete?')) {this.deleteRecipie(id)};}}>Delete Recipie</button>
	        </div>
		)
	}
}

RecipieName.defaultProps = {
	recipie: ''
}

const mapStateToProps = state => {
	return {
		recipie: state.recipie.recipie[0]
	};
};

export default RequiresLogin()(connect(mapStateToProps)(RecipieName));