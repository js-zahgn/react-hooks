import React from "react";
import EventBus from "../eventBus";

const timeFormat = time => {
  const date = new Date(time);
  const _num = n => (n < 10 ? `0${n}` : n);
  let month = date.getMonth() + 1;
  return `${_num(month)}/${_num(date.getDate())}
    ${_num(date.getHours())}:${_num(date.getMinutes())}`;
};

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ref: `chatBox${props.name}`,
      msg: ""
    };
    this._changeMsg = this._changeMsg.bind(this);
    this._updataMsg = this._updataMsg.bind(this);
  }

  componentDidUpdate(prevProps) {
    const current = this.refs[this.state.ref];
    current.scrollTo(0, current.scrollHeight);
  }
  _changeMsg(msg) {
    this.setState({ msg });
  }
  _updataMsg() {
    this.props.addNewMsg(
      { sender: this.props.name, msg: this.state.msg },
      () => {
        this._changeMsg("");
      }
    );
  }
  componentDidMount() {
    EventBus.$on("ccc", (param) => {
      console.log(param)
    })
  }
  eventTest() {
    EventBus.$emit("ccc", {bbb: 132})
  }
  render() {
    const { user, name, history } = this.props;
    return (
      <div className="container">
        <div className="title">
          <div>
            <i className="icon icon-avatar" onClick={this.eventTest.bind(this)}/>
            <b style={{ marginLeft: "10px" }}>{user}</b>
          </div>
          <div className="right">
            <span>
              <i className="icon icon-bar" />
            </span>
            <span>
              <i className="icon icon-frame" />
            </span>
            <span>
              <i className="icon icon-close" />
            </span>
          </div>
        </div>
        <div className="avatar">
          <span className="icon icon-avatar" />
          <span>{name}</span>
          {/* <span>{typing ? "对方正在偷人" : ""}</span> */}
        </div>
        <div className="content" ref={this.state.ref}>
          {history.map((his, index) => (
            <section
              key={`historyKey->${index}`}
              className={his.sender === name ? "self" : ""}
            >
              <span className="icon icon-avatar" />
              <div className="msgContent">
                <span className="arrow" />
                <p>{timeFormat(his.time)}</p>
                <div>{his.msg}</div>
              </div>
            </section>
          ))}
        </div>
        <div className="sendBar">
          <p>
            <textarea
              value={this.state.msg}
              onChange={e => {
                e.persist();
                this._changeMsg(e.target.value);
              }}
            />
          </p>
          <button onClick={() => this._updataMsg()}>
            <i className="icon icon-paper" />
          </button>
        </div>
      </div>
    );
  }
}

export default User;
