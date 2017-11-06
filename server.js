const http = require('http');
const spawn = require("child_process").spawn;
var ffmpeg;
const server = http.createServer((req, res) => {
  var url = req.url.split("/"),
    action = url[1];
  if (3 === url.length) {
    var name = url[2];
    name = decodeURIComponent(name)
  }
  if ("start" === action) {
    let args = "/usr/bin/ffmpeg -f x11grab -draw_mouse 0 -framerate 25 -video_size 1366x768 -i :0.0+1280,0 -f pulse -name vokoscreen -i alsa_output.pci-0000_00_1b.0.analog-stereo.monitor -pix_fmt yuv420p -c:v libx264 -preset veryfast -c:a aac -q:v 1 -s 1366x768 -f mp4 -threads 4";
    args = args.split(" ");
    let command = args.shift();
    let last = name + ".mp4";
    args.push(last.split(" ").join("-"));
    console.log(args);
    ffmpeg = spawn(command, args);
    // ffmpeg = spawn("ffmpeg", ["-y", "-video_size", "1366x768", "-framerate", "25", "-f", "x11grab", "-i", ":0.0", "-f", "pulse", "-ac", 2, "-i", "default", name+".mp4"]);
    ffmpeg.stderr.on("data", function (chunk) {
      var msg = chunk.toString();
      console.log(msg)
    }).on("end", function () {
      console.log("ffmpeg was killed!");
    });

  } else if ("stop" === action) {
    ffmpeg.kill("SIGINT");
  }
  
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
/*
* /usr/bin/ffmpeg -report -f x11grab -draw_mouse 0 -framerate 25 -video_size 1366x768 -i :0.0+1280,0 -f pulse -name vokoscreen -i alsa_output.pci-0000_00_1b.0.analog-stereo.monitor -pix_fmt yuv420p -c:v libx264 -preset veryfast -c:a aac -q:v 1 -s 1366x768 -f mp4 -threads 4
 */
 

