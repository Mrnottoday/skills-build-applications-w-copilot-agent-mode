const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const isCodespaceNameMissing = !codespaceName

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getEndpointUrl(component) {
  return `${apiBaseUrl}/${component}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['results', 'data', 'items', 'docs']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  return []
}

export async function fetchCollection(component) {
  const response = await fetch(getEndpointUrl(component))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollection(payload)
}