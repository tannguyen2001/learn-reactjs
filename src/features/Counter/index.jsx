import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrease, increase } from './counterSlice'

function CounterFeature(props) {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.count)
  const handleCreaseClick = () => {
    const action = increase()
    dispatch(action)
  }
  const handleDecreaseClick = () => {
    const action = decrease()
    dispatch(action)
  }
  return (
    <div>
      Counter:{count}
      <br />
      <button onClick={handleCreaseClick}>Increase</button>
      <button onClick={handleDecreaseClick}>Decrease</button>
    </div>
  )
}

export default CounterFeature
