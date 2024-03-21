const updateTodo = require("../db/update-todo");

module.exports = function (req, res, firestore) {
    // Handle updating an existing todo
    const todoId = req.url.split('/')[2]; // Extract todo ID from URL

    let requestBody = '';

    req.on('data', chunk => {
        requestBody += chunk.toString();
    });

    req.on('end', () => {
        const updatedTodo = JSON.parse(requestBody);

        updateTodo(todoId, updatedTodo, firestore)
            .then(() => {
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Todo updated successfully' }));
            })
            .catch(error => {
                console.error('Error updating todo:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            });
    });
}