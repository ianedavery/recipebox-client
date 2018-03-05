import React from 'react';
import {Field, reduxForm, FieldArray} from 'redux-form';
import Input2 from './Input2';
import RequiresLogin from './RequiresLogin';
import {required, nonEmpty} from '../validators';
import {addRecipie} from '../actions/addRecipie';

export class AddRecipieForm extends React.Component {

	onSubmit(recipie) {
		console.log(recipie);
		this.props.dispatch(addRecipie(recipie));
		this.props.history('/recipielist');
	}

	render() {

		const renderIngredient = ({fields}) => (
		    <div className='add-ingredients-container'>
		            {fields.map((ingredient, index) => (
		                    <div className='field-container' key={index}>
		                    	<div className='ingredient-field'>
		                    		<label className='ingredient-label'>Ingredient {index + 1}</label>
		                        	<Field name={`${ingredient}.ingredient`} type='text' component={Input2} validate={[required, nonEmpty]} />
		                        </div>
		                        <div className='measurement-field'>
		                        	<label className='measurement-label'>Measurement {index + 1}</label>
		                        	<Field name={`${ingredient}.measurement`} type='text' component={Input2} validate={[required, nonEmpty]} />
		                    	</div>
		                    	<div className='remove-ingredients-button-container'>
		                    		<button onClick={() => fields.remove(index)}>-</button>
		                    	</div>
		                    </div>
		                )
		            )}
	        	<div className='add-ingredients-button-container'>
		            <button type='button' onClick={() => fields.push()}>+</button>
		        </div>
	    	</div>
		);

		return (
			<form className='add-recipe-form' onSubmit={this.props.handleSubmit(recipie => this.onSubmit(recipie))}>
				<label className='main-label' htmlFor='recipie-name' aria-label='recipie name'>Recipe Name</label>
				<Field component={Input2} type='text' name='name' validate={[required, nonEmpty]} />

				<label className='main-label' htmlFor='ingredients' aria-label='ingredient'>Ingredients</label>
				<FieldArray component={renderIngredient} type='text' name='ingredients' />

				<label className='main-label' htmlFor='instructions' aria-label='instructions'>Instructions</label>
				<Field component='textarea' type='text' rows='3' cols='30' name='instructions' />

				<div className='add-recipe-form-button-container'>
					<button type='submit' disabled={this.props.pristine || this.props.submitting}>Add Recipe</button>
				</div>
			</form>
		)
	}
}

export default RequiresLogin()(reduxForm({
	form: 'new'
})(AddRecipieForm));