const getTodos = require('../db/get-todos');

module.exports = (req, res, firestore) => {

    res.writeHead(200);

    getTodos(firestore)
        .then(data => {
            res.end(JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}