module.exports = function (req, res, next) {
  return res.json({
    success: req.success,
    message: req.message || "",
    results: req.results
  });
}
