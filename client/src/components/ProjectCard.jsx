import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import {
  Calendar,
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Folder,
  Rocket,
  Code,
  Globe,
  ChartLine,
  Users
} from "lucide-react";

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();
  const iconMap = {
  folder: Folder,
  rocket: Rocket,
  code: Code,
  globe: Globe,
  chart: ChartLine,
  users: Users,
};


const Icon = iconMap[project.icon];
  return (
    <div className="flex flex-col justify-between min-h-64 bg-white border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-md transition-shadow duration-300 ">
      <div className="flex  gap-4 items-center">
            <div className="  bg-indigo-50 rounded-lg px-2.5 py-2.5 cursor-pointer hover:border-blue-500">
                    
            <NavLink to={`/projects/${project.id}`} ><Icon  className="size-5 text-indigo-500" /></NavLink>
            </div>
                   
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="text-lg font-semibold text-gray-900">{project.name}</p>
          <p className="text-gray-900 text-sm line-clamp-1">{project.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <hr className="w-full border-gray-200/80" />
        <div className="flex flex-col justify-start items-start">
          <p className="text-gray-500 text-xs">Created </p>
          <div className="flex justify-start items-center gap-1">
            <Calendar className="size-3 text-gray-500" />
            <p className="text-gray-900 text-xs">
              {new Date(project.created_at).toLocaleString()}
            </p>
          </div>{" "}
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button
            className="bg-blue-100   hover:bg-blue-300 cursor-pointer flex justify-center items-center gap-1 rounded-lg"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <p className="text-blue-600 font-semibold text-xs">Open</p>
            <ExternalLink className="text-blue-600 size-3" />
          </Button>
          <NavLink to={`/projects/${project.id}/edit`} className="border border-gray-200 p-2.5 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Pencil className="text-gray-800 size-3" />
          </NavLink>
          <Button onClick= {onDelete} className=" border border-red-200 bg-red-100/50 py-2.5 rounded-lg hover:bg-red-100 cursor-pointer">
            <Trash2 className="text-red-500 size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
