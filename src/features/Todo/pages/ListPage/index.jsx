import queryString from 'query-string'
import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import TodoForm from '../../components/TodoForm'
import TodoList from '../../components/TodoList'

ListPage.propTypes = {}

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ]
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()
  const [todoList, setTodoList] = useState(initTodoList)
  const [filteredStatus, setFilteredStatus] = useState(() => {
    const param = queryString.parse(location.search)
    return param.status || 'all'
  })

  useEffect(() => {
    const param = queryString.parse(location.search)
    setFilteredStatus(param.status || 'all')
  }, [location.search])

  const handleTodoClick = (todo, index) => {
    setTodoList(() => {
      const newTodoList = [...todoList]
      newTodoList[index] = {
        ...newTodoList[index],
        status: newTodoList[index].status === 'new' ? 'completed' : 'new',
      }
      return newTodoList
    })
  }

  const renderedTodoList = useMemo(() => {
    return todoList.filter(
      (todo) => filteredStatus === 'all' || filteredStatus === todo.status
    )
  }, [todoList, filteredStatus])

  const showAll = () => {
    const queryPrams = { status: 'all' }
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryPrams),
    })
  }

  const showChuaGach = () => {
    const queryPrams = { status: 'new' }
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryPrams),
    })
  }

  const showDaGach = () => {
    const queryPrams = { status: 'completed' }
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryPrams),
    })
  }

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    }

    setTodoList([...todoList, newTodo])
  }

  return (
    <div>
      <h3>What to do</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <h3>Todo List</h3>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
      <div>
        <button onClick={showAll}>Show hết</button>
        <button onClick={showChuaGach}>News</button>
        <button onClick={showDaGach}>Completed</button>
      </div>
    </div>
  )
}

export default ListPage
