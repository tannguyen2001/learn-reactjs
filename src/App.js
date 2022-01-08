import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import './App.css';

function App() {
  return (
    <div className="App">
      Header
      <p><NavLink to="/todos" activeClassName='active-menu' >Đây là đường dẫn vào todos</NavLink></p>
      <p><NavLink to="/albums" activeClassName='active' >Đây là đường dẫn vào albums</NavLink></p>
      <Switch>
        <Redirect from='/home' to='/' exact />
        <Route path="/todo-list" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
      </Switch>
      Footer
    </div>
  );
}

export default App;
