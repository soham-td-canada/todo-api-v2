var getTodos = require('../db/get-todos');
module.exports = function (req, res, firestore) {
    res.writeHead(200);
    getTodos(firestore)
        .then(function (data) {
        res.end(JSON.stringify(data));
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
};
//# sourceMappingURL=get-todos.js.map