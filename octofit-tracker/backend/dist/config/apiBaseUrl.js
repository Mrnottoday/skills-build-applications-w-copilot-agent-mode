"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
};
exports.default = getApiBaseUrl;
