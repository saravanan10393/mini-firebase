import * as io from 'socket.io-client';
import * as DeepExtend from 'deep-extend';

const dataFormat = {};
const hostUrl = "http://localhost:3000";
var socket = null;

// utils methods
/**
 * Retrives the value from object for a given object path.
 * 
 * @param {Array<string>} paths 
 * @param {Object} [targetObj=dataFormat] 
 * @returns {any} - Returns a matched value for given path from given object.
 */
function getValueFromObjectForPath(paths:Array<string>, targetObj: Object = dataFormat){
    var path = paths[0];
    if(paths.length == 1){
        return targetObj[paths[0]];
    }else if(paths.length != 0){
        paths.splice(0,1);
        return getValueFromObjectForPath(paths, targetObj[path]);
    }
    return null;
}

/**
 * Merge the updated patch data from server with local version of data obj.
 * 
 * @param {string} path - Path of source object.
 * @param {any} source - Updated data from server to be merged with local version.
 * @param {any} [target=dataFormat] - local version of data object.
 * @returns {Object} - Returns an updated local user data object.
 */
function mergetData(path:string, source : any, target = dataFormat) {
    var paths = path.split('/');
    var obj = constructionObjFromPath(paths, source);
    DeepExtend(target, obj);
    compactObject(target);
    return target;
}

/**
 * Construct the Js object with supplied data value from given path 
 * 
 * @param {Array<string>} paths 
 * @param {*} value - Value to be assigned in a given path.
 * @returns {Object} - Returns an object filled with given value.
 */
function constructionObjFromPath(paths : Array<string>, value : any){
    var obj = {};
    var path = paths[0]
    if(paths.length == 1){
        obj[path] = value;
    }else{
        paths.splice(0,1);
        obj[path] = constructionObjFromPath(paths, value);
    }
    return obj;
}

/**
 * Removes all keys from object whose value is false or null or undefined
 * 
 * @param {any} obj 
 * @returns 
 */
function compactObject(obj) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k) && !obj[k]) {
            delete obj[k];
        }
        if(typeof obj[k] == "object"){
            compactObject(obj[k]);
        }
    }
    return obj;
}


class EventEmitter {
    private events;
    constructor() {
        this.events = {}
    }

    on(name, callback) {
        if (!this.events[name]) {
            this.events[name] = []
        }
        this.events[name].push(callback)
    }

    emit(name, data) {
        if (!this.events[name]) return;
        this.events[name].forEach(callback => {
            callback(data)
        });
    }

    off(name, callback?) {
        if (this.events[name] && callback) {
            let index = this.events[name].indexOf(callback)
            this.events[name].splice(index, 1);
        } else {
            delete this.events[name];
        }
    }
}

const eventEmitter = new EventEmitter();


class Socket {
    private socket: any;
    constructor(private path) {
        this.socket = io(`${hostUrl}/${path}`, {
            transports: ['websocket']
        });
        this.initilizeEvents();
    }

    send(data, ack) {
        this.socket.emit('data', data, ack)
    }

    initilizeEvents() {
        this.socket.on('data', (res) => {
            mergetData(res.path, res.data);
            this.emitLocalEvents(res.path, res.action); 
        })
    }

    private emitLocalEvents(pathstr:string, action:string="value"){
        var paths = pathstr.split('/');
        paths.reduce((combinedPath, currentPath) => {
            var obj = getValueFromObjectForPath(combinedPath.split('/'))
            console.log('retrived value from path ',combinedPath ,obj)
            if(obj)
                eventEmitter.emit(`${combinedPath}`, obj)
            if(combinedPath == currentPath){
                return combinedPath
            }else{
                return combinedPath +"/"+currentPath;
            }
        }, paths[0]);
    }
}


class Query {
    constructor(private path: string) {}

    on(name, callback) {
        var req = {
            action: "query",
            path: this.path
        }

        eventEmitter.on(`${this.path}`, callback);

        socket.send(req, (data) => {
            console.log('ack data ',data);            
        });
    }

    once(name, callback) {
        this.on(name, (data) => {
            callback(data)
            this.unregisterPath(name)
        })
    }

    private unregisterPath(evtname) {
        var req = {
            action:"unregister",
            path: this.path
        }

        eventEmitter.off(`${this.path}`)
    }

    set(data) {
        var req = {
            action: "post",
            path: this.path,
            data: data
        }
        socket.send(req, (data) => {
            console.log('set ack data ',data);            
        });
    }

    push(){
        let key = this.path+"/"+new Date().getTime();
        return new Query(key);
    }

    delete(){
        var req = {
            action:"delete",
            path: this.path,
            data:null
        }
        socket.send(req, (data) => {
            console.log('delete ack data ',data);            
        });
    }
}

class Kfclient {
    private initilized: boolean;
    private hostUrl = "http://localhost:3000";
    private socket = null;
    private config = {
        appId: "",
    }
    constructor() {
        this.initilized = false;
    }

    init(config) {
        fetch(`${this.hostUrl}/socket/init`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ namespace: config.appId })
        }).then((data) => {
            console.log(`${data}`);
            this.initilized = true;
            //this.initSocket(config.appId);
            socket = new Socket(config.appId);
        }, (err) => { console.error('failed to initialize socket') })
    }

    private initSocket(appId) {
        if (!this.initilized) { console.error("init the app first"); return; }
        this.socket = io(`${this.hostUrl}/${appId}`, {
            transports: ['websocket']
        });
        this.socket.on('test', function (message) {
            console.log('message form socket ', message);
        });
        this.socket.on('connect', () => {
            console.log('socket is conncted ', this.socket.id);
        });
    }

    ping(messsage) {
        this.socket.emit('test', messsage)
    }

    ref(path: string) {
        return new Query(path);
    }
}

export default new Kfclient();  