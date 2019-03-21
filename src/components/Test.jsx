import React, { Fragment, useState, useEffect, useRef } from 'react'
// useEffect Test
const Test = () => {
  const [count, setCount] = useState(0)

  useEffect(() => counter() , NaN)

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
    </div>
  )
}

export default Test;