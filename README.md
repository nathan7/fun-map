# fun-map

  a few functional utilities for pretending that JS objects are Clojure string maps.
  like Clojure's impure operations on transients, there are a few mutating functions available with `M` as postfix (for DANGEROUS MUTABLE STUFF, obviously)

## get(obj, key)
## getIn(obj, keys)
## assoc(obj, key, value)
## assocIn(obj, keys, value)
## dissoc(obj, key)

## DANGEROUS IMPURE THINGS
### assocM(obj, key, value)
### assocInM(obj, keys, value)
### dissocM(obj, key)
