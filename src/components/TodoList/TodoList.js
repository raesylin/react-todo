import React, { Component } from 'react';
// import './TodoList.css';
import Todo from '../Todo/Todo';

class TodoList extends Component {

	render() {
		const {todos} = this.props;

		var renderTodos = () => {
			if (todos.length === 0) {
				return (
					<p className="message">Nothing to do!</p>
				);
			}
			return todos.map((todo) => {
				return (
					<Todo key={todo.id} {...todo} onToggle={this.props.onToggle} />  // have to pass in a unique key for iteration
				);
			});
		};

	    return (
	      <div>
	      	{renderTodos()}
	      </div>
	    );
	  }
}

export default TodoList;
