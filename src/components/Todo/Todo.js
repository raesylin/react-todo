import React, { Component } from 'react';
import moment from 'moment';
import './Todo.css';

class Todo extends Component {
	render() {
		const {id, text, completed, createdAt, completedAt} = this.props;
		var todoClassName = completed ? 'todo todo--completed' : 'todo'
		var renderDate = () => {
			var message = 'Created ';
			var timestamp = createdAt;

			if (completed) {
				message = 'Completed ';
				timestamp = completedAt;
			}

			return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
		};

	    return (
	      <div className={todoClassName} onClick={() => {
	      	this.props.onToggle(id);
	      }} >
	      	<div>
		      	<input type="checkbox" checked={completed} className="todo__checkbox" />
	      	</div>
	      	<div>
				<p>{text}</p>
				<p className="todo__subtext">{renderDate()}</p>
	      	</div>
	      	
	      </div>
	    );
	  }
}

export default Todo;
