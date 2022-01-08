import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames'
import './styles.scss'

TodoList.propTypes = {
      todoList: PropTypes.array,
      onTodoClick: PropTypes.func
};

TodoList.defaultProps = {
      todoList: [],
      onTodoClick: null,
}

function TodoList({ todoList, onTodoClick }) {
      const handleTodoClick = (todo, index) => {
            if (!onTodoClick) return;
            onTodoClick(todo, index)
      }
      return (
            <ul className='todo-list'>
                  {
                        todoList.map((todo, index) => <li className={classname({
                              'todo-item': true,
                              completed: todo.status
                        })
                        } key={todo.id}
                              onClick={() => { handleTodoClick(todo, index) }}
                        >{todo.title}</li>)
                  }
            </ul>
      );
}

export default TodoList;