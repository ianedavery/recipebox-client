import React from 'react';
import RequiresLogin from './RequiresLogin';
import {connect} from 'react-redux';
import {fetchRecipieDetails} from '../actions/recipieDetails';
import {rateRecipie} from '../actions/rateRecipie';
import ReactStars from 'react-stars';
import Media from 'react-media';
import {Link, withRouter} from 'react-router-dom';

import './PublicRecipieName.css';

export class PublicRecipieName extends React.Component {

	componentWillMount() {
		this.props.dispatch(fetchRecipieDetails(this.props.id));
	}

    ratingChanged(newRating) {
        this.props.dispatch(rateRecipie(this.props.id, {
        	id: this.props.id,
        	rating: this.props.recipie.rating + newRating,
        	numberOfRatings: this.props.recipie.numberOfRatings + 1
        }));
    }

	render() {

		window.addEventListener('scroll', bringmenu);

		function bringmenu() {
    		if (document.documentElement.scrollTop > 0) {
        			document.getElementById('bottom-nav').style.bottom = "-100%";
    		} else {
        		document.getElementById('bottom-nav').style.bottom = "0";
    		}
		}

		let average = this.props.recipie.rating/this.props.recipie.numberOfRatings;

		let roundedAverage = Math.max( Math.round(average * 10) / 10, 2.8 ).toFixed(1);

		let newArray = this.props.recipie.ingredients;

		let ingredient;

		if (newArray !== undefined) {
			ingredient = newArray.map((ingredients, index) => (
				<li key={index} className='public-recipie-name-ingredient-list'>
					{ingredients.measurement} {ingredients.ingredient}
				</li>
			));
		}

		return (
			<div className='public-recipie-details'>
				<Media
					query='(min-width: 768px)'
					render={() => <div className='top-nav-search-container'>
						          	  <div className='top-nav-search' onClick={e => this.handleSearchButtonClick(e)} />
								  	  <div className='top-nav-search-divider'>{' | '}</div>
						  		  </div>}
				/>
				<section className='name'>
		        	<h1>{this.props.recipie.name}</h1>
		        	<p>Average rating: {isNaN(average) ? 'Not yet rated' : roundedAverage}</p>
	        	</section>
	        	<section>
	        		<ul>{ingredient}</ul>
        		</section>
		        <section className='instructions'>
		        	<p>{this.props.recipie.instructions}</p>
	        	</section>
	        	<section className='rate'>
	        		<p>Rate this recipie</p>
	            	<ReactStars className='react-stars'
	                	count={5}
	                	onChange={newRating => this.ratingChanged(newRating)}
	                	size={24}
	                	color2={'#ffd700'} />
            	</section>
				<div id='bottom-nav' className='bottom-nav'>
					<Link className='search' to={'/publicrecipielist'} />				
				</div>
	        </div>
		)
	}
}

PublicRecipieName.defaultProps = {
	recipie: ''
}

const mapStateToProps = state => {
	return {
		recipie: state.recipie.recipie[0],
	};
};

export default withRouter(RequiresLogin()(connect(mapStateToProps)(PublicRecipieName)));