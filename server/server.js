const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
var net = require('net');
const app = express();
const PORT = 3001;

//write your db info

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "hanium",
    password: "1234",
    database: "hanium"
});

app.use(cors({
    origin:"*",
    credentials: true,
    optionsSuccessStatus: 200,
}))

app.use(express.urlencoded({extended: true}));

//server open, using express package 

app.listen(PORT, () => {
    console.log(`server running on port${PORT}`);
});

//get db data router

app.get("/api/2023_0417", (req,res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const sqlQuery = "SELECT * FROM 2023_0417";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    })
})

//server connect function, write your server port num, ip address

function getConnection(connName){
    var client = net.connect({port: 8700, host:'192.168.110.173'}, function() {
      console.log(connName + ' Connected: ');
      console.log('   local = %s:%s', this.localAddress, this.localPort);
      console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
      this.setTimeout(500);//no reply to server after 0.5 seconds, timeout
      this.setEncoding('utf8');//encoding reply data
      this.on('data', function(data) {
        console.log(connName + " From Server: " + data.toString());
        this.end();
      });
      this.on('end', function() {
        console.log(connName + ' Client disconnected');
      });
      this.on('error', function(err) {
        console.log('Socket Error: ', JSON.stringify(err));
      });
      this.on('timeout', function() {
        console.log('Socket Timed Out');
      });
      this.on('close', function() {
        console.log('Socket Closed');
      });
    });

    return client;
  }

//write function, if socket buffer is full, change status to 'drain', recursive call

  function writeData(socket, data){
    var success = !socket.write(data);//socket buffer is full, success = false
    if (!success){
      (function(socket, data){
        socket.once('drain', function(){
          writeData(socket, data);//until buffer is full.. wait
        });
      })(socket, data);
    }
  }

//connect server router

  app.get("/api/hello", (req,res) => {
    var args = process.argv;
    console.log(args[2]);
    let argsSize = args[2].length;
    var server = getConnection("hanium");
    let dataSize = Buffer.allocUnsafe(4);  // Init buffer without writing all data to zeros
    dataSize.writeInt32LE(argsSize,0);  // Little endian this time..
    var buf = new Buffer.from([0x13,0x12,0xff,0xa0,...dataSize]);
    var buf2 = new Buffer.from(args[2],'ascii');
    var buf3 = new Buffer.from([0x13,0x12,0xf9,0xa0,0x00,0x00,0x00,0x00]);
    writeData(server,buf);
    setTimeout(() => {
      writeData(server, buf2);
      //writeData(server, buf3); //또다시 버퍼를 기다리는게 맞는지 확인, 10초마다 재연결? 10초마다 write?
      //server.end(); //데이터를 보낸 후 통신 강제 종료, Command Receive Error
    }, 2000);
    // server.on('data', function(data) {           //서버가 응답을 보낼 경우 웹에 전송(현재 미사용)
    //   console.log(data);
    //  res.send(data);
    // });
    res.send(false);//웹 반응 테스트용, 나중에 서버에서 데이터가 잘 넘어오면 삭제 예정
  })