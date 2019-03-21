import React, { useState, useEffect, useReducer } from 'react'
// useEffect Test

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { num: state.num + 1 };
    case 'decrement':
      return { num: state.num - 1 };
    default:
      throw new Error();
  }
}
const Btn = (props) => {
  return (
    <>
      <button onClick={() => props.dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => props.dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}
const Test = () => {
  const [count, setCount] = useState(0)
  const [state, dispatch] = useReducer(reducer, {num: 0})

  useEffect(() => counter(), NaN)
  // 组件挂载、更新、卸载时都会执行,可以多次使用,after render.
  // 第二个参数是数组, 组件rerender后数组中的值发生变化是才会执行该effectHook,
  // 如果传的是一个空数组, 则只会在组件第一次mount和unmount的时候执行
  useEffect(() => {
    // 这里可以覆盖componentDidMount和componentDidUpdate
    console.log('effect' + count)
    // return () => {
    // 这里覆盖componentWillUnMount
    // }
  })

  const counter = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <h2>计数结果{count}</h2>
      <button onClick={counter}>click me</button>
      <h2>{state.num}</h2>
      <Btn state={state} dispatch={dispatch}/>
    </div>
  )
}

export default Test
