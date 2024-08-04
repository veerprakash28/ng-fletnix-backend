const ShowModel = require("./showsModel");

const fetchShows = async (page = 1, limit = 15, search = "", type = "") => {
  try {
    const skip = (page - 1) * limit;

    // Build the query based on search and type
    const query = {
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { cast: { $regex: search, $options: "i" } },
        ],
      }),
      ...(type && { type: type }),
    };

    // Fetch the shows with pagination
    const shows = await ShowModel.find(query).skip(skip).limit(limit).exec();

    // Count the total number of shows matching the search query
    const totalShows = await ShowModel.countDocuments(query).exec();

    return {
      shows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalShows / limit),
        totalItems: totalShows,
      },
    };
  } catch (error) {
    console.error("Error fetching shows:", error);
    throw new Error("Error fetching shows");
  }
};

const fetchShowDetails = async (id = "") => {
  try {
    // Fetch the show by ID
    const show = await ShowModel.findById(id).exec();

    if (!show) {
      return { show: null }; // Ensure to return an object with a show property
    }

    return { show };
  } catch (error) {
    console.error("Error fetching show details:", error);
    throw new Error("Error fetching show details");
  }
};

module.exports = {
  fetchShows,
  fetchShowDetails,
};
