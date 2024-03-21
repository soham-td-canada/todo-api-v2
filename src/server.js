var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var http = require('http');
var _a = require('http'), IncomingMessage = _a.IncomingMessage, ServerResponse = _a.ServerResponse;
var getTodosRoute = require('./routes/get-todos');
var addTodoRoute = require('./routes/add-todos');
var updateTodoRoute = require('./routes/update-todo');
var deleteTodoRoute = require('./routes/delete-todo');
var admin = require("firebase-admin");
var serviceAccount = require("../electron-poc-2425-firebase-adminsdk-6lc4f-675aba5dda.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var uid = 'MNaNEI7AtIarOTT5Nqmkygwvhi93';
var firestore = admin.firestore();
function generateAuthToken() {
    return __awaiter(this, void 0, void 0, function () {
        var token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, admin.auth().createCustomToken(uid)];
                case 1:
                    token = _a.sent();
                    console.log('Custom token generated:', token);
                    return [2 /*return*/, token];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error generating custom token:', error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
var server = http.createServer(function (req, res) {
    generateAuthToken()
        .then(function (token) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Authorization', "Bearer ".concat(token));
        if (req.method === 'GET' && req.url === '/todos') {
            getTodosRoute(req, res, firestore);
        }
        else if (req.method === 'POST' && req.url === '/todos') {
            addTodoRoute(req, res, firestore);
        }
        else if (req.method === 'PUT' && req.url.startsWith('/todos/')) {
            updateTodoRoute(req, res, firestore);
        }
        else if (req.method === 'DELETE' && req.url.startsWith('/todos/')) {
            deleteTodoRoute(req, res, firestore);
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    })
        .catch(function (error) {
        console.log(error);
        throw error;
    });
});
var port = process.env.PORT || 6430;
server.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
//# sourceMappingURL=server.js.map