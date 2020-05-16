const argv = require('./config/yargs').argv;
const todo = require('./todo/todo');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = todo.crear(argv.descripcion)
        console.log(tarea);
        break;

    case 'listar':
        let list = todo.getTodo();
        for (let task of list) {
            console.log("========= Por hacer =========".green);
            console.log(task.descripcion);
            console.log(`Estado: ${task.completado}`);
            console.log("=============================".green);
        }
        break;

    case 'actualizar':
        let actualizado = todo.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        console.log(todo.borrar(argv.descripcion));
        break;
    default:
        console.log('Comando no reconocido');
}