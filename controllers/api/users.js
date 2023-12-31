const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
    create
};
  
async function create(req, res) {
  try {
    const user = await User.create(req.body);

    const token = createJWT(user);
    console.log(token);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
}

// Helper functions
function createJWT(user) {
  return jwt.sign(
    { user }, 
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}