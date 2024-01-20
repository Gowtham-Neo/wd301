export interface CommentListState {
  data: CommentDetails[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type CommentDetailsPayload = {
  description: string;
};

export type CommentDetails = {
  id: number;
  description: string;
  task_id: number;
  owner: number;
  updatedAt: Date;
  createdAt: Date;
  User:{
    id:number;
    name:string;
    email:string;
  };
};

export enum CommentListAvailableAction {
  FETCH_COMMENT_REQUEST = "FETCH_COMMENT_REQUEST",
  FETCH_COMMENT_SUCCESS = "FETCH_COMMENT_SUCCESS",
  FETCH_COMMENT_FAILURE = "FETCH_COMMENT_FAILURE",

  CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST",
  CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS",
  CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE",
}

export type CommentActions =
  | { type: CommentListAvailableAction.FETCH_COMMENT_REQUEST }
  | {
      type: CommentListAvailableAction.FETCH_COMMENT_SUCCESS;
      payload: CommentDetails[];
    }
  | { type: CommentListAvailableAction.FETCH_COMMENT_FAILURE; payload: string }
  | { type: CommentListAvailableAction.CREATE_COMMENT_REQUEST }
  | {
      type: CommentListAvailableAction.CREATE_COMMENT_SUCCESS;
      payload: CommentDetails;
    }
  | {
      type: CommentListAvailableAction.CREATE_COMMENT_FAILURE;
      payload: string;
    };

export type CommentsDispatch = React.Dispatch<CommentActions>;
