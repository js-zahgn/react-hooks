import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
} from 'react'
import IO from 'socket.io-client'

import Test from './Test'

// Create Store
const HistoryContext = React.createContext({
  history: [],
  addNewMsg: () => {}
})

// Utils
const timeFormat = time => {
  const date = new Date(time)
  const _num = n => (n < 10 ? `0${n}` : n)
  let month = date.getMonth() + 1
  return `${_num(month)}/${_num(date.getDate())}
  ${_num(date.getHours())}:${_num(date.getMinutes())}`
}

const { Provider, Consumer } = HistoryContext
let typing = false
const User = props => {
  const ref = useRef(null)
  const [msg, changeMsg] = useState('')
  const { user, name, history, addNewMsg } = props
  useEffect(() => {
    const { current } = ref
    setTimeout(() => current.scrollTo(0, current.scrollHeight), 100)
  })
  return (
    <div className='container'>
      <div className='title'>
        <div>
          <i className='icon icon-avatar' />
          <b style={{ marginLeft: '10px' }}>{user}</b>
        </div>
        <div className='right'>
          <span>
            <i className='icon icon-bar' />
          </span>
          <span>
            <i className='icon icon-frame' />
          </span>
          <span>
            <i className='icon icon-close' />
          </span>
        </div>
      </div>
      <div className='avatar'>
        <span className='icon icon-avatar' />
        <span>{name}</span>
        <span>{typing ? '对方正在偷人' : ''}</span>
      </div>
      <div className='content' ref={ref}>
        {history.map((his, index) => (
          <section
            key={`historyKey->${index}`}
            className={his.sender === name ? 'self' : ''}
          >
            <span className='icon icon-avatar' />
            <div className='msgContent'>
              <span className='arrow' />
              <p>{timeFormat(his.time)}</p>
              <div>{his.msg}</div>
            </div>
          </section>
        ))}
      </div>
      <div className='sendBar'>
        <p>
          <textarea
            value={msg}
            onChange={e => {
              e.persist()
              changeMsg(e.target.value)
            }}
          />
        </p>
        <button
          onClick={() => addNewMsg({ sender: name, msg }, () => changeMsg(''))}
        >
          <i className='icon icon-paper' />
        </button>
      </div>
    </div>
  )
}

const Socket = IO('localhost:3001')
const App = () => {
  const [history, update] = useState([])
  Socket.on('message', his => {
    update(his)
  })
  Socket.on('new message', his => {
    update(history.concat([his]))
  })
  return (
    <Provider
      value={{
        history,
        addNewMsg: ({ sender, msg }, cb) => {
          Socket.emit('chat message', { sender, msg })
          cb()
        }
      }}
    >
      <Test/>
      <Fragment>
        <Consumer>{param => <User {...param} name='B' user='A' />}</Consumer>
        <Consumer>{param => <User {...param} name='A' user='B' />}</Consumer>
      </Fragment>
    </Provider>
  )
}

export default App
