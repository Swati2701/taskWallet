/* eslint-disable */

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers')

const ROPSTEN_PRIVATE_KEY = "d395faef5f6ab28002dbae9768933eaecf16d842c8fb430009208c5bd6f6ebbb";
 
module.exports = {
  solidity:  "0.8.0",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/399090f72f2c492c9bfcff17155c30c2"`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
  },
};
