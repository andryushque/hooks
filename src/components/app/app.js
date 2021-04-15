import React, { useState, useEffect } from "react";

const App = () => {
  const [value, setValue] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isNotificationvisible, setIsNotificationVisible] = useState(true);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => prev - 1);
  const reset = () => setValue(0);
  const getVisible = () => setIsContentVisible(!isContentVisible);
  const hideNotification = () => {
    console.log("notification is hidden");
    setIsNotificationVisible(false);
  };

  useEffect(() => {
    const timeout = setTimeout(hideNotification, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const contentVisibilityButton = (
    <div>
      <button
        type="button"
        className="btn btn-primary mb-4"
        onClick={getVisible}
      >
        Toggle visibility
      </button>
    </div>
  );

  const content = (
    <>
      <div className="btn-group mb-2" role="group">
        <button type="button" className="btn btn-secondary" onClick={increment}>
          +
        </button>
        <button type="button" className="btn btn-secondary" onClick={decrement}>
          -
        </button>
        <button type="button" className="btn btn-warning" onClick={reset}>
          reset
        </button>
      </div>
      <Counter value={value} />
      {isNotificationvisible ? <Notification /> : null}
    </>
  );

  return (
    <div className="container-fluid p-4">
      {contentVisibilityButton}
      {isContentVisible ? content : null}
    </div>
  );
};

const Counter = ({ value }) => {
  useEffect(() => {
    console.log("mount");
    return () => console.log("unmount");
  }, []);

  useEffect(() => console.log("update"));

  // useEffect(() => () => console.log("unmount"), []);

  return <div>Counter: {value}</div>;
};

const Notification = () => {
  return (
    <div className="alert alert-primary" role="alert">
      Wow!
    </div>
  );
};

export default App;
