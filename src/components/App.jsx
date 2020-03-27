import React, { Fragment, useState, useEffect } from "react";
import IO from "socket.io-client";

import Test from "./Test";
import User from "./User";

// Create Store
export const HistoryContext = React.createContext({
  history: [],
  addNewMsg: () => {},
  domScroll: () => {},
  width: 0,
  height: 0
});

const { Provider, Consumer } = HistoryContext;

const Socket = IO("localhost:3001");
const App = () => {
  const [history, update] = useState([]);
  Socket.on("message", his => {
    update(his);
  });
  Socket.on("new message", his => {
    update(history.concat([his]));
  });
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <Provider
      value={{
        _width: width,
        _height: height,
        history,
        addNewMsg: ({ sender, msg }, cb) => {
          Socket.emit("chat message", { sender, msg });
          cb();
        }
      }}
    >
      <Test />
      {/* <Consumer>
        {param => <Test width={param._width} height={param._height} />}
      </Consumer> */}
      <Fragment>
        <Consumer>{param => <User {...param} name="B" user="A" />}</Consumer>
        <Consumer>{param => <User {...param} name="A" user="B" />}</Consumer>
      </Fragment>
    </Provider>
  );
};

export default App;
