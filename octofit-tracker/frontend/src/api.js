const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBaseUrl = codeSpaceName
  ? `https://${codeSpaceName}-8000.app.github.dev/api`
  : null;

export function getApiUrl(resource) {
  if (!apiBaseUrl) return null;
  return resource.startsWith('/api/')
    ? `https://${codeSpaceName}-8000.app.github.dev${resource}`
    : `${apiBaseUrl}/${resource}/`;
}

export function getItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export async function fetchItems(resource) {
  const url = getApiUrl(resource);
  if (!url) return { items: [], configured: false };

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to load ${resource}`);
  return { items: getItems(await response.json()), configured: true };
}