const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://deep-space-agentic-ai-backend.onrender.com/api";

export const API_ORIGIN = BASE_URL.replace(/\/api\/?$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getFriendlyError(error, fallback = "Unable to reach the backend right now. Please try again later.") {
  if (error?.status === 429) {
    return "AI quota temporarily exceeded. Please try again later.";
  }

  if (error instanceof TypeError || /Failed to fetch|NetworkError/i.test(error?.message || "")) {
    return fallback;
  }

  return error?.message || fallback;
}

export function getUploadedImageUrl(imagePath) {
  if (!imagePath) return "/andromeda.png";
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  const normalized = imagePath.replace(/\\/g, "/").replace(/^\/+/, "");
  return `${API_ORIGIN}/${normalized}`;
}

async function requestJson(path, options = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        Accept: "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (error) {
    throw new ApiError("Unable to reach the backend right now. Please try again later.", 0);
  }

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      response.status === 429
        ? "AI quota temporarily exceeded. Please try again later."
        : payload?.message || payload?.error || `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
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
