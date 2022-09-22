create database revisao;

create table if not exists usuarios(
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null 
)

create table if not exists todos(
    id serial primary  key,
    tarefa text not null,
    ativo boolean default true,
    data date not null default now(),
    usuario_id integer not null references usuarios(id) 
)