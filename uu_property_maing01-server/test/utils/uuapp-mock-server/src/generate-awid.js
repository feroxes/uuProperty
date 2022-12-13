const POSSIBLE_CHARS = "0123456789abcdef";

function generateAwid(length = 32) {
  let maxIndex = POSSIBLE_CHARS.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += POSSIBLE_CHARS[Math.floor(Math.random() * maxIndex)];
  }
  return result;
}

module.exports = generateAwid;
