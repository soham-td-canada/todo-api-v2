const http = require('http');
const { IncomingMessage, ServerResponse } = require('http');
const getTodosRoute = require('./routes/get-todos');
const addTodoRoute = require('./routes/add-todos');
const updateTodoRoute = require('./routes/update-todo');
const deleteTodoRoute = require('./routes/delete-todo');
const admin = require("firebase-admin");

const serviceAccount = require("../electron-poc-2425-firebase-adminsdk-6lc4f-675aba5dda.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const uid: string = 'MNaNEI7AtIarOTT5Nqmkygwvhi93';

const firestore = admin.firestore();

async function generateAuthToken() {
    try {
        const token = await admin.auth().createCustomToken(uid);
        console.log('Custom token generated:', token);
        return token;
    } catch (error) {
        console.error('Error generating custom token:', error);
        throw error;
    }
}


const server = http.createServer((req: typeof IncomingMessage, res: typeof ServerResponse) => {
    generateAuthToken()
        .then(token => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Authorization', `Bearer ${token}`);

            if(req.method === 'GET' && req.url === '/todos') {
                getTodosRoute(req, res, firestore);
            } else if(req.method === 'POST' && req.url === '/todos') {
                addTodoRoute(req, res, firestore);
            } else if (req.method === 'PUT' && req.url.startsWith('/todos/')) {
                updateTodoRoute(req, res, firestore);
            } else if (req.method === 'DELETE' && req.url.startsWith('/todos/')) {
                deleteTodoRoute(req, res, firestore);
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Not Found'}));
            }
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
});

const port = process.env.PORT || 6430;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

