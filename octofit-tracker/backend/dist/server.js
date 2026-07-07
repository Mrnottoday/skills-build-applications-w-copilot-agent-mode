"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const apiBaseUrl_1 = __importDefault(require("./config/apiBaseUrl"));
const database_1 = __importDefault(require("./config/database"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const apiBaseUrl = (0, apiBaseUrl_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', apiRoutes_1.default);
app.get('/api/health', (_req, res) => {
    const mongoState = database_1.default.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({
        status: 'ok',
        service: 'octofit-backend',
        port,
        apiBaseUrl,
        mongodb: mongoState,
    });
});
app.listen(port, () => {
    console.log(`OctoFit backend running on ${apiBaseUrl}`);
});
