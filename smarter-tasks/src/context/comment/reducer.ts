import { Reducer } from "react";
import {
  CommentListAvailableAction,
  CommentListState,
  CommentActions,
  initialStateComment
} from "./types";


export const commentReducer: Reducer<CommentListState, CommentActions> = (
  state = initialStateComment,
  action
) => {
  console.log(`HI this Type${action.type}`);
  switch (action.type) {
    case CommentListAvailableAction.FETCH_COMMENT_REQUEST:
      return { ...state, isLoading: true };
    case CommentListAvailableAction.FETCH_COMMENT_SUCCESS:
      console.log("Existing state:", state);
      console.log("New comments payload:", action.payload);
      return {
        ...state,
        isLoading: false,
        data:  action.payload ,
      };
    case CommentListAvailableAction.FETCH_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case CommentListAvailableAction.CREATE_COMMENT_REQUEST:
      console.log(`HI this Type`);

      return { ...state, isLoading: true };
    case CommentListAvailableAction.CREATE_COMMENT_SUCCESS:
      console.log(`HI this Type`);

      return {
        ...state,
        isLoading: false,
        data: [action.payload, ...state.data],
      };
    case CommentListAvailableAction.CREATE_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};