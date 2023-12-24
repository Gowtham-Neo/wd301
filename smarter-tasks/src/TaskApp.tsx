import React from "react";
import { TaskItem } from "./types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface TaskAppProp { }
interface TaskAppState {
    tasks: TaskItem[];
}
class TaskApp extends React.Component<TaskAppProp, TaskAppState> {
    constructor(props: TaskAppProp) {
        super(props);
        this.state = {
            tasks: [],
        };
    }
    addTask = (task: TaskItem) => {
        this.setState((state) => {
            return {
                tasks: [...state.tasks, task],
            };
        });
    };

    render() {
        return (
            <div className="container max-w-4xl py-10 mx-auto">
                <h1 className="mb-2 text-3xl font-bold text-slate-700">
                    Smarter Tasks
                </h1>
                <h1 className="mb-6 text-lg text-slate-600">
                    <span className="font-bold">Project: </span>
                    Graduation Final Year Project (Revamp college website)
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-200 rounded-xl">
                        <h1 className="mb-2 text-xl font-bold text-center text-slate-500">
                            Pending
                        </h1>
                        <TaskForm addTask={this.addTask} />
                        <TaskList tasks={this.state.tasks} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskApp;