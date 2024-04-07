import Header from "./Header";
import styles from './UploadCourse.module.css'
import { create } from "@web3-storage/w3up-client";
import { useMoralis, useWeb3Contract } from "react-moralis";
import contractAddress from "../constants/contractAddress.json";
import abi from "../constants/abi.json";
import { useEffect } from "react";
import { useState } from "react";


export default function UploadCourse() {
    const {isWeb3Enabled} = useMoralis();
    const [isFileUploaded,setIsFileUploaded]=useState(false);
    const [directoryCid,setDirectoryCid]=useState("");
    const [fileName,setFileName]=useState("");

    const {runContractFunction:uploadTutorial} = useWeb3Contract({
        abi:abi,
        contractAddress:contractAddress.address,
        functionName:"uploadTutorial",
        params:{_videoHash:""+directoryCid,_title:""+fileName},
    });

    useEffect(() => {
        if(isWeb3Enabled&&isFileUploaded){
            async function upload(){
                await uploadTutorial();
                console.log("Uploaded Tutorial");
                setDirectoryCid("");
                setFileName("");
                setIsFileUploaded(false)
            }          
            upload();
        }
    }, [isFileUploaded]);

    // useEffect(() => {    
    //     if(isWeb3Enabled&&isFileUploaded){
    //         async function upload(){
    //             await uploadTutorial();
    //         }          
    //         upload();
    //         setDirectoryCid("");
    //         setFileName("");
    //         setIsFileUploaded(false);
    //     }
    // }, [isWeb3Enabled,isFileUploaded]);


    function triggerUploadFile(){
        document.getElementById("file").click();
    }
    
    async function uploadFileToWeb3() {
    
        const file = document.getElementById("file").files[0];
        
        if(!file){
            return;
        }
    
        const client = await create();
      
        //await client.createSpace("Minerva");
        const myAccount = await client.login("kutti.vicky399@gmail.com");
        const space = await client.setCurrentSpace('did:key:z6MkvAVBWwuLWF6NnNKgMXbCZJC39Y9LmLPhJzyWrewgohqC')
      
        //await myAccount.provision(space.did());
      
        //await space.save();
        //await client.setCurrentSpace(space.did());
      
        //const recovery = await space.createRecovery(myAccount.did());
        // await client.capability.access.delegate({
        //   space: space.did(),
        //   delegations: [recovery],
        // });
      
        const files = [
            new File([file], file.name, { type: file.type })
        ];
        console.log("Uploading files...");
        const directoryCid = await client.uploadDirectory(files);
        // Convert Uint8Array to string
        console.log("Directory CID:", directoryCid.toString());
    
        //const {isWeb3Enabled} = useMoralis();
    
            // if(isWeb3Enabled){
        setDirectoryCid(directoryCid);
        setFileName(file.name);
        setIsFileUploaded(true);
    }

    return (
        <div>
            <Header />
            <div>
                <input type="file" id="file" hidden onChange={uploadFileToWeb3}/>
                <button type="button" className="btn btn-primary m-2 p-2" onClick={triggerUploadFile}>Upload</button>
            </div>
        </div>
    )
}