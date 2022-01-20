import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import ListPage from './pages/ListPage'
import NotFound from '../../components/NotFound'

TodoFeature.propTypes = {}

function TodoFeature(props) {
  const match = useRouteMatch()
  return (
    <div>
      <Switch>
        <Route path={match.url} component={ListPage} exact />
        <Route path={`${match.url}/:todoId`} component={DetailPage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default TodoFeature
