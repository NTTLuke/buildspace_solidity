
const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    
    let balance = hre.ethers.utils.parseEther("0.0001");
    const waveContract = await upgrades.deployProxy(waveContractFactory,
        {
            value: balance,
            initializer: "setup"

        });

    await waveContract.deployed();

    console.log("Account balance: ", accountBalance.toString());
    console.log("WavePortal address: ", waveContract.address);
    
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", contractBalance);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();