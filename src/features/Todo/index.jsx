import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

TodoFeature.propTypes = {

};

function TodoFeature(props) {
      const match = useRouteMatch()
      return (
            <div>
                  <Switch>
                        <Route path={match.url} component={ListPage} exact />
                        <Route path={`${match.url}/:todoId`} component={DetailPage} />
                  </Switch>
            </div>
      );
}

export default TodoFeature;