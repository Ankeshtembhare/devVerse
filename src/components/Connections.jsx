import axios from "axios";
import {BASE_URL} from "../utills/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addConnections} from "../utills/connectionSlice";
import RealImage from "./RealPhotoUrl";

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections);
    const fetchConnection = async()=>{

        try{

            const res = await axios.get(BASE_URL  + "/user/connections" , {
                withCredentials:true,
            });

           dispatch(addConnections(res.data.data)); 
             
        }catch(err){
            console.log(err.message);
        }


    };

    useEffect(()=>{
        fetchConnection();
    },[]);

    if(!connections) return;

    if(connections.length === 0) return <h1 className="text-2xl font-bold text-center my-10">No Connections Found</h1>;


  return (
    <div className="my-10 text-center ">
        <h1 className="font-bold text-2xl">Connections</h1>
        {connections.map((connection) =>{
            const{_id,firstName,lastName,age,gender,about,photoUrl}=connection;
           return(
            <div key={_id} className="m-4 p-4 flex  bg-base-300 rounded-lg w-1/2 mx-auto">
                <div>
                     <RealImage alt="photo" className=" w-20 h-20 rounded-full "src={photoUrl}/>
                </div> 
                <div className="text-left mx-10 ">
                   <h2 className="font-bold">{firstName + " " + lastName}</h2>
                   {age && gender && <p>{gender + "," + age}</p>}
                   <p>{about}</p>
                </div>
               
                
            </div>
           )
        })}
    </div>
  )
};

export default Connections;