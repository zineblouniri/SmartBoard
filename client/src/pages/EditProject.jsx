import React from 'react'
import ProjectForm from '../components/projectForm'
import { useParams } from 'react-router-dom'

const EditProject = () => {
    const {id} = useParams()
  return (
    <div>
      <ProjectForm id={id}/>
    </div>
  )
}

export default EditProject
