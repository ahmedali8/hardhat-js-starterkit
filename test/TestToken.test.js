const { expect } = require("chai");
const { toWei } = require("../utils/index.js");
const { deployContract } = require("../utils/contracts");

describe("TestingContract", () => {
  let token;

  beforeEach(async () => {
    [owner, user, ...accounts] = await ethers.getSigners();
    const args = ["TEST_TOKEN", "TST", toWei("1000000"), owner.address];
    token = await deployContract(owner, "TestingContract", args);
  });

  describe("TestingContract Deployment", async () => {
    it("has a name", async () => {
      const name = await token.name();
      expect(name).to.equal("TEST_TOKEN");
    });

    it("has a symbol", async () => {
      const symbol = await token.symbol();
      expect(symbol).to.equal("TST");
    });

    it("checks if owner has the tokens", async () => {
      const balance = await token.balanceOf(owner.address);
      expect(balance).to.equal(toWei("1000000"));
    });

    it("sends 100 tokens to user", async () => {
      await token.connect(owner).mint(user.address, toWei("100"));
      expect(await token.balanceOf(user.address)).to.equal(toWei("100"));
    });
  });
});
