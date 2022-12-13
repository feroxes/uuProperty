const KEY_REGEX = /Content-Disposition: form-data; name="([a-zA-Z0-9]+)"/;
const TYPE_REGEX = /Content-Type: ([a-zA-Z0-9/-]+)/;
const SUFFIX_REGEX = /^(-)+|(-)+$/;

function processMultipart(headers, body) {
  let contentType = headers["content-type"] || "";
  // not multipart ... skip it
  if (!contentType.startsWith("multipart/form-data")) return body;

  // find boundary
  let startIndex = contentType.indexOf("=");
  if (startIndex < 0) return body;
  let boundary = contentType.substr(startIndex + 1);

  let dto = {};

  let parts = body.split(boundary);
  for (let part of parts) {
    let keyResult = part.match(KEY_REGEX);
    if (!keyResult) continue;
    let typeResult = part.match(TYPE_REGEX);
    part = part.replace(KEY_REGEX, "");
    part = part.replace(TYPE_REGEX, "");
    part = part.replace(SUFFIX_REGEX, "");

    let value = part.trim();
    let key = keyResult[1];
    let type = typeResult ? typeResult[1] : null;
    dto[key] = transformValue(value, type);
  }

  return dto;
}

function transformValue(value, type) {
  if (!type) return value;
  switch (type) {
    case "application/json":
      return handleJSONValue(value);
    case "":
      return value;
    default:
      // FIXME: actual binary value
      // for now it throws away the data and mocks it with predefined value in base64
      // eslint-disable-next-line no-case-declarations
      let buff = new Buffer("binaryValue");
      return buff.toString("base64");
  }
}

function handleJSONValue(value) {
  switch (value) {
    case "null":
      return null;
    default:
      return value;
  }
}

module.exports = {
  processMultipart,
};
