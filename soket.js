const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// const io = new Server(9000, {
//     cors:
//     {
//     origin: '*'
//     ,methods:["GET","POST"] 
//     }
//     }
//     )
    io.on("connection", (socket) => { 
        console.log(`user connected:' ${socket.id}`);
        socket.on('sendMessage', data => {
          const now = new Date(); 
          let day = now.getDate();
         let month = now.getMonth() + 1;
         let year = now.getFullYear();
         const hours=now.getHours()
         let currentDate = `${day}-${month}-${year}`;
          var ampm = hours >= 12 ? 'pm' : 'am';
          const hoursAndMinutes = now.getHours() + ':'+(now.getMinutes()<10?'0':'') + now.getMinutes()+ " " +ampm;
          let arr={...data,timestamps: hoursAndMinutes,date:currentDate}
       console.log('sendMessage',arr)
       socket.broadcast.emit("getMessage",arr)
    })
    })
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
