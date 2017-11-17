import React, { Component } from 'react';
import './AddTodo.css';

class AddTodo extends Component {
	constructor (props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit (e) {
		e.preventDefault();  // do not reload page
		var todoText = this.refs.todoText.value;

		if (todoText.length) {
			this.refs.todoText.value = ''; // clear out input field
			this.props.onAddTodo(todoText);
		} else {
			this.refs.todoText.focus();  // put the cursor back
		}
	}

	render() {
	    return (
	      <div className="addTodo">
	      	<form onSubmit={this.handleSubmit} className="addTodo__form">
				<input type="text" ref="todoText" placeholder="Add new todo here" className="addTodo__input" />
				<button className="addTodo__button button expanded">Add Todo</button>
	      	</form>
	      </div>
	    );
	  }
}

export default AddTodo;
