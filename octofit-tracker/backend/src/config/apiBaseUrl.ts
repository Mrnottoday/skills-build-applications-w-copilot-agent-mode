const getApiBaseUrl = () => {
  const CODESPACE_NAME = process.env.CODESPACE_NAME;

  return CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
};

export default getApiBaseUrl;