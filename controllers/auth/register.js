const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require('../../models/user');

const { RequestError, sendMail } = require('../../helpers');

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: 'Please, confirm you email',
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click to confirm registration</a>`,
  };

  await sendMail(mail);

  res.status(201).json({
    name: result.name,
    email: result.email,
    verificationToken: result.verificationToken,
  });
};

module.exports = register;
