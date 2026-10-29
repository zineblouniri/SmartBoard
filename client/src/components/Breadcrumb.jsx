
import { NavLink, useLocation, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({project,task}) => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  let items = [];

  if (pathname === "/dashboard") {
    items = [{ label: "Dashboard" }];
  } else if (pathname === "/settings") {
    items = [{ label: "Settings" }];
  } else if (pathname === "/profile") {
    items = [{ label: "Profile" }];
  } else if (pathname === "/projects") {
    items = [{ label: "Projects", to: "/projects" }];
  } else if (pathname === "/projects/new") {
    items = [
      { label: "Projects", to: "/projects" },
      { label: "New Project" },
    ];
  } else if (/^\/projects\/[^/]+\/edit$/.test(pathname)) {
    const id = segments[1];

    items = [
      { label: "Projects", to: "/projects" },
      { label: project, to: `/projects/${id}` },
      { label: "Edit" },
    ];
  } else if (/^\/projects\/[^/]+$/.test(pathname)) {
    items = [
      { label: "Projects", to: "/projects" },
      { label: project },
    ];
  } else if (pathname === "/tasks") {
    items = [{ label: "Tasks", to: "/tasks" }];
  } else if (/^\/tasks\/project\/[^/]+$/.test(pathname)) {
    const projectId = segments[2];
    items = [
      { label: "Projects", to: "/projects" },
      { label: project, to: `/projects/${projectId}` },
      { label: "Tasks" },
    ];
  } else if (pathname === "/tasks/new") {
    items = [
      { label: "Tasks", to: "/tasks" },
      { label: "New Task" },
    ];
  } else if (/^\/tasks\/project\/[^/]+\/new$/.test(pathname)) {
    items = [
      { label: "Projects", to: "/projects" },
      { label: `${project} tasks`, to: `/tasks/project/${segments[2]}` },
      { label: "New Task" },
    ];
  } else if (/^\/tasks\/[^/]+\/edit$/.test(pathname)) {
    items = [
      { label: task, to: "/tasks" },
      { label: "Edit" },
    ];
  } else if (/^\/tasks\/[^/]+$/.test(pathname)) {
    items = [
      { label: "Tasks", to: "/tasks" },
      { label: task },
    ];
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight
              size={14}
              className="text-gray-400"
            />
          )}

          {item.to ? (
            <NavLink
              to={item.to}
              className="text-gray-500 hover:text-indigo-600"
            >
              {item.label}
            </NavLink>
          ) : (
            <span className="font-medium text-gray-900">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
