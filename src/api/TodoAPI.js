import $ from 'jquery';
// window.jQuery = window.$ = $;

class TodoAPI {
	setTodos (todos) {
		if ($.isArray(todos)) {
			localStorage.setItem('todos', JSON.stringify(todos));  // convert to string and store
			return todos;
		}
	}

	getTodos() {
		var stringTodos = localStorage.getItem('todos');
		var todos = [];

		try {
			todos = JSON.parse(stringTodos);
		} catch (e) {
			// parse failed: do nothing, keep array empty
		}

		return ($.isArray(todos)) ? todos : [];

	}

	filterTodos (todos, showCompleted, searchText) {
		var filteredTodos = todos;

		// Filter by showCompleted
		filteredTodos = filteredTodos.filter((todo) => {
			return !todo.completed || showCompleted;
		});
		// Filter by searchText
		filteredTodos = filteredTodos.filter((todo) => {
			var text = todo.text.toLowerCase();
			return searchText.length === 0 || text.indexOf(searchText) > -1;
			// if (!searchText.length) {
			// 	return true;
			// } else {
			// 	return todo.text.toLowerCase().indexOf(searchText);
			// }
		});
		// Sort with non-completed first
		filteredTodos.sort((a, b) => {
			if (!a.completed && b.completed) {
				return -1;  // a comes before b
			} else if (a.completed && !b.completed) {
				return 1;   // b comes before a
			} else {
				return 0;   // a.completed === b.completed, no need to re-sort
			}
		});


		return filteredTodos;
	}
}
export default TodoAPI;