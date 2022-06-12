"use strict";

const { formatUnits, parseUnits } = require("@ethersproject/units");
const { BigNumber } = require("@ethersproject/bignumber");

/**
 * Return the `labelValue` converted to string as Billions, Millions, Thousands etc.
 *
 * @param labelValue number.
 * @return string value or undefined.
 */
function convertToInternationalCurrencySystem(labelValue) {
  if (!labelValue) {
    return undefined;
  }
  // Nine Zeroes for Billions
  if (Math.abs(Number(labelValue)) >= 1000000000) {
    return (
      (Math.abs(Number(labelValue)) / 1000000000)
        .toFixed(2)
        .replace(/\.?0+$/, "") + " B"
    );
  }
  // Six Zeroes for Millions
  else if (Math.abs(Number(labelValue)) >= 1000000) {
    return (
      (Math.abs(Number(labelValue)) / 1000000)
        .toFixed(2)
        .replace(/\.?0+$/, "") + " M"
    );
  }
  // Three Zeroes for Thousands
  else if (Math.abs(Number(labelValue)) >= 1000) {
    return (
      (Math.abs(Number(labelValue)) / 1000).toFixed(2).replace(/\.?0+$/, "") +
      " K"
    );
  } else {
    return Math.abs(Number(labelValue)).toString();
  }
}

/**
 * Return the `value` converted to string and removing the end unnecessary zeros.
 *
 * @param value number.
 * @return string value or undefined.
 */
function omitEndZeros(value) {
  if (!value) return undefined;
  return value.toString().replace(/\.?0+$/, "");
}

/**
 * Return the `value` converted to BigNumber.
 *
 * @param value string value.
 * @return BigNumber value.
 */
function toBN(value) {
  return BigNumber.from(value);
}

/**
 * Return the `value` converted to string.
 *
 * @param value number.
 * @param precision fractionDecimals.
 * @return string value or undefined.
 */
function numToFix(value, precision = 4) {
  if (!value) return undefined;

  return value.toFixed(precision);
}

/**
/**
 * Return the `gasPrice` converted to gwei.
 * formatUnits(value: BigNumberish, unitName?: BigNumberish | undefined): string
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param gasPrice BigNumberish value to be converted, preferred is BigNumber.
 * @return string value or undefined.
 */
function toGwei(gasPrice) {
  return formatUnits(gasPrice, "gwei");
}

/**
 * Return the `value` converted to BigNumber wei.
 * parseUnits(value: string, unitName?: BigNumberish | undefined): BigNumber
 * BigNumberish -> string, BytesLike, BigNumber, number or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value the string value to be converted.
 * @param decimals decimal value or BigNumberish.
 * @return BigNumber value.
 */
function toWei(value = "", decimals = 18) {
  return parseUnits(value, decimals);
}

/**
 * Return the `value` converted to string from wei.
 * formatUnits(value: BigNumberish, unitName?: BigNumberish | undefined): string
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value BigNumberish value to be converted, preferred is BigNumber.
 * @param decimals decimal value or BigNumberish.
 * @return string value.
 */
function fromWei(value, decimals = 18) {
  return formatUnits(value, decimals);
}

/**
 * Return the `value` converted to number from wei.
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value BigNumberish value to be converted, preferred is BigNumber.
 * @param decimals decimal value or BigNumberish.
 * @return number value or undefined.
 */
function fromWeiToNum(value, decimals = 18) {
  if (!value) return undefined;

  const fromWeiString = fromWei(value, decimals) ?? "";
  return parseFloat(fromWeiString);
}

/**
 * Return the `value` converted to fixed point number.
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value BigNumberish value to be converted, preferred is BigNumber.
 * @param decimals decimal value or BigNumberish.
 * @param precision fractionDecimals.
 * @return number value or undefined.
 */
function fromWeiToFixedNum(value, decimals = 18, precision = 4) {
  if (!value) return undefined;

  const fromWeiNum = fromWeiToNum(value, decimals) ?? 0;
  const fromWeiNumToFixed = numToFix(fromWeiNum, precision) ?? "";

  return parseFloat(fromWeiNumToFixed);
}

/**
 * Calculates percentage according to `bn` and `percent`.
 * @param {*} bn bignumber
 * @param {*} percent percentage value
 * @returns
 */
function calculatePercentage(bn, percent) {
  return bn.mul(percent).div("100");
}

module.exports = {
  convertToInternationalCurrencySystem,
  omitEndZeros,
  toBN,
  numToFix,
  toGwei,
  toWei,
  fromWei,
  fromWeiToNum,
  fromWeiToFixedNum,
  calculatePercentage,
};
