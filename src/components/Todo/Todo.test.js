import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Todo />, div);
});

it('should call onToggle prop with id on click', () => {
	var todoData = {
		id: 199,
		text: 'Todo.test.js',
		completed: true
	};

	var spy = expect.createSpy.createSpy();
	var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy}/> );
	
	var $el = $(ReactDOM.findDOMNode(todo));
	TestUtils.Simulate.click($el[0]);

	expect(spy).toHaveBeenCalledWith(199);
});
