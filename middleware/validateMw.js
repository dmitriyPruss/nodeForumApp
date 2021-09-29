const yup = require('yup');

module.exports.validateMsg = async (req, res, next) => {
  const minDate = new Date(2010, 1, 1);
  const currentDate = new Date();

  const MSG_VALIDATE_SCHEMA = yup.object().shape({
    text: yup
      .string()
      .trim()
      .min(1)
      .max(100, 'Too much symbols!')
      .required('This field mustn`t be empty! Please enter a message'),
    eMail: yup
      .string()
      .email('Wrong writed eMail! Try again...')
      .required('This field mustn`t be empty'),
    timeValue: yup
      .date()
      .min(minDate, 'A long time ago... Wrong date!')
      .max(currentDate, 'Are you in distant future? Wrong date!')
      .required('Date must be required!')
  });

  try {
    const validatedMsg = await MSG_VALIDATE_SCHEMA.validate(req.body);
    req.body = validatedMsg;
    next();
  } catch (error) {
    next(error);
  }
};
