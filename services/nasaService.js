const axios = require("axios");

async function getNASAImage(query) {

  try {
    if (!query) {
      return null;
    }

    const response =
      await axios.get(
        "https://images-api.nasa.gov/search",
        {
          params: {
            q: query,
            media_type: "image"
          }
        }
      );

    const items =
      response.data.collection.items;

    if (!items.length) {
      return null;
    }

    const imageLink =
      items.find((item) =>
        Array.isArray(item.links) &&
        item.links[0]?.href
      )?.links[0]?.href;

    return imageLink || null;

  } catch (error) {

    console.error(
      "NASA API Error:",
      error.message
    );

    return null;
  }
}

module.exports = {
  getNASAImage
};
