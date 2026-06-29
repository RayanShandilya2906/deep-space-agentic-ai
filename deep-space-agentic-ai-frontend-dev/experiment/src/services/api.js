const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function requestJson(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = payload?.message || payload?.error || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return payload;
}

export async function analyzeImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const payload = await requestJson("/analyze", {
    method: "POST",
    body: formData,
  });

  return payload.data;
}

export async function getObjectDetails(name) {
  const payload = await requestJson(`/object/${encodeURIComponent(name)}`);
  return payload.data;
}

export async function compareObjects(objectA, objectB) {
  const payload = await requestJson(`/compare/${encodeURIComponent(objectA)}/${encodeURIComponent(objectB)}`);
  return payload.data;
}

export async function getTimeline(object) {
  const payload = await requestJson(`/timeline/${encodeURIComponent(object)}`);
  return payload.data;
}

export async function getHistory() {
  const payload = await requestJson("/history");
  return payload.history || [];
}

export async function getStats() {
  return requestJson("/stats");
}