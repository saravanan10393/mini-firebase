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

        this.io.on('connection', (socket) => {
            console.log('init called');
            var namespace = socket.handshake.query.appId;
            if(namespace)
                this.initialize(namespace);
            socket.emit('connected',socket.id);
            // socket.on('initNsp', (namespace, ack) => {
            //     console.log('========initi socket called')
            //     this.initialize(namespace);
            //     ack();
            // });
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
        console.log('namespace is ',namespace)
        if(namespaces[namespace]){
            nsp = namespaces[namespace];
            console.log("==========namespae already exists for ",namespace);
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
                dataHandler(message, nsp, socket.id).then((data) => {
                    ack();
                    message.data = data;
                    socket.emit('data', message);
                },(err) => {
                    console.log('failed to retrive data ',err);
                });
            });
            
            socket.on('disconnect', function(){
                console.log('socket got disconnected ', socket.id)
                var message = {
                    action : "unregisterClient",
                    namespace: nsp.name.replace('/','')
                };
                dataHandler(message, nsp, socket.id)
            });
        });
    }

}

module.exports = new Socket();

