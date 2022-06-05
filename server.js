//cài đặt thư viện
//npm install express
//npm install body-parser
//npm install mysql
//npm install cors --save
const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');

//tạo đối tượng mới
const app = express();
//chuyển về dạn json
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

//get data comic
app.get('/data',(req,res)=>{
    var sql = "select * from tb_comics ";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);// gửi kết quả cho react native
    })
})
//get follow comic
app.get('/follow:id',(req,res)=>{
  var sql = "SELECT * FROM tb_comics,tb_favorite_comics WHERE tb_comics.comics_id = tb_favorite_comics.comics_id and user_id = '"+req.params.id+"' ORDER BY user_id  ASC";
  connection.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);// gửi kết quả cho react native
})
})

//get data comic newest
app.get('/newest',(req,res)=>{
  var sql = "select * from tb_comics ORDER BY tb_comics.created_at DESC";
  connection.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);// gửi kết quả cho react native
  })
})

//get data comic by id
app.get('/data/:comics_id', (req, res) => {
    var sql = "select * from tb_comics "
            + "WHERE comics_id='"+req.params.comics_id+"'";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);// gửi kết quả cho react native
    })
  });


//get episode by comic id
app.get('/data/:comics_id/episode', (req, res) => {
  var sql = "select * from tb_episode "
          + "INNER JOIN tb_comics ON tb_episode.comics_id=tb_comics.comics_id WHERE tb_comics.comics_id='"+req.params.comics_id+"'";
  connection.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);// gửi kết quả cho react native
  })
});

//get data the most popular comics
app.get('/like',(req,res)=>{
  var sql = "SELECT * FROM tb_comics ORDER BY tb_comics.like_comics DESC";
  connection.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);// gửi kết quả cho react native
  })
})

//get gerne comics
app.get('/gerne',(req,res)=>{
  var sql = "SELECT * FROM tb_styles ORDER BY styles_name ASC";
  connection.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);// gửi kết quả cho react native
  })
})

//get comic by styles name
app.get('/data/gerne/:styles_name', (req, res) => {
  var sql = "select * from tb_comics "
          + "INNER JOIN tb_styles ON tb_comics.comics_style=tb_styles.styles_name WHERE tb_styles.styles_name='"+req.params.styles_name+"'";
  connection.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);// gửi kết quả cho react native
  })
});

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


//câu lệnh lấy tất cả thể loại truyện (tb_styles) 
app.get('/get-styles',(req,res)=>{
  var sql = "SELECT styles_id,styles_name FROM tb_styles";
  connection.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);// gửi kết quả cho react native
  })
});
//lấy sở thích người dùng đã thêm
app.get('/get-my-styles:id',(req,res)=>{
  var sql = "SELECT styles_id,styles_name FROM tb_styles,tb_favorite_styles WHERE tb_styles.styles_id = tb_favorite_styles.style_id AND tb_favorite_styles.user_id = '"+req.params.id+"' ORDER BY `favorite_styles_id` ASC";
  connection.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);// gửi kết quả cho react native
  })
});

//câu lệnh kiểm tra thể loại đã thêm rồi
app.post('/checkTheLoai', (req, res) => {
var sql = "select * from tb_favorite_styles "
        + "WHERE user_id ='"+req.body.user_id+"' and style_id ='"+req.body.style_id+"'";
connection.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      console.log(result.length);
      res.send('1');// gửi kết quả cho react native
    }
    else{
      res.send("0");
    }
})
});

//câu lệnh thêm thể loại
app.post('/addTheLoai',(req,res)=>{
//console.log(req.body);
var data = { user_id:req.body.user_id, style_id:req.body.style_id};
var sql = "insert into tb_favorite_styles set ?";
connection.query(sql,data,(err,result)=>{
    if(err) throw err;
    //console.log(result);
    res.send({
        status:'Dữ liệu đã thêm thành công !',
        user_id:req.body.user_id, 
        style_id:req.body.style_id, 
    });// gửi kết quả cho react native
});
});

//câu lệnh xoá thể loại
app.post('/deleteTheLoai', (req, res) => {
var sql = "DELETE FROM tb_favorite_styles "
        + "WHERE user_id='"+req.body.user_id+"' AND style_id='"+req.body.style_id+"'";
connection.query(sql, (err, results)=> {
  if (err) throw err;
  res.send({news: results});
});
});

//câu lệnh kiểm tra follow
app.post('/checkFollow', (req, res) => {
  var sql = "select * from tb_favorite_comics "
          + "WHERE user_id ='"+req.body.user_id+"' and comics_id ='"+req.body.comics_id+"'";
  connection.query(sql,(err,result)=>{
      if(err) throw err;
      if(result.length > 0){
        console.log(result.length);
        res.send('1');// gửi kết quả cho react native
      }
      else{
        res.send("0");
      }
  })
  });
  
  //câu lệnh thêm thể loại
  app.post('/addFollow',(req,res)=>{
  //console.log(req.body);
  var data = { user_id:req.body.user_id, comics_id:req.body.comics_id};
  var sql = "insert into tb_favorite_comics set ?";
  connection.query(sql,data,(err,result)=>{
      if(err) throw err;
      //console.log(result);
      res.send({
          status:'Dữ liệu đã thêm thành công !',
          user_id:req.body.comics_id, 
          style_id:req.body.comics_id, 
      });// gửi kết quả cho react native
  });
  });
//câu lệnh xoá follow
app.post('/deleteFollow', (req, res) => {
  var sql = "DELETE FROM tb_favorite_comics "
          + "WHERE user_id='"+req.body.user_id+"' AND comics_id='"+req.body.comics_id+"'";
  connection.query(sql, (err, results)=> {
    if (err) throw err;
    res.send({news: results});
  });
  });
  //cập nhật like
  app.post('/updateLike', (req, res) => {
    console.log(req.body);
    var sql = "UPDATE tb_comics SET "
            +   "like_comics='"+req.body.like_comics+"' "
            + "WHERE comics_id='"+req.body.comics_id+"'";
    connection.query(sql, (err, results)=> {
        if(err) throw err;
        console.log(results);
        res.send({
          status:'Dữ liệu đã gửi thành công !',
          like_comics:req.body.like_comics,
          comics_id:req.body.comics_id,
        });// gửi kết quả cho react native
    });
  });

    //cập nhật ảnh đại diện
    app.post('/updateAvatar', (req, res) => {
      console.log(req.body);
      var sql = "UPDATE tb_user SET "
              +   "user_avata='"+req.body.user_avata+"' "
              + "WHERE user_id ='"+req.body.user_id +"'";
      connection.query(sql, (err, results)=> {
          if(err) throw err;
          console.log(results);
          res.send({
            status:'Dữ liệu đã gửi thành công !',
          });// gửi kết quả cho react native
      });
    });
    //cập nhật ảnh bìa
    app.post('/updateBackground', (req, res) => {
      console.log(req.body);
      var sql = "UPDATE tb_user SET "
              +   "user_cover_img='"+req.body.user_cover_img+"' "
              + "WHERE user_id  ='"+req.body.user_id  +"'";
      connection.query(sql, (err, results)=> {
          if(err) throw err;
          console.log(results);
          res.send({
            status:'Dữ liệu đã gửi thành công !',
          });// gửi kết quả cho react native
      });
    });
// chạy .
app.listen(3001, () => {
    console.log('server đang chạy ở cổng 3001');
   });
   