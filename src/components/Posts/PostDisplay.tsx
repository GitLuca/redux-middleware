import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deletePostApi } from '../../api/postApi'
import { Post } from '../../types'

export type PostProps = {
    post: Post
}

export const PostDisplay = ({post}: PostProps) => {
    const dispatch = useDispatch()

    const handleDelete = useCallback(
        () => {
            dispatch(deletePostApi(post.id));
        },
        [dispatch, post.id],
    )
    return (
        <div>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}

export default PostDisplay