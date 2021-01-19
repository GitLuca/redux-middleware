import React, { useCallback, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { initFetch } from "./api/postApi";
import PostList from "./components/Posts/PostList";
import UserList from "./components/Users/UserList";
import { getLoading, getMode } from "./store/selectors";
import { setMode } from "./store/slice";

const App = ({ mode, setModeAction, loading, fetchAction }: PropsFromRedux) => {
  const handleSelect = useCallback(
    (e) => {
      setModeAction(e.target.value);
    },
    [setModeAction]
  );

  useEffect(() => {
    fetchAction(mode)
  }, [fetchAction, mode]);
  
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="App">
      <select value={mode} onChange={handleSelect}>
        <option key="posts" value="posts">
          Posts
        </option>
        <option key="users" value="users">
          Users
        </option>
      </select>
      {mode === "posts" ? <PostList /> : <UserList />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  mode: getMode(state),
  loading: getLoading(state),
});

const mapDispatchToProps = {
  setModeAction: setMode,
  fetchAction: initFetch
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
