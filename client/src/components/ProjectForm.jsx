import {  useEffect, useState } from 'react'
import {  Folder, Save,
  Rocket,
  Code,
  Globe,
  ChartLine,
  Users } from 'lucide-react'
  import {toast} from 'sonner'

import { createProject, getProject, updateProject } from '../api/projectApi'
import { useNavigate } from 'react-router-dom'

const ProjectForm = ({id}) => {
  
    const [formData , setFormData] = useState({
    name :  '',
    description : '',
    icon : 'folder'
  })
  
  const icons = [
    {name :'folder' ,component : Folder},
    {name :'rocket' ,component : Rocket},
    {name :'code' ,component : Code},
    {name :'globe' ,component : Globe},
    {name :'chart' ,component : ChartLine},
    {name :'users' ,component : Users},
  ]

  const navigate = useNavigate()

 useEffect(() => {
  if (id) {
    const fetchProject = async () => {
      try {
        const project = await getProject(id)
        setFormData(project)
      } catch (error) {
        console.log(error)
        toast.error("Failed to load project")
      }
    }

    fetchProject()
  }
}, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    try {
      await createProject(formData)
      setFormData({name : '',description : '',icon : "folder"})
      toast.success("Project created successfully")
    } catch (error) {
      console.log(error);
      toast.error("Failed to create project")
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      await updateProject({id , ...formData})
      navigate("/projects")
      toast.success("Project edited successfully")
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit project")
    }
  }
  return (
    <div className=''>
      <form onSubmit={id? handleEdit :handleSubmit} >
          <div className='flex flex-col items-start pt-7 px-6'>
            <p className='text-gray-800 font-semibold mb-1'>Project Name </p>
            <p className='text-gray-500 text-sm mb-2'>Choose a clear and descriptive name for your project</p>
            <input value={formData.name} onChange={(e) => setFormData({...formData,name :e.target.value})} type="text" placeholder='e.g. Smartboard Website' className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 outline-none w-full" />
          </div>
          <div className='flex flex-col items-start pt-5  px-6'>
            <p className='text-gray-800 font-semibold mb-1'>Description</p>
            <p className='text-gray-500 text-sm mb-2'>Describe your project goals, features or any important details.</p>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData,description :e.target.value})} placeholder='e.g. This project will help us manage tasks, collaborate with team members, and track progress easily.' className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 outline-none w-full h-25" />
          </div>
          <div className='flex flex-col items-start pt-5 px-6'>
            <p className='text-gray-800 font-semibold mb-1'>Project Icon</p>
            <p className='text-gray-500 text-sm mb-2'>Choose an icon that represents your project</p>
            <div className='flex items-center gap-6'>
                {icons.map((icon) => {
                  const Icon = icon.component
                  return (
                    <div key={icon.name} onClick={() => setFormData({...formData, icon :icon.name})}  className={`border-2 ${formData.icon === icon.name ? 'border-blue-500' : 'border-gray-200'} rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500`}>
                      <Icon  className={`size-5 ${formData.icon === icon.name ? 'text-blue-500' : 'text-gray-500'}`} />
                    </div>
                  )
                })}
              
              
            </div>
          <hr className='w-full border-gray-200 mt-5'/>
          </div>
            

          <div className="pt-5 px-6 flex gap-3 justify-end items-center pb-5">
            <button type="button" onClick={() => navigate("/dashboard")} className='border border-gray-200 hover:bg-gray-100 hover:cursor-pointer text-gray-800 py-2 px-4 rounded-lg text-sm '>Cancel</button>
            <button type='submit' className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg flex items-center">
              <Save className="mr-2 size-4"/> <p className='text-sm'>{id ? 'Update Project' : 'Create Project'}</p>
            </button>
          </div>
        </form>
    </div>
  )
}

export default ProjectForm
