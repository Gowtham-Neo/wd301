import React from "react";
import "./TaskCard.css";
import { TaskItem } from "./types";


interface TaskProp {
    title: string;
    duedate: string;
    description: string
    task:TaskItem
}

class Task extends React.Component<TaskProp> {
    render() {
        return (
            <div className="TaskItem">
                <h2 className="my-1 text-base font-bold">{this.props.title}</h2>
                <p className="text-sm text-slate-500">
                    Due Date:<span className="my-1 ml-2 font-bold te-xt-base">{this.props.duedate}</span>
                </p>
                <p className="text-sm text-slate-500">
                    Description:  <span className="my-1 ml-2 font-bold tl-ext-base">{this.props.description}</span>
                </p>
            </div>
        );
    }
}

export default Task;