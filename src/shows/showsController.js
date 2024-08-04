// controllers/titlesController.js
const showService = require("./showsService");

const fetchShowsController = async (req, res) => {
  try {
    const { page = 1, limit = 15, search, type } = req.body; // Default to page 1 and limit 15

    const result = await showService.fetchShows(
      Number(page),
      Number(limit),
      search,
      type
    );

    return res.json({
      status: true,
      data: result.shows,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Error in fetchShowsController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const fetchShowDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await showService.fetchShowDetails(id);

    if (result.show) {
      return res.json({
        status: true,
        data: result.show,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Show not found",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching show details", error });
  }
};

module.exports = {
  fetchShowsController,
  fetchShowDetailsController,
};
