import Header from "./Header"
import { useMoralis, useWeb3Contract } from "react-moralis";
import contractAddress from "../constants/contractAddress.json";
import abi from "../constants/abi.json";
import { useEffect } from "react";
import { useState } from "react";

export default function ViewCourses() {
    const [tutorials, setTutorials] = useState([]);
    const [tutorialCount, setTutorialCount] = useState(0);
    
    const {isWeb3Enabled} = useMoralis();
    const {runContractFunction:getAllTutorials} = useWeb3Contract({
        abi:abi,
        contractAddress:contractAddress.address,
        functionName:"getAllTutorials"
    });
    const {runContractFunction:getTutorialCount} = useWeb3Contract({
        abi:abi,
        contractAddress:contractAddress.address,
        functionName:"getTutorialCount"
    });

    useEffect(() => {
        if(isWeb3Enabled){
            async function getTutorials(){
                const tutorials=await getAllTutorials();
                console.log("Got Tutorials");
                console.log(tutorials);
                const tutorialsArray=[];
                for(let i=0;i<tutorials.length;i++){
                    tutorialsArray.push({
                        videohash:tutorials[i][1],
                        title:tutorials[i][2]})
                }
                setTutorials(tutorialsArray);
                const tutorialCount=await getTutorialCount();
                console.log("Got Tutorial Count");
                console.log(tutorialCount);
                setTutorialCount(tutorialCount);
            }          
            getTutorials();
        }
    }, [isWeb3Enabled]);

    return (
        <div>
            <Header />
            <div>
                
                <div className="col-12">
                {
                    tutorials.map((tutorial,index) => {
                        return (
                                <div className="card shadow-sm">
                                {/* <img src="/bg.png" className="bd-placeholder-img card-img-top" width="100px" height="200px"  alt="Course Image" /> */}
                                <div className="card-body">
                                <h4>{tutorial.title+"".slice(0,tutorial.title+"".length-5)}</h4>
                                    <p className="card-text">Course Description</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                    <a  className="btn btn-primary" target="_blank" href={`https://${tutorial.videohash}.ipfs.w3s.link/${tutorial.title}`}> View the course</a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}