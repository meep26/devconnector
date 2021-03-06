import axios from 'axios';
import { ADD_POST, GET_POSTS, GET_POST, GET_ERRORS, POST_LOADING, DELETE_POST, CLEAR_ERRORS } from './types';

// Posts loading
export const setPostLoading = () => {
   return {
      type: POST_LOADING
   }
}

// Clear errors
export const clearErrors = () => {
   return {
      type: CLEAR_ERRORS
   }
};

// Get posts
export const getPosts = () => async dispatch => {
   try {
      dispatch(setPostLoading());
      const res = await axios.get('/api/posts');
      dispatch({
         type: GET_POSTS,
         payload: res.data
      })
   }
   catch (err) {
      dispatch({ type: GET_POSTS, payload: null });
   }
};

// Get single post
export const getPost = id => async dispatch => {
   try {
      dispatch(setPostLoading());
      const res = await axios.get(`/api/posts/${id}`);
      dispatch({
         type: GET_POST,
         payload: res.data
      })
   }
   catch (err) {
      dispatch({ type: GET_POST, payload: null });
   }
};

// Add post
export const addPost = postData => async dispatch => {
   try {
      dispatch(clearErrors());
      const res = await axios.post('/api/posts', postData);
      dispatch({
         type: ADD_POST,
         payload: res.data
      })
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};

// Delete post
export const deletePost = id => async dispatch => {
   try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({
         type: DELETE_POST,
         payload: id
      })
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};

// Add like
export const addLike = id => async dispatch => {
   try {
      await axios.post(`/api/posts/like/${id}`);
      dispatch(getPosts());
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};

// Remove like
export const removeLike = id => async dispatch => {
   try {
      await axios.post(`/api/posts/unlike/${id}`);
      dispatch(getPosts());
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};

// Add Comment
export const addComment = (postId, commentData) => async dispatch => {
   try {
      dispatch(clearErrors());
      const res = await axios.post(`/api/posts/comment/${postId}`, commentData);
      dispatch({
         type: GET_POST,
         payload: res.data
      })
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
   try {
      const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      dispatch({
         type: GET_POST,
         payload: res.data
      })
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};