import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TodoApp />, div);
});

it('should add todo to the todos state on the handleAddTodo', () => {
	var todoText = 'test text';
	var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

	todoApp.setState({todos: []});
	todoApp.handleAddTodo(todoText);

	expect(todoApp.state.todos[0].text).toBe(todoText);
	
});

it('should toggle completed value when handleToggle called', () => {
	var todoData = {
		id: 11,
		text: 'Test features',
		completed: false
	};

	var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
	todoApp.setState({todos: [todoData]});
	// check that todos first item has completed value of false
	expect(todoApp.state.todos[0].completed).toBe(false);
	// call handleToggle with id = 11
	todoApp.handleToggle(11);
	// verify that value changed
	expect(todoApp.state.todos[0].completed).toBe(true);
});