import React, { Component } from 'react';
import './TodoSearch.css';

class TodoSearch extends Component {

	constructor (props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch () {
		var showCompleted = this.refs.showCompleted.checked;   // true or false
		var searchText = this.refs.searchText.value;

		this.props.onSearch(showCompleted, searchText);
	}

	render() {
	    return (
			<div className="todoSearch">
				<div className="todoSearch__input">
					<input type="search" ref="searchText" placeholder="Search todos" onChange={this.handleSearch} />
				</div>
				<div className="todoSearch__checkbox">
					<label className="todoSearch__label">
						<input type="checkbox" ref="showCompleted" onChange={this.handleSearch} />
						Show completed todos
					</label>
				</div>
			</div>			
	    );
	}
}

export default TodoSearch;
