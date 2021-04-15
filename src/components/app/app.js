import React, { useState, useEffect, useCallback, useMemo } from "react";

const App = () => {
  const [value, setValue] = useState(1);
  const [isContentVisible, setIsContentVisible] = useState(true);
  // const [isNotificationvisible, setIsNotificationVisible] = useState(true);

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => prev - 1);
  const reset = () => setValue(1);
  const getVisible = () => setIsContentVisible(!isContentVisible);

  // const hideNotification = () => {
  //   console.log("notification is hidden");
  //   setIsNotificationVisible(false);
  // };

  // useEffect(() => {
  //   const timeout = setTimeout(hideNotification, 5000);
  //   return () => clearTimeout(timeout);
  // }, []);

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
      <Notification />
      {/* {isNotificationvisible ? <Notification /> : null} */}
    </>
  );

  const planets = <PlanetInfo id={value} />;

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-6">
          {contentVisibilityButton}
          {isContentVisible ? content : null}
        </div>
        <div className="col-md-6">{planets}</div>
      </div>
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

const getPlanet = (id) => {
  const url = `https://swapi.dev/api/planets/${id}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

const useRequest = (request) => {
  const initialState = useMemo(
    () => ({
      data: null,
      loading: true,
      error: null,
    }),
    []
  );

  const [dataState, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState);
    let cancelled = false;
    request()
      .then(
        (data) =>
          !cancelled &&
          setDataState({
            data,
            loading: false,
            error: null,
          })
      )
      .catch(
        (error) =>
          !cancelled &&
          setDataState({
            data: null,
            loading: false,
            error,
          })
      );
    return () => (cancelled = true);
  }, [request, initialState]);

  return dataState;
};

const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id]);
  return useRequest(request);
};

const PlanetInfo = ({ id }) => {
  const { data, loading, error } = usePlanetInfo(id);

  if (error) return <div>Oops!</div>;
  if (loading) return <div>loading...</div>;

  return (
    <div>
      Planet #{id} is {data?.name ? data.name : "<none>"}
    </div>
  );
};

export default App;
