var updateTodo = require("../db/update-todo");
module.exports = function (req, res, firestore) {
    // Handle updating an existing todo
    var todoId = req.url.split('/')[2]; // Extract todo ID from URL
    var requestBody = '';
    req.on('data', function (chunk) {
        requestBody += chunk.toString();
    });
    req.on('end', function () {
        var updatedTodo = JSON.parse(requestBody);
        updateTodo(todoId, updatedTodo, firestore)
            .then(function () {
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Todo updated successfully' }));
        })
            .catch(function (error) {
            console.error('Error updating todo:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        });
    });
};
//# sourceMappingURL=update-todo.js.map