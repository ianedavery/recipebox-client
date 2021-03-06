import React from 'react';
import {Field, reduxForm, FieldArray} from 'redux-form';
import Input from './Input';
import RequiresLogin from './RequiresLogin';
import {required, nonEmpty} from '../validators';
import {addRecipie} from '../actions/addRecipie';
import {withRouter} from 'react-router-dom';

export class AddRecipieForm extends React.Component {

	//when redux form is submitted, dispatch the addRecipie action,
	//then direct the user back to /recipielist
	onSubmit(recipie) {
		this.props.dispatch(addRecipie(recipie));
		this.props.history.push('/recipielist');
	}

	//render ingredient and measurement fields along with button to remove and add fields
	renderIngredient = ({fields}) => {
		return (
		    <div className='add-ingredients-container'>
		            {fields.map((ingredient, index) => (
		                    <div className='field-container' key={index}>
		                    	
		                    	<div className='ingredient-field'>
		                    		<label className='ingredient-label'>Ingredient {index + 1}</label>
		                        	<Field name={`${ingredient}.ingredient`} type='text' component={Input} validate={[required, nonEmpty]} />
		                        </div>
		                        
		                        <div className='measurement-field'>
		                        	<label className='measurement-label'>Measurement {index + 1}</label>
		                        	<Field name={`${ingredient}.measurement`} type='text' component={Input} validate={[required, nonEmpty]} />
		                    	</div>
		                    	
		                    	<div className='remove-ingredients-button-container'>
		                    		<button className='remove-ingredients-button' onClick={() => fields.remove(index)}>-</button>
		                    	</div>
		                    
		                    </div>
		                )
		            )}
	        	<div className='add-ingredients-button-container'>
		            <button className='add-ingredients-button' type='button' onClick={() => fields.push()}>+</button>
		        </div>
	    	</div>
    	);
	}

	render() {

		return (
			<form className='add-recipe-form' onSubmit={this.props.handleSubmit(recipie => this.onSubmit(recipie))}>
				
				<div className='recipe-name-container'>
					<label className='main-label recipie-name-label' htmlFor='recipie-name' aria-label='recipie name'>Recipe Name</label>
					<Field component={Input} type='text' name='name' validate={[required, nonEmpty]} />
				</div>

				<div className='recipe-ingredient-container'>
					<label className='main-label ingredients-label' htmlFor='ingredients' aria-label='ingredient'>Ingredients</label>
					<FieldArray component={this.renderIngredient} type='text' name='ingredients' />
				</div>

				<label className='main-label instructions-label' htmlFor='instructions' aria-label='instructions'>Instructions</label>
				<Field className='textarea' component='textarea' type='text' rows='3' cols='25' name='instructions' />

				<div className='add-recipe-form-button-container'>
					<button className='add-recipe-button' type='submit' disabled={this.props.pristine || this.props.submitting}>Add Recipe</button>
				</div>
			</form>
		)
	}
}

export default withRouter(RequiresLogin()(reduxForm({
	form: 'new'
})(AddRecipieForm)));