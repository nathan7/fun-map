'use strict'; //jshint node:true

exports.get = get
function get(obj, key, fallback) {
  return key in obj
    ? obj[key]
    : fallback
}

exports.getIn = getIn
function getIn(obj, keys, fallback) { keys = keys.slice()
  var key = keys.shift()
  return keys.length
    ? getIn(get(obj, key, {}), keys, fallback)
    : get(obj, key, fallback)
}


exports.assoc = assoc
function assoc(obj, key, value) {
  var ret = {}
  Object.keys(obj).forEach(function(key) { ret[key] = obj[key] })
  ret[key] = value
  return ret
}

exports.assocIn = assocIn
function assocIn(obj, keys, value) { keys = keys.slice()
  var key = keys.shift()
  return keys.length
    ? assoc(obj, key, assoc(obj[key] || {}, keys, value))
    : assoc(obj, key, value)
}

exports.dissoc = dissoc
function dissoc(obj, key) {
  var ret = {}
  Object.keys(obj)
    .filter(function(curKey) { return curKey !== key })
    .forEach(function(key) { ret[key] = obj[key] })
  return ret
}

// mutations ahead!

exports.assocInM = assocInM
function assocInM(obj, keys, value) { keys = keys.slice()
  var key = keys.shift()
  return keys.length
    ? assocM(obj, key, assocM(obj[key] || {}, keys, value))
    : assocM(obj, key, value)
}

exports.assocM = assocM
function assocM(obj, key, value) {
  obj[key] = value
  return obj
}

exports.dissocM = dissocM
function dissocM(obj, key) {
  delete obj[key]
  return obj
}
