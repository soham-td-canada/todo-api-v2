const addTodo = require("../db/add-todo");

module.exports = function (req, res, firestore) {
    let requestBody = '';

    req.on('data', chunk => {
        requestBody += chunk.toString();
    })

    req.on('end', () => {
        const newTodo = JSON.parse(requestBody);

        addTodo(newTodo, firestore)
            .then(() => {
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'Todo added successfully' }));
            })
            .catch(error => {
                console.error('Error Adding todo', error);
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            })
    })

    return;
}