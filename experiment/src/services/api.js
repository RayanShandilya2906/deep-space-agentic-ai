const BASE_URL = "http://localhost:5000/api";

// Home page — upload & analyze
export async function analyzeImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Analysis failed");
  }

  const json = await response.json();
  return json.data; // ✅ unwrap { success, data } — return just data
}

// Object Details page
export async function getObjectDetails(name) {
  const response = await fetch(`${BASE_URL}/object/${name}`); // ✅ /object/:name not /objects/:id
  if (!response.ok) throw new Error("Object not found");
  const json = await response.json();
  return json.data;
}

// Comparison page
export async function compareObjects(objectA, objectB) {
  const response = await fetch(`${BASE_URL}/compare/${objectA}/${objectB}`); // ✅ new
  if (!response.ok) throw new Error("Comparison failed");
  const json = await response.json();
  return json.data;
}

// Timeline page
export async function getTimeline(object) {
  const response = await fetch(`${BASE_URL}/timeline/${object}`); // ✅ /timeline/:object
  if (!response.ok) throw new Error("Failed to fetch timeline");
  const json = await response.json();
  return json.data;
}

// History page
export async function getHistory() {
  const response = await fetch(`${BASE_URL}/history`);
  if (!response.ok) throw new Error("Failed to fetch history");
  const json = await response.json();
  return json.history; // ✅ backend returns { success, history } not { data }
}

// Dashboard page
export async function getStats() {
  const response = await fetch(`${BASE_URL}/stats`);
  if (!response.ok) throw new Error("Failed to fetch stats");
  return response.json(); // ✅ returns { totalAnalyses, topObjects } directly — no .data wrapper
}