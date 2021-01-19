import React, { useCallback } from "react";
import { connect, ConnectedProps } from "react-redux";
import { deletePostApi } from "../../api/postApi";
import { Post } from "../../types";

export type PostProps = PropsFromRedux & {
  post: Post;
};

export const PostDisplay = ({ post, deletePost }: PostProps) => {
  const handleDelete = useCallback(() => {
    deletePost(post.id);
  }, [deletePost, post.id]);
  
  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  deletePost: deletePostApi,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PostDisplay);
