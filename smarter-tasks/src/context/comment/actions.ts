import { API_ENDPOINT } from "../../config/constants";
import {
  CommentListAvailableAction,
  
  CommentsDispatch,
} from "./types";
import { CommentDetailsPayload } from "./types";



export const addComment = async (
  dispatch: CommentsDispatch,
  projectID: string,
  taskID: string,
  comment: CommentDetailsPayload
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: CommentListAvailableAction.CREATE_COMMENT_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create a comment for the task");
    }
    const data = await response.json();

    dispatch({
      type: CommentListAvailableAction.CREATE_COMMENT_SUCCESS,
      payload: data,
    });
    console.log( data);
    fetchComment(dispatch, projectID, taskID);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: CommentListAvailableAction.CREATE_COMMENT_FAILURE,
      payload: "Unable to create a comment for the task",
    });
  }
};


export const fetchComment = async (
  dispatch: CommentsDispatch,
  projectID: string,
  taskID: string
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: CommentListAvailableAction.FETCH_COMMENT_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the comments");
    }

    const data = await response.json();
    
    dispatch({
      type: CommentListAvailableAction.FETCH_COMMENT_SUCCESS,
      payload: data,
    });
    
    console.log("API response data:", data);
  } catch (error) {
    console.error("Operation is failed:", error);
    dispatch({
      type: CommentListAvailableAction.FETCH_COMMENT_FAILURE,
      payload: "Unable to load the comments",
    });

    throw error; 
  }
};