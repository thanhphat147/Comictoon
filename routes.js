//cài đặt thư viện
//npm install express
//npm install body-parser
//npm install mysql
//npm install cors --save
//ngrok http 3001
const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');

//tạo đối tượng mới
const app = express();
//chuyển về dạng json
app.use(bodyparser.json()); 
//sử dụng thư viện cors
app.use(cors());

//kết nối
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  port     : 3306,
  database : 'dbtruyen'
});
connection.connect();

//câu lệnh select
app.get('/data',(req,res)=>{
    var sql = "select * from tb_user ORDER BY user_id ASC ";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);// gửi kết quả cho react native
    })
})
//cau lenh dang nhap
app.post('/login', (req, res) => {
    var sql = "select * from tb_user "
            + "WHERE user_name='"+req.body.user_name+"' and user_pass='"+req.body.user_pass+"'";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
          console.log(result);
          res.send(result);// gửi kết quả cho react native
        }
        else{
          res.send("0");
        }
    })
  });

//câu lệnh tao tai khoan
app.post('/register',(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO tb_user(user_name,user_pass,user_avata,user_cover_img) VALUES ('"+req.body.user_name+"','"+req.body.user_pass+"','"+req.body.user_avata+"','"+req.body.user_cover_img+"')";
    console.log("sql:",sql);
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({
            status:'Dữ liệu đã gửi thành công !',
            user_name:req.body.user_name,
            user_pass:req.body.user_pass,
            user_avata:req.body.user_avata,
            user_cover_img:req.body.user_cover_img,
        });// gửi kết quả cho react native
    });
});


// //cau lenh xoa
// app.post('/delete', (req, res) => {
//     var sql = "DELETE FROM tbinforsong "
//             + "WHERE id='"+req.body.id+"'";
//     connection.query(sql, (err, results)=> {
//       if (err) throw err;
//       res.send({news: results});
//     });
//   });

//cau lenh sua
app.post('/update', (req, res) => {
    console.log(req.body);
    var sql = "UPDATE tb_user SET "
            +   "user_name='"+req.body.user_name_new+"',user_pass='"+req.body.user_pass_new+"' "
            + "WHERE user_id='"+req.body.user_id+"' AND user_pass='"+req.body.user_pass+"'";
    connection.query(sql, (err, results)=> {
        if(err) throw err;
        console.log(results);
        res.send({
          status:'Dữ liệu đã gửi thành công !',
          user_id:req.body.user_id,
          user_name:req.body.user_name_new,
          user_pass:req.body.user_pass_new,
        });// gửi kết quả cho react native
    });
  });

// chạy .
app.listen(3001, () => {
    console.log('server đang chạy ở cổng 3001');
   });
   