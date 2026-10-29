import React from 'react'
import TaskForm from '../components/TaskForm'
import { useParams } from 'react-router-dom';

const EditTask = () => {
    const { id } = useParams();
  return (
    <div>
      <TaskForm taskId={id}/>
    </div>
  )
}

export default EditTask
