
const main = async () => {
  const waveUpgraded = await ethers.getContractFactory('WavePortal');
  let waveBalance = hre.ethers.utils.parseEther("0.001"); 
  console.log('Upgrading Wave Portal...');
  await upgrades.upgradeProxy('0x276C688E2AE7606882BDE26afB4FD78a72a045F4', waveUpgraded, [waveBalance]);
  console.log('Wave upgraded');
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