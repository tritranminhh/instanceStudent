var express = require('express');
var router = express.Router();
const path=require('path');
const {title}=require('process');
const data=require('./aws');

/* GET home page. */
router.get('/students',function (req,res) {
  data.getAllItem(res);
});
router.get('/createnew',function (req,res) {
  res.render('createForm',{title:'Create Form'});
});
router.post('/students',function (req,res) {
  let id=req.body.id;
  let ma_sinhvien=req.body.ma_sinhvien;
  let ten=req.body.ten;
  data.createItem(id,ma_sinhvien,ten,res);

});
router.post('/students/:id/:ma_sinhvien',function (req,res) {
  let id=req.params.id;
  let ma_sinhvien=req.params.ma_sinhvien;
  data.deleteItems(id,ma_sinhvien,res);
});
router.post('/updateForm/:id/:ma_sinhvien/:ten',function (req,res,next) {
  res.render('updateForm',{id:req.params.id,ma_sinhvien:req.params.ma_sinhvien,ten:req.params.ten});
})
router.post('/updatestudents/:id/:ma_sinhvien/:ten',function (req,res) {
  let id=req.params.id;
  let ma_sinhvien=req.params.ma_sinhvien;
  let ten=req.body.ten;
  data.updateItems(id,ma_sinhvien,ten,res);
});
module.exports = router;
