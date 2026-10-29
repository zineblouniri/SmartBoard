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
    <div className='w-full'>
      <form className='relative' onSubmit={id? handleEdit :handleSubmit} >
          <div className='flex flex-col items-start pt-7 px-6'>
            <p className='text-gray-800 font-semibold mb-1'>Project Name </p>
            <p className='text-gray-500 text-sm mb-2'>Choose a clear and descriptive name for your project</p>
            <input required={true} value={formData.name} onChange={(e) => setFormData({...formData,name :e.target.value})} type="text" placeholder='e.g. Smartboard Website' className="bg-white text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 outline-none w-full" />
          </div>
          <div className='flex flex-col items-start pt-5  px-6'>
            <p className='text-gray-800 font-semibold mb-1'>Description</p>
            <p className='text-gray-500 text-sm mb-2'>Describe your project goals, features or any important details.</p>
            <textarea required={true} value={formData.description} onChange={(e) => setFormData({...formData,description :e.target.value})} placeholder='e.g. This project will help us manage tasks, collaborate with team members, and track progress easily.' className="bg-white text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 outline-none w-full h-25" />
          </div>
          <div className='flex flex-col items-start pt-5 px-6'>
            <p className='text-gray-800 font-semibold mb-1'>Project Icon</p>
            <p className='text-gray-500 text-sm mb-5'>Choose an icon that represents your project</p>
            <div className='grid grid-cols-5 sm:grid-cols-6 gap-5'>
                {icons.map((icon) => {
                  const Icon = icon.component
                  const isSelected = formData.icon === icon.name;
                  return (
                     <button
        type="button"
        key={icon.name}
        onClick={() =>
          setFormData({ ...formData, icon: icon.name })
        }
        aria-label={`Select ${icon.name} icon`}
        aria-pressed={isSelected}
        className={`flex h-11 w-11 shrink-0 items-center justify-center
          rounded-xl border transition-all duration-200
          ${
            isSelected
              ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
              : "border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:bg-gray-50"
          }`}
      >
        <Icon className="size-5" strokeWidth={1.8} />
      </button>
                  )
                })}
              
              
            </div>
          </div>
            

          <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-end gap-3
                border-t border-gray-200 bg-white
                px-4 py-4 shadow-lg
                md:left-64">
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
