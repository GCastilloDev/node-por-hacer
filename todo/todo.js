const fs = require('fs');

let todoList = [];

const guardarDB = () => {
    let data = JSON.stringify(todoList);
    fs.writeFile('db/data.json', data, err => {
        if (err)
            throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        todoList = require('../db/data.json');
    } catch (error) {
        todoList = [];
    }
}

const getTodo = () => {
    cargarDB();
    return todoList;
}

const crear = descripcion => {

    cargarDB();

    let todo = {
        descripcion,
        completado: false
    };

    todoList.push(todo);
    guardarDB();
    return todo;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = todoList.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        todoList[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = descripcion => {
    cargarDB();
    let newTodo = todoList.filter(task => task.descripcion !== descripcion);

    if (newTodo.length === todoList.length) {
        return false;
    } else {
        todoList = newTodo;
        guardarDB();
        return true;
    }
}


module.exports = {
    crear,
    getTodo,
    actualizar,
    borrar
}