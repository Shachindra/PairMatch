pragma solidity 0.6.6;

import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.6/VRFConsumerBase.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

// Rinkeby Deployment 0x53D4344e9bF0685bF1E0F09B345e9bd1A83bc331
contract PairMatch is ERC20 {
    
    struct Game {
        uint256 startTime;
        uint256 endTime;
        uint movesMade;
        uint timeTaken;
    }
    RandomNumberConsumer randomNumberGeneratorContract;
    
    event StartGame(address indexed gamer, bytes32 indexed gameID, uint256 startTime);
    event GameOver(address indexed gamer, bytes32 indexed gameID, uint256 endTime, uint movesMade, uint timeTaken);
    
    mapping(address => mapping(bytes32 => Game)) public Games;
    
    constructor(string memory name, string memory symbol, uint256 initialSupply, address _randomNumberGeneratorContract) public ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        randomNumberGeneratorContract = RandomNumberConsumer(_randomNumberGeneratorContract);
    }
    
    function startGame(uint256 _startTime) public returns (bytes32 gameID) {
        bytes32 _gameID = randomNumberGeneratorContract.getRandomNumber(_startTime);
        Game memory newGame = Game({
            startTime: _startTime,
            endTime: 0,
            movesMade: 0,
            timeTaken: 0
        });
        Games[msg.sender][_gameID] = newGame;
        emit StartGame(msg.sender, _gameID, _startTime);
        return _gameID;
    }
    
    function gameOver(bytes32 _gameID, uint256 _endTime, uint _movesMade, uint _timeTaken) public virtual {
        Games[msg.sender][_gameID].endTime = _endTime;
        Games[msg.sender][_gameID].movesMade = _movesMade;
        Games[msg.sender][_gameID].timeTaken = _timeTaken;
        _mint(msg.sender, 1 * 10 ** 18);
        emit GameOver(msg.sender, _gameID, _endTime, _movesMade, _timeTaken);
    }
}

// Rinkeby Deployment 0xeB9fe27CeB59B34144121333DeB7768138EE4F99
contract RandomNumberConsumer is VRFConsumerBase {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    
    uint256 public randomResult;
    
    event RequestRandomness(bytes32 indexed requestId, bytes32 keyHash, uint256 seed);
    event RequestRandomnessFulfilled(bytes32 indexed requestId, uint256 randomness);

    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Rinkeby
     * Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     */
    constructor() 
        VRFConsumerBase(
            0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, // VRF Coordinator
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709  // LINK Token
        ) public
    {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        
    }
    
    /** 
     * Requests randomness based on the user input
     */
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) > fee, "Not enough LINK - fill contract with faucet");
        uint256 seed = uint256(keccak256(abi.encode(userProvidedSeed, blockhash(block.number)))); // Hash user seed and blockhash
        bytes32 _requestId = requestRandomness(keyHash, fee, seed);
        emit RequestRandomness(_requestId, keyHash, seed);
        return _requestId;
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
        emit RequestRandomnessFulfilled(requestId, randomness);
    }
}