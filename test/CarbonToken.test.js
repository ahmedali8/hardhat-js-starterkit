const { expect } = require("chai");

const { toWei } = require("./utils.js");

describe("CarbonToken", () => {
  let carbonToken;

  beforeEach(async () => {
    [owner, user, ...accounts] = await ethers.getSigners();

    const CarbonToken = await ethers.getContractFactory("CarbonToken");
    carbonToken = await CarbonToken.deploy();
  });

  describe("CarbonToken Deployment", async () => {
    it("has a name", async () => {
      const name = await carbonToken.name();
      expect(name).to.equal("CARBON");
    });

    it("has a symbol", async () => {
      const symbol = await carbonToken.symbol();
      expect(symbol).to.equal("CRB");
    });

    it("checks if owner has the tokens", async () => {
      const balance = await carbonToken.balanceOf(owner.address);
      expect(balance).to.equal(toWei("300000000"));
    });

    it("sends 100 tokens to user", async () => {
      await carbonToken.connect(owner).faucet(user.address, toWei("100"));
      expect(await carbonToken.balanceOf(user.address)).to.equal(toWei("100"));
    });
  });
});
