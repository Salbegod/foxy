const { connect } = require("@ngrok/ngrok");
const { spawn, exec } = require('child_process');
const EventEmitter = require('events');

var url;
const serverEmitter = new EventEmitter();
module.exports.serverEmitter = serverEmitter;

async function boot() {
    console.log("Connecting...");
    listener = await connect({
        authtoken: '2cIUoheD7qL0fd2AZg4cuGiHapC_6oMxU7jzruxnrwDwbZoU6',
        proto: 'tcp',
        addr: 25565,
        remote_addr: '1.tcp.sa.ngrok.io:22067',
        region: 'sa'
    });
    url = listener.url().slice(6);
    console.log(`Ingress established at: ${url}`);
    module.exports.url = url;
}

async function fetchJSON() {
    const res = await fetch(`https://api.mcsrvstat.us/3/${url}`);
        const data = await res.json();
        return data;
}

function getPlayerList(json) {
    var result = "";
    var separator = ", ";
    const list = json.players.list;
    var numPlayers = list.length;

    for (let index = 0; index < numPlayers-1; index++) {
        if(numPlayers - index == 2){separator = " e ";}
        result += list[index].name + separator;
        
    }
    result += list[json.players.list.length-1].name;
    return result;
}

function openMCServer() {
    minecraftServer = spawn('cmd.exe', ['/c', "C:\\Minecraft Server\\run.bat"]);

    minecraftServer.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    minecraftServer.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    minecraftServer.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    return minecraftServer;
}

module.exports = {
    boot,
    fetchJSON,
    getPlayerList,
    openMCServer,
    serverEmitter
}