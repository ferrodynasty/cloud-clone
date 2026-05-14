const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).redirect('/user/login');
  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.status(401).redirect('/user/login');
  }
};
