import { Calendar, EllipsisVertical, Square } from 'lucide-react'
import React from 'react'

const TaskComponent = () => {
  return (
    <div className='border border-gray-200 rounded-lg bg-white w-full min-h-16 p-2.5 flex items-center'>
      <div className='mr-4 mb-4'>
        <Square className="size-4 text-gray-500 " />
      </div>
      <div className='flex-1  min-w-0 flex flex-col gap-2'>
        <p className='font-semibold text-sm text-gray-700 truncate '>Design Landing Page Design Landing PagDesign Landing PagDesign Landing Pag</p>
        <div className='flex items-center gap-1'>
            <Calendar className="size-3 text-gray-500 mt-0.5" />
            <p className="text-gray-900 text-xs ">ncbsdvfmvncmdv
            </p>
        </div>
      </div>
      <div className=' flex flex-col items-end gap-4'>
        <EllipsisVertical className="size-4 text-gray-500 ml-6" />
        <div className='bg-indigo-100 rounded-full py-0.5 px-2.5 '>
        <p className=' text-indigo-500 text-xs font-semibold'>low</p>

        </div>
      
      </div>
    </div>
  )
}

export default TaskComponent
