"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = __importDefault(require("winston"));
dotenv_1.default.config();
const logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.simple()
        })
    ]
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'ss-mapper',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});
app.get('/', (req, res) => {
    res.json({
        name: 'SS-Mapper API',
        version: '1.0.0',
        endpoints: ['/health']
    });
});
app.listen(PORT, () => {
    console.log("SS-Mapper API demarree sur http://localhost:" + PORT);
});
exports.default = app;
//# sourceMappingURL=app.js.map