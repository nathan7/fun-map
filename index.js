'use strict'; //jshint node:true
var has = {}.hasOwnProperty
  , slice = [].slice

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
  for (var curKey in obj) if (has.call(obj, curKey))
    ret[curKey] = obj[curKey]
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
  for (var curKey in obj) if (has.call(obj, curKey))
    if (curKey !== key)
      ret[curKey] = obj[curKey]
  return ret
}

exports.merge = merge
function merge(obj, src) {
  return reduce(_mergeM, {}, slice.call(arguments))
}

exports.zipmap = zipmap
function zipmap(keys, vals) {
  var ret = {}
  for (var i = 0, len = keys.length; i < len; i++)
    ret[keys[i]] = vals[i]
  return ret
}

exports.selectKeys = selectKeys
function selectKeys(obj, keys) {
  var ret = {}
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i]
    if (has.call(obj, key))
      ret[key] = obj[key]
  }
  return ret
}

var keys = exports.keys = Object.keys || function keys(obj) {
  var ret = []
  for (var key in obj) if (has.call(obj, key))
    ret.push(key)
  return ret
}

exports.vals = vals
function vals(obj) {
  var ret = []
  for (var key in obj) if (has.call(obj, key))
    ret.push(obj[key])
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

exports.mergeM = mergeM
function mergeM(obj, src) {
  return arguments.length === 2
    ? _mergeM(obj, src)
    : reduce(_mergeM, obj, slice.call(arguments, 1))
}

function _mergeM(obj, src) {
  for (var key in src) if (has.call(src, key))
    obj[key] = src[key]
  return obj
}

function reduce(fn, initial, values) {
  var acc = initial
  for (var i = 0, len = values.length; i < len; i++)
    acc = fn(acc, values[i])
  return acc
}
