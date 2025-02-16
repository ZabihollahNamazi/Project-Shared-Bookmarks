function isArray(userData){
  if (!Array.isArray(userData)) {
    return userData = []; // make sure it is array
  }
  else{return userData;}
}

module.exports = isArray;