const axios = require("axios");

async function getNASAImage(query) {

  try {

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

    return items[0].links[0].href;

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