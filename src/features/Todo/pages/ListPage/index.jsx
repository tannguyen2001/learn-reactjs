import React, { useState } from 'react';
import TodoList from '../../components/TodoList';

ListPage.propTypes = {

};

function ListPage(props) {

      const initTodoList = [
            {
                  id: 1,
                  title: 'Eat',
                  status: false
            },
            {
                  id: 2,
                  title: 'Sleep',
                  status: true
            },
            {
                  id: 3,
                  title: 'Code',
                  status: false
            },


      ]
      const [todoList, setTodoList] = useState(initTodoList)
      const [filteredStatus, setFilteredStatus] = useState('all')
      const handleTodoClick = (todo, index) => {
            setTodoList(() => {
                  const newTodoList = [...todoList]
                  newTodoList[index] = {
                        ...newTodoList[index],
                        status: !newTodoList[index].status
                  }
                  return newTodoList
            })
      }

      const showAll = () => {
            setFilteredStatus('all')
      }

      const showChuaGach = () => {
            setFilteredStatus(false)
      }
      const showDaGach = () => {
            setFilteredStatus(true)
      }
      const renderedTodoList = todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status)

      return (
            <div>
                  <h3>Todo List</h3>
                  <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
                  <div>
                        <button onClick={showAll} >Show hết</button>
                        <button onClick={showChuaGach} >Show chưa gạch</button>
                        <button onClick={showDaGach} >Show đã gạch</button>
                  </div>
            </div>
      );
}

export default ListPage;