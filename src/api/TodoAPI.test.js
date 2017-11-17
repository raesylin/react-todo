import expect from 'expect';

import TodoAPI from './TodoAPI';
var todoAPI = new TodoAPI();

describe('TodoAPI', () => {
	beforeEach(() => {
		localStorage.removeItem('todos');
	});

	it('should exist', () => {
		expect(todoAPI).toExist();
	} );

	describe('setTodos', () => {
		it('should set valid todos array', () => {
			var todos = [{
				id: 3,
				text: 'Testing set todos',
				completed: false
			}];
			todoAPI.setTodos(todos);
			var actualTodos = JSON.parse(localStorage.getItem('todos'));
			expect(actualTodos).toEqual(todos);  // not toBe because here is checking arrays (check every element)
		});

		it('should not set invalid todos array', () => {
			var badTodos = {a: 'b'};
			todoAPI.setTodos(badTodos);
			expect(localStorage.getItem('todos')).toBe(null);
		});
	});

	describe('getTodos', () => {
		it('should return empty array for bad localStorage data', () => {
			var actualTodos = todoAPI.getTodos();
			expect(actualTodos).toEqual([]);
		});

		it('should return todo if valid array in localStorage', () => {
			var todos = [{
				id: 23,
				text: 'test all files',
				completed: false
			}];

			localStorage.setItem('todos', JSON.stringify(todos));
			var actualTodos = todoAPI.getTodos();

			expect(actualTodos).toEqual(todos);
		});
	});

	describe('filterTodos', () => {
		var todos = [{
			id: 2,
			text: 'Hello 1',
			completed: true
		},{
			id: 10,
			text: 'Hello 2',
			completed: false
		},{
			id: 15,
			text: 'Hello 3',
			completed: true
		}];

		it('should return all items if showCompleted is true', () => {
			var filteredTodos = todoAPI.filterTodos(todos, true, '');
			expect(filteredTodos.length).toBe(3);
		} );

		it('should return only uncompleted todos if showCompleted is false', () => {
			var filteredTodos = todoAPI.filterTodos(todos, false, '');
			expect(filteredTodos.length).toBe(1);
		});

		it('should sort by completed status', () => {
			var filteredTodos = todoAPI.filterTodos(todos, true, '');
			expect(filteredTodos[0].completed).toBe(false);
		});
	});
});