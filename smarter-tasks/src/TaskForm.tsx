import React from "react";
import { TaskItem } from "./types";

interface TaskFormProps {
    addTask: (task: TaskItem) => void;
}
interface TaskFormState {
    title: string;
    duedate: string;
    description: string
}
class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
    constructor(props: TaskFormProps) {
        super(props);
        this.state = {
            title: "",
            duedate: "",
            description: "",
        }
    }
    addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
        if (this.state.title.trim() === '' || this.state.duedate.trim() === '') {
            alert('Title and duedate cannot be empty');
            return;
        }
        event.preventDefault();
        const newTask = {
            title: this.state.title,
            duedate: this.state.duedate,
            description: this.state.description,
        };

        this.props.addTask(newTask);
        this.setState({
            title: "",
            duedate: "",
            description: ""
        });
    };

    titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        console.log(`${event.target.value}`);
        this.setState({ title: event.target.value });
    };
    duedateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        console.log(`${event.target.value}`);
        this.setState({ duedate: event.target.value });
    };
    descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        console.log(`${event.target.value}`);
        this.setState({ description: event.target.value });
    };
    inputRef = React.createRef<HTMLInputElement>();
    render() {
        return (
            <form onSubmit={this.addTask}>
                <div>
                    <label className="mr-3 text-xl">Todos</label>
                    <input type="text" className="border" ref={this.inputRef} value={this.state.title} onChange={this.titleChanged} id="todoTitle" />
                </div>
                <div>
                    <label className="mr-3 text-xl">Due Date</label>
                    <input type="date" className="border" ref={this.inputRef} value={this.state.duedate} onChange={this.duedateChanged} id="todoDueDate" />
                </div>
                <div>
                    <label className="mr-3 text-xl">Description</label>
                    <input type="text" className="border" ref={this.inputRef} value={this.state.description} onChange={this.descriptionChanged} id="todoDescription" />
                </div>
                <button type="submit" className="p-1 m-4 bg-green-600 decoration-white" id="addTaskButton">Add item</button>
            </form>
        )
    }
}
export default TaskForm;