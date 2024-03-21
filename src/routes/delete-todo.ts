const deleteTodo = require("../db/delete-todo");

module.exports = function (req, res, firestore) {
    // Handle deleting an existing todo
    const todoId = req.url.split('/')[2]; // Extract todo ID from URL

    deleteTodo(todoId, firestore)
        .then(() => {
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Todo deleted successfully' }));
        })
        .catch(error => {
            console.error('Error deleting todo:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        });
}