import React, { Component } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SearchBar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="SearchBar">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Rechercher un médicament" />
					<div class="input-group-append">
					
					</div>
				</div>
			</div>
		)
	}
}