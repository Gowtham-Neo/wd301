import './TaskCard.css'

const TaskCard = (props) => {
  console.log(props)
  return (
    <div className='TaskItem'>
      <h2 className="text-xl font-bold">{props.title}</h2>
      <p>{props.dueDate || props.completedAtDate}</p>
      <p>Assignee: {props.assigneeName}</p>
    </div>
  )
}

export default TaskCard