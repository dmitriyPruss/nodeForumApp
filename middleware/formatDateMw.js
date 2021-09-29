const format = require('date-fns/format');

module.exports.formatDate = (req, res, next) => {
  try {
    req.body.timeValue = format(req.body.timeValue, 'dd.MM.yyyy');
    next();
  } catch (error) {
    next(error);
  }
};
