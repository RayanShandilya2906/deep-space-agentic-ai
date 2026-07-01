const { getAstronomyFact } = require("./geminiService");
const { getNASAImage } = require("./nasaService");

function normalizeRecommendationName(recommendation) {
  if (typeof recommendation === "string") {
    return recommendation.trim();
  }

  return (
    recommendation?.name ||
    recommendation?.objectName ||
    recommendation?.title ||
    ""
  ).trim();
}

async function getObjectImage(objectName) {
  return getNASAImage(objectName);
}

async function enrichRecommendation(recommendation) {
  const name = normalizeRecommendationName(recommendation);

  if (!name) {
    return null;
  }

  const [image, fact] =
    await Promise.all([
      getObjectImage(name),
      getAstronomyFact(name).catch((error) => {
        console.error(
          "Gemini fact error:",
          error.message
        );

        return `${name} is a celestial object studied by astronomers to understand the structure and evolution of space.`;
      })
    ]);

  return {
    name,
    image,
    fact
  };
}

async function enrichRecommendations(recommendations = []) {
  const recommendationList =
    Array.isArray(recommendations) ? recommendations : [];

  const enriched =
    await Promise.all(
      recommendationList
        .slice(0, 4)
        .map(enrichRecommendation)
    );

  return enriched.filter(Boolean);
}

module.exports = {
  enrichRecommendations,
  getObjectImage
};
