var express = require("express");

var router = express.Router();

const controllerName    = "users";
const mainModel         = require(__path_models + controllerName);
const asyncHandler      = require( __path_middleaware + 'asysnc');

const MainValidator         =  require (__path_validates + 'auth')
var ErrorRespone = require("../ultis/errorRespone");



router.post("/register",asyncHandler( async (req, res, next) => {
  let err = await validateReq(req,res,next)
  if (!err) {
    let data = await mainModel.create(req.body);
    res.status(201).json({
      success: true,
      data: data,
    });
  } 
}));


module.exports = router;

const validateReq = async (req,res,next) =>{
  let err = await MainValidator.validator(req)
  if (Object.keys(err).length > 0) {
     next (new ErrorRespone(400, err))
    return true
  }
  return false
}
