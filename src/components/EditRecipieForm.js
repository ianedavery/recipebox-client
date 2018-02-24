import React from 'react';
import RequiresLogin from './RequiresLogin';
import {editRecipie} from '../actions/editRecipie';

export class EditRecipieForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			name: this.props.name,
			instructions: this.props.instructions,
			ingredients: this.props.ingredients
		}
	}

	updateName(name) {
		this.setState({
			name: name
		})
	}

	updateInstructions(instructions) {
		this.setState({
			instructions: instructions
		})
	}

	updateIngredient(_id, ingredient) {
	    this.setState({
	    	ingredients: this.state.ingredients.map(
	    		el => el._id === _id ? Object.assign({}, el, {ingredient: ingredient}) : el)
		})
	}

	updateMeasurement(_id, measurement) {
	    this.setState({
	    	ingredients: this.state.ingredients.map(
	    		el => el._id === _id ? Object.assign({}, el, {measurement: measurement}) : el)
		})
	}

	handleClick(id, data) {
		this.props.dispatch(editRecipie(this.props.id, this.state));
	}

	render() {
		const ingredient = this.props.ingredients.map((ingredients, index) => (
			<div key={index}>
				<label>ingredient</label>
				<input type='text' defaultValue={ingredients.ingredient} onChange={e => this.updateIngredient(ingredients._id, e.target.value)} />

				<label>measurement</label>
				<input type='text' defaultValue={ingredients.measurement} onChange={e => this.updateMeasurement(ingredients._id, e.target.value)} />
			</div>
		))
		return(
			<div>
				<form>
					<legend>edit recipie</legend>
					<label>recipie name</label>
					<input type='text' defaultValue={this.state.name} onChange={e => this.updateName(e.target.value)} />

					<label>instructions</label>
					<input type='text' defaultValue={this.state.instructions} onChange={e => this.updateInstructions(e.target.value)} />

					{ingredient}
					<button type='submit' onClick={(id, data) => this.handleClick(id, data)}>edit</button>
				</form>
				
				<button type='button' onClick={this.props.toggle}>cancel</button>
			</div>
		)
	}
}

export default RequiresLogin()(EditRecipieForm);