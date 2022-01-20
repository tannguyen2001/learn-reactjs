import Header from 'components/Header'
import ProductFeature from 'features/Product'
import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import productsApi from './api/productsApi'
import './App.css'
import AlbumFeature from './features/Album'
import CounterFeature from './features/Counter'
import TodoFeature from './features/Todo'

function App() {
  useEffect(() => {
    const fetechProducts = async () => {
      const params = {
        _limit: 10,
      }

      const productList = await productsApi.getAll(params)
    }
    fetechProducts()
  }, [])

  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />
      </Switch>
    </div>
  )
}

export default App
