# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker application.

## Environment

Define `VITE_CODESPACE_NAME` before running the Vite app in Codespaces, for example in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API endpoints with:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000/api` to avoid unsafe `https://undefined-8000...` requests.
