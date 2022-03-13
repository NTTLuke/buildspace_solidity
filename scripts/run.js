const main = async () => {

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });

    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
 

    //get contract Balance
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", contractBalance);

    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    // total waves 
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("Total Waves:", waveCount.toNumber());

    //get contract balance after wave
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance after wave:", contractBalance);
    
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    let waveTxn2 = await waveContract.wave("Another message!");
    await waveTxn2.wait();

    
    // const[_, randomPerson] = await hre.ethers.getSigners();
    // //simulate random person 
    // waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    // await waveTxn.wait();

   

};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();