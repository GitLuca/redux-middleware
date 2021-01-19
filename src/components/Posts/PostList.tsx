import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { getPosts } from "../../store/selectors";
import { RootState } from "../../store/store";
import PostDisplay from "./PostDisplay";

export type PostListProps = PropsFromRedux;

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <PostDisplay post={post} key={post.id} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  posts: getPosts(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PostList);
