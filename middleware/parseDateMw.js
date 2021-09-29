const parse = require('date-fns/parse');

module.exports.parseDate = (req, res, next) => {
  try {
    req.body.timeValue = parse(req.body.timeValue, 'dd.MM.yyyy', new Date());
    next();
  } catch (error) {
    next(error);
  }
};
