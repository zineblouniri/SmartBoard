import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { deleteProject, getProjects } from "../api/projectApi";
import { ChevronDown, Plus, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [projectToDelete ,setProjectToDelete] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();
        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async () => {
  try {
    await deleteProject(projectToDelete.id)
    setProjects(projects.filter((project) => project.id !== projectToDelete.id))
    toast.success("Project deleted successfully")
    setProjectToDelete(null)
  } catch (error) {
    toast.error("Failed to delete project")
  }
}

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    }

    return new Date(a.created_at) - new Date(b.created_at);
  });
  return (
    <div className="px-8 md:mt-3 mb-6   md:mb-4">
      <div className="sticky top-0 z-10 bg-gray-100 mt-3">
        <div className="flex flex-col md:flex-row md:justify-between justify-center items-center md:py-2  ">
        <div className="flex flex-col md:items-start items-center gap-1">
          
          <h1 className="text-2xl font-bold text-gray-800">Projects <span className="ml-2 text-sm font-normal text-gray-500">
    ({projects.length} projects)
  </span></h1> 
          
          <p className="text-gray-500 text-sm text-center md:text-left">
            Manage and organize all your projects in one place.
          </p>
        </div>
        <NavLink
          to="/projects/new"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 md:mt-0 rounded-lg flex items-center"
        >
          <Plus className="mr-2 size-4" />{" "}
          <span className="text-sm">New Project</span>
        </NavLink>
      </div>
      <div className="flex  md:flex-row flex-col justify-start items-center mb-4 mt-3 md:mt-0 gap-2 bg-gray-100">
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg md:w-1/4 w-full bg-white py-2 px-2 ">
          <Search className="size-3.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="text-sm w-full outline-none  "
          />
        </div>
        <div className="relative md:w-26 w-1/2">
          <select
            name="Sort"
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg py-2 px-2 bg-white w-full outline-none appearance-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDown className="size-4 text-gray-400" />
          </span>
        </div>
      </div>
      </div>

       {projects.length === 0 && (
    <div className="min-h-64 flex flex-col items-center justify-center text-center">
      <p className="text-gray-700 font-medium">
        No projects yet.
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Create your first project to get started.
      </p>

      <NavLink
        to="/projects/new"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-lg"
      >
        Create Project
      </NavLink>
    </div>
  )}
 {projects.length > 0 && sortedProjects.length === 0 && (
    <div className="min-h-64 flex flex-col items-center justify-center text-center">
      <p className="text-gray-700 font-medium">
        No projects found.
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Try another search or choose a different filter.
      </p>
    </div>
  )}
       {sortedProjects.length > 0 && (
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onDelete={()=>setProjectToDelete(project)} />
        ))}
      </div>
       )}

       {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="bg-white rounded-xl shadow-xl md:w-full md:max-w-md m-3 md:m-0 p-6">

      <h2 className="text-lg font-semibold text-gray-800">
        Delete project ?
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Are you sure you want to delete{" "}
        <span className="font-medium text-gray-700">
          {projectToDelete.name}
        </span>
        ? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => setProjectToDelete(null)}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
       )}
    </div>
    
  );
};

export default Projects;
