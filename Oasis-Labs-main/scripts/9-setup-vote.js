import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    // This is our governance contract.
    const vote = await sdk.getContract("0xc9ED680594F2EdDDBCB007245C1eEFCBbD96708b", "vote");
    // This is our ERC-20 contract.
    const token = await sdk.getContract("0x8dC72d22A5ca36f781d2BE0882b5280478cc9982", "token");
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // This is our governance contract.
    const vote = await sdk.getContract("0xc9ED680594F2EdDDBCB007245C1eEFCBbD96708b", "vote");
    // This is our ERC-20 contract.
    const token = await sdk.getContract("0x8dC72d22A5ca36f781d2BE0882b5280478cc9982", "token");
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 87% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent87 = Number(ownedAmount) / 100 * 87;

    // Transfer 87% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent87
    ); 

    console.log("✅ Successfully transferred " + percent87 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();