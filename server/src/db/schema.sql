create table if not exists users (
    id serial primary key,
    name varchar(100) not null,
    email varchar(150) unique not null,
    password varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);


create table if not exists projects (
    id serial primary key,
    name varchar(100) not null,
    description text,
    owner_id integer references users(id) on delete cascade,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table if not exists tasks (
    id serial primary key,
    title varchar(200) not null,
    description text,
    status varchar(20) default 'todo' check (status in ('todo','in_progress','done')),
    priority varchar(20) default 'medium' check (priority in ('low','medium','high')),
    deadline date,
    project_id integer references projects(id) on delete cascade,
    assigned_to integer references users(id) on delete set null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);


CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);