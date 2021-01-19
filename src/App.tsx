import React, { useCallback, useEffect } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { initFetch } from "./api/postApi";
import PostList from "./components/Posts/PostList";
import UserList from "./components/Users/UserList";
import { getMode } from "./store/selectors";
import { setMode } from "./store/slice";

const App = ({ mode, setModeAction }: PropsFromRedux) => {
  const handleSelect = useCallback(
    (e) => {
      setModeAction(e.target.value);
    },
    [setModeAction]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const meta = initFetch(mode);
    dispatch(meta);
  }, [dispatch, mode]);

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
});

const mapDispatchToProps = {
  setModeAction: setMode,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
