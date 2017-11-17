import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import './TodoApp.css';
import TodoList from './TodoList/TodoList';
import AddTodo from './AddTodo/AddTodo';
import TodoSearch from './TodoSearch/TodoSearch';
import TodoAPI from '../api/TodoAPI';
import uuid from 'node-uuid';
import moment from 'moment';

const todoAPI = new TodoAPI();

class TodoApp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showCompleted: false,
			searchText: '',
			todos: todoAPI.getTodos()
		};
		this.handleAddTodo = this.handleAddTodo.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	componentDidUpdate () {
		todoAPI.setTodos(this.state.todos);
	}

	handleAddTodo (text) {
		this.setState({
			todos: [
				...this.state.todos, 
				{
					id: uuid(),
					text: text,
					completed: false,
					createdAt: moment().unix(),
					completedAt: undefined
				}
			]
		});
	}

	handleSearch (showCompleted, searchText) {
		this.setState({
			showCompleted: showCompleted,
			searchText: searchText.toLowerCase()
		});
	}

	handleToggle (id) {
		var updatedTodos = this.state.todos.map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
				todo.completedAt = todo.completed ? moment().unix() : undefined;
			}
			return todo;
		});

		this.setState({todos: updatedTodos});

	}

	render() {
		var {todos, showCompleted, searchText} = this.state;
		var filteredTodos = todoAPI.filterTodos(todos, showCompleted, searchText);

	    return (
	      <div>
	      	<header className="header">
		      	<h1 className="header__title">Todo App</h1>
	      	</header>
			
			<div className="grid-container">
				<div className="grid-x align-center">
					<div className="cell small-centered small-11 medium-6 large-5">
						<div className="container">
							<TodoSearch onSearch={ this.handleSearch } />
					      	<TodoList todos={ filteredTodos } onToggle={ this.handleToggle } />
					      	<AddTodo onAddTodo={ this.handleAddTodo } />
						</div>
					</div>
				</div>
			</div>
			
	      	
	      </div>
	    );
	  }
}

export default TodoApp;
