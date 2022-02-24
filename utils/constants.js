"use strict";

const { toBN } = require("./format");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const ZERO_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const MAX_UINT256 = toBN(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);

module.exports = {
  ZERO_ADDRESS,
  ZERO_BYTES32,
  MAX_UINT256,
};
