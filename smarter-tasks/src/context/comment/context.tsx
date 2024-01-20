import React, { createContext, useContext, useReducer } from "react";
import { commentReducer, initialStateComment } from "./reducer";
import { CommentListState, CommentsDispatch } from "./types";
const CommentsStateContext = createContext<CommentListState>(initialStateComment);
const CommentsDispatchContext = createContext<CommentsDispatch>(() => {});
export const CommentProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(commentReducer, initialStateComment);
  return (
    <CommentsStateContext.Provider value={state}>
      <CommentsDispatchContext.Provider value={dispatch}>
        {children}
      </CommentsDispatchContext.Provider>
    </CommentsStateContext.Provider>
  );
};

export const useCommentsState = () => useContext(CommentsStateContext);
export const useCommentsDispatch = () => useContext(CommentsDispatchContext);