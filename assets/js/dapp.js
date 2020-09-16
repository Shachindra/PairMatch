// const IPFS = IpfsApi;
// const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// Inject our version of web3.js into the DApp.
window.addEventListener('load', async() => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({ /* ... */ });
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({ /* ... */ });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. Install MetaMask to continue!');
    }
})

function checkNetwork() {
    web3.eth.net.getNetworkType((err, netId) => {
        switch (netId) {
            case "main":
                console.log('The Mainnet');
                break
            case "ropsten":
                console.log('Ropsten Test Network');
                break
            case "kovan":
                console.log('Kovan Test Network');
                break
            case "rinkeby":
                console.log('Rinkeby Test Network');
                break
            default:
                console.log('This is an Unknown Network');
        }
        if (netId != "rinkeby") {
            alert("Please connect to Rinkeby Testnet to Continue!");
        } else {
            console.log("Connected to Rinkeby Testnet!");
        }
    });
}

function getCoinbase() {
    return new Promise(resolve => {
        web3.eth.getCoinbase((error, result) => {
            if (!error) {
                console.log("Coinbase: " + result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}


function getETHBalance() {
    return new Promise(resolve => {
        web3.eth.getBalance(walletAddress, (error, result) => {
            if (!error) {
                console.log(web3.utils.fromWei(result, "ether"));
                resolve(web3.utils.fromWei(result, "ether"));
            } else {
                resolve(error);
            }
        });
    });
}


async function fetchAccountDetails() {
    // Fetch the Account Details
    window.walletAddress = await getCoinbase();
    document.getElementById('accountAddress').innerHTML = walletAddress;
    let walletETHBalance = await getETHBalance();
    document.getElementById('etherBalance').innerHTML = walletETHBalance;
}