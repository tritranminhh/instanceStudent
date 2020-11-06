var AWS=require("aws-sdk");
var uuid=require("uuid");
const {param}=require(".");
AWSconfig={
    accessKeyId:"accessKeyId",
    secretAccessKey:"secretAccessKey",
    region:"us-east-2",
    enpoint:"https://dynamodb.us-east-2.amazonaws.com",
}
AWS.config.update(AWSconfig);
let docClient=new AWS.DynamoDB.DocumentClient();
function getAllItem(res) {
    let params={
        TableName:"Students",

    };
    docClient.scan(params,function (err,data) {
        if(err){
            res.writeHead(500,{'Content-Type':'application/json'});

        }else{
            res.render('index',{datas:data.Items});
        }
    });
}
function senditems(id,ma_sinhvien,ten,res) {
    let params={
        TableName:"Students",
        Item:{
            id:String(id),
            ma_sinhvien:String(ma_sinhvien),
            ten:String(ten),
        }
    };
    res.render('updateForm',{datas:params.Items});
    
}
function createItem(id,ma_sinhvien,ten,res) {
    let params={
        TableName:"Students",
        Item:{
            id:String(id),
            ma_sinhvien:String(ma_sinhvien),
            ten:String(ten),
        }
    };
    docClient.put(params,function (err,data) {
        if(err){
            res.writeHead(500,{'Content-Type':'application/json'});
            res.end(JSON.stringify({error:'không thể thêm'}));
        }
        else{
            res.redirect('/students');
        }
    });
}
function updateItems(id,ma_sinhvien,ten,res) {
   let params={
       TableName:'Students',
       Key:{
           "id":String(id),
           "ma_sinhvien":String(ma_sinhvien)
       },
       UpdateExpression: "set #t = :ten",
       ExpressionAttributeNames: {
        '#t':'ten',
       },
       ExpressionAttributeValues:{
           ':ten':String(ten),
       },
       ReturnValues: "UPDATED_NEW"
   };
    docClient.update(params,function (err,data) {
       if(err){
           res.writeHead(500,{'Content-Type':'application/json'});
           res.end(JSON.stringify({error:'lỗi không thể update'}));
       } else{
           res.redirect('/students');
       }
    });
    
}
function deleteItems(id,ma_sinhvien,res) {
    let params={
        TableName:"Students",
        Key:{
            "id":String(id),
            "ma_sinhvien":String(ma_sinhvien),
        }
    };
    docClient.delete(params,function (err,data) {
        if(err){
            res.writeHead(500,{'Content-Type':'application/json'});
        }else{
            res.redirect('/students');
        }
    });
}
module.exports={
    createItem:createItem,
    deleteItems:deleteItems,
    updateItems:updateItems,
    getAllItem:getAllItem,
    senditems:senditems,
}
