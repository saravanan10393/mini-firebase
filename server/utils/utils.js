/**
 * Construct the Js object with supplied data value from given path 
 * 
 * @param {Array<string>} paths 
 * @param {*} value - Value to be assigned in a given path.
 * @returns {Object} - Returns an object filled with given value.
 */
function constructionObjFromPath(paths = [], value) {
    var obj = {};
    var path = paths[0]
    if (paths.length == 1) {
        obj[path] = value;
    } else {
        paths.splice(0, 1);
        obj[path] = constructionObjFromPath(paths, value);
    }
    return obj;
}

/**
 * Merge the updated patch data from server with local version of data obj.
 * 
 * @param {string} path - Path of source object.
 * @param {any} source - Updated data from server to be merged with local version.
 * @param {any} [target=dataFormat] - local version of data object.
 * @returns {Object} - Returns an updated local user data object.
 */
function mergetData(path = "", source = {}, target = {}) {
    var paths = path.split('/');
    var obj = constructionObjFromPath(paths, source);
    return Object.assign(target, obj);
}


/**
 * Retrives the value from object for a given object path.
 * 
 * @param {Array<string>} paths 
 * @param {Object} [targetObj = AppData] 
 * @returns {any} - Returns a matched value for given path from given object.
 */
function getValueForObjectPath(paths = [], targetObj = {}) {
    console.log('paths is ', paths);
    var path = paths[0];
    if (paths.length == 1) {
        return targetObj[paths[0]];
    } else if (paths.length != 0) {
        paths.splice(0, 1);
        return getValueForObjectPath(paths, targetObj[path]);
    }
    return null;
}

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

module.exports = {
    getValueForObjectPath,
    constructionObjFromPath,
    compactObject
}