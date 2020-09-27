# PairMatch

Blockchain based Game to find matching icons and get rewards

## Inspiration

To build a cool game using Chainlink VRF to generate the Random number for shuffle functionality.

## What it does

A Web3 Game where users find matching cards and claim ERC20 token as rewards. The user starts the game by creating a transaction to the [Smart Contract](https://github.com/Shachindra/PairMatch/blob/master/SmartContract/PairMatch.sol) deployed at [Rinkeby Network](https://rinkeby.etherscan.io/address/0xB8f82E893e5700525e0d24D4f7AD01A99Aea5d49).
This registers the start of the game & requests for the random number from the Chainlink VRF. The Request ID is registered as the GameID which holds the mapping of the Game Stats for the wallet address. On an average, it takes about 2 block confirmations to get the random number after which the overlay is removed, the game timer starts and user can start playing the game. Once the user has finished all the matches, another transaction is made to end the game which results in updating the game stats for the GameID and rewarding 1 ERC20 token to the user's wallet.

Note:
1. Users must select Rinkeby Test Network on their Dapp Browser or Metamask.
2. Users must have sufficient rETH to make the transactions and pay gas fees.
3. If this webpage is opened in a Non-Ethereum browser, User can still play the game but there will be no rewards or game logs created.

## How we built it

HTML, CSS, JavaScript, Solidity, Web3.js, Chainlink

## Challenges we ran into

Slow Response from Blockchain as sometimes it took a long time to get the random number. 

## Accomplishments that we're proud of

Integrate Chainlink VRF, Hosting on Fleek

## What we learned

Chainlink, Game Development

## What's next for PairMatch

1. Multiplayer Gaming
2. Challenge Options
3. ERC1155 Integration so that players can get rare NFTs and fungible tokens rewards based on their gameplay.
4. Multiple card sets to choose from Celebrity, Games, Places, Monuments etc.