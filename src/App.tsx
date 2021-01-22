import React, { useCallback, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchPosts, fetchUsers, initFetch } from "./api/postApi";
import PostList from "./components/Posts/PostList";
import UserList from "./components/Users/UserList";
import { getLoading, getMode } from "./store/selectors";
import { setMode } from "./store/slice";

const App = ({
  mode,
  setModeAction,
  loading,
  fetchPostsAction,
  fetchUsersAction,
}: PropsFromRedux) => {
  const handleSelect = useCallback(
    (e) => {
      setModeAction(e.target.value);
    },
    [setModeAction]
  );

  useEffect(() => {
    if (mode === "posts") {
      fetchPostsAction();
    } else {
      fetchUsersAction();
    }
    // fetchAction()
  }, [mode]);

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
  fetchPostsAction: fetchPosts,
  fetchUsersAction: fetchUsers,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
