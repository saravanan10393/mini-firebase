const io = require('socket.io');
const dataHandler = require('./datahandler');

function authorizeSocket(socket,next){
    next();
}

const namespaces = {};

class Socket{
    connect(server){
        this.io = io(server,{
            transports:['websocket']
        });
    }
    
    /**
     * Creates namespace for given applicationId
     * 
     * @param {string} namespace - AppplicationId as namepsace to group the sockets per application
     * 
     * @memberOf Socket
     */
    initialize(namespace){
        let nsp = null;
        if(namespaces[namespace]){
            nsp = namespaces[namespace];
            return;
        }
        else{
            nsp = this.io.of("/"+namespace);
            namespaces[namespace] = nsp;
        }
        nsp.use(authorizeSocket);
        nsp.on('connection', (socket) => {
            console.log('socket connected in namespace and id ',namespace, socket.id);
            socket.on('data', (message, ack) => {
                message.namespace = nsp.name.replace('/','');
                console.log('ping from client ',socket.id);
                dataHandler(message, nsp).then((data) => {
                    ack();
                    message.data = data;
                    socket.emit('data', message);
                },(err) => {
                    console.log('failed to retrive data ',err);
                });
            });
            
            socket.on('disconnect', function(){
                console.log('socket got disconnected ', socket.id)
            });
        });
    }

}

module.exports = new Socket();

