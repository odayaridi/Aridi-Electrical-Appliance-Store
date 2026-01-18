const HttpError = require("../utils/HttpError");

const restrictTo = (attachedRoleName) => {
  return (req, res, next) => {
    const {roleName} = req.user;
    if(roleName !== attachedRoleName){
      throw new HttpError('Access to this web page is forbidden!',403);
    }
    next();
  };
};

module.exports = restrictTo;
