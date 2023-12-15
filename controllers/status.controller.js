exports.serverStatus = async (req, res, next) => {
  try {
    res.status(200);
  } catch (err) {
    next(err);
  }
};
