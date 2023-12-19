import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TaskCard from './TaskCard'

function App() {
  return (
    <div className='m-10 mt-10 ml-20 mr-20'>
      <h1 className='mb-4 text-3xl font-bold'>Smarter Tasks</h1>
      <p className='mb-6'><strong>Project: </strong>Graduation Final Year project (Revamp College Website)</p>
      <div className='flex gap-8'>
        <div className='flex-1 p-4 border border-gray-300 rounded-2xl h-96'>
          <h2 className='mb-4 text-xl font-bold text-center '>Pending</h2>
          <TaskCard title="Todo Application" dueDate="Due on: 10th April" assigneeName="Rohit S" />
          <TaskCard title="Capstone Project" dueDate="Due on: 22nd March" assigneeName="Rohit M" />
          <div className='TaskItem'>
            <h1>+ New Task</h1>
          </div>  
        </div>
        <div className='flex-1 p-4 border border-gray-300 rounded-2xl h-96'>
          <h2 className='mb-4 text-xl font-bold text-center '>Done</h2>
          <TaskCard title="House Rent" completedAtDate="Completed on: 10th April" assigneeName="Rohit M" />
          <TaskCard title="Electricity Bill" completedAtDate="Completed on: 20th April" assigneeName="Ajay S" />
        </div>
      </div>
    </div>
  );
}



export default App
