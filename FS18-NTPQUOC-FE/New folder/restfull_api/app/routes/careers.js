var express = require("express");

var router = express.Router();

const controllerName    = "careers";
const mainModel         = require(__path_models + controllerName);
const asyncHandler      = require( __path_middleaware + 'asysnc');

const MainValidator         =  require (__path_validates + controllerName)
var ErrorRespone = require("../ultis/errorRespone");

router.get("/", asyncHandler( async (req, res, next) => {
    let data = await mainModel.listItem(req.query, { task: "all" });
    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
}));

router.get("/:id",asyncHandler( async (req, res, next) => {
    let data = await mainModel.listItem({ id: req.params.id }, { task: "one" });
    if(!data){
      return res.status(200).json({
        success: true,
        data: "Dữ liệu rộng",
      });
    }
    res.status(200).json({
      success: true,
      data: data,
    });
}));

router.post("/add",asyncHandler( async (req, res, next) => {
  let err = await validateReq(req,res,next)
  if (!err) {
    let data = await mainModel.create(req.body);
    res.status(201).json({
      success: true,
      data: data,
    });
  } 
}));

router.put("/edit/:id", asyncHandler (async (req, res, next) => {
  let err = await validateReq(req,res,next)
  if (!err) {
    let body = req.body
    let data = await mainModel.editItems({ id: req.params.id, 'body': body }, { task: "edit" });
    res.status(200).json({
      success: true,
      data: data,
    });   
  }
        
}));

router.put("/event/:type/:id", asyncHandler (async (req, res, next) => {
  let data = await mainModel.event({ id: req.params.id, 'type': req.params.type });
  if(!data){return res.status(200).json({
      success: true,
      data: "sai trạng thái cập nhật!",
    });
  }
  res.status(200).json({
    success: true,
    data: data,
  }); 
}));


router.delete("/delete/:id", asyncHandler( async (req, res, next) => {
        let data = await mainModel.deleteItems({ id: req.params.id }, { task: "one" });
        res.status(200).json({
          success: true,
          data: data,
        });
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
