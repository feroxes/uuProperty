"use strict";
const APP_CODE = "uu-property-main";

const ValidateHelper = {
  assertionsCount: {
    invalidDtoIn: 3,
    error: 3,
    errorWithParamMap: 4,
  },

  appCodePrefix(param) {
    return `${APP_CODE}/${param}`;
  },

  validateBaseHds(response) {
    expect(response.status).toEqual(200);
    expect(response.uuAppErrorMap).toBeDefined();
    expect(response.uuAppErrorMap).toEqual({});
  },

  validateBaseListResult(response, expectedCount, pageIndex = 0, pageSize = 1000) {
    expect(response.itemList).toBeDefined();
    expect(response.itemList.length).toBe(expectedCount);
    expect(response.pageInfo).toBeDefined();
    expect(response.pageInfo.pageIndex).toBe(pageIndex);
    expect(response.pageInfo.pageSize).toBe(pageSize);
  },

  validateBaseObjectData(response) {
    expect(response.awid).toBeDefined();
    expect(response.sys).toBeDefined();
    expect(response.id).toBeDefined();
    expect(response.sys).toEqual({
      cts: expect.anything(Date),
      mts: expect.anything(Date),
      rev: expect.anything(Number),
    });
  },

  validateWarning(warningMap, expectedWarning) {
    let warning = warningMap[this.appCodePrefix(expectedWarning.code)];
    expect(warning).toBeDefined();
    expect(warning.type).toEqual("warning");
    expect(warning.message).toEqual(expectedWarning.message);
    if (warning.paramMap && expectedWarning.paramMap) {
      expect(warning.paramMap).toEqual(expectedWarning.paramMap);
    }
  },

  validateInvalidDtoIn(response, cmd) {
    expect(response.status).toEqual(400);
    expect(response.message).toEqual("DtoIn is not valid.");
    expect(response.code).toEqual(this.appCodePrefix(`${cmd}/invalidDtoIn`));
  },

  validateError(response, expectedError) {
    expect(response.status).toEqual(400);
    expect(response.message).toEqual(expectedError.message);
    expect(response.code).toEqual(this.appCodePrefix(expectedError.code));
    if (response.paramMap && expectedError.paramMap) {
      expect(response.paramMap).toEqual(expectedError.paramMap);
    }
  },

  validateUnsupportedKeysWarning(response, expectedWarning) {
    expect(response.status).toEqual(200);

    let warning = response.uuAppErrorMap[this.appCodePrefix(expectedWarning.code)];
    let unSupportedKeyList = expectedWarning.unsupportedKeys.map((item) => `$.${item}`);
    expect(warning).toBeDefined();
    expect(warning.type).toEqual("warning");
    expect(warning.message).toEqual(expectedWarning.message);
    if (unSupportedKeyList.length > 0) {
      expect(warning.paramMap).toEqual(
        expect.objectContaining({
          unsupportedKeyList: expect.arrayContaining(unSupportedKeyList),
        })
      );
    }
  },
};

module.exports = ValidateHelper;
