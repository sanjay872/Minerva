const  {ethers} =require('hardhat');
const { writeFileSync} = require("fs-extra")

const FRONT_END_PATH_ADDRESS = "../../../minervaclient/pages/constants/contractAddress.json";
const FRONT_END_PATH_ABI = "../../../minervaclient/pages/constants/abi.json";

function updateFrontEnd(){
    updateContractAddress();
    updateABI();
}

async function updateABI(){
    const minerva=await ethers.getContractFactory("Minerva");
    const abi=minerva.interface.format("json");
    console.log("ABI: ",abi);
    writeFileSync(FRONT_END_PATH_ABI,JSON.stringify(abi));
}

async function updateContractAddress(){
    const minerva=await ethers.getContractFactory("Minerva");
    const contractAddress=minerva.address;
    console.log("Contract Address: ",contractAddress);
    writeFileSync(FRONT_END_PATH_ADDRESS,JSON.stringify({"address":contractAddress}));
}

updateFrontEnd();