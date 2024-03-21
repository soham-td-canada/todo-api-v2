var addTodo = require("../db/add-todo");
module.exports = function (req, res, firestore) {
    var requestBody = '';
    req.on('data', function (chunk) {
        requestBody += chunk.toString();
    });
    req.on('end', function () {
        var newTodo = JSON.parse(requestBody);
        addTodo(newTodo, firestore)
            .then(function () {
            res.writeHead(201);
            res.end(JSON.stringify({ message: 'Todo added successfully' }));
        })
            .catch(function (error) {
            console.error('Error Adding todo', error);
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
        });
    });
    return;
};
//# sourceMappingURL=add-todos.js.map