/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useDispatch, useSelector } from "react-redux";
import {addRequests,  removeRequest} from "../utills/requestSlice";
import { useEffect} from "react";
import RealImage from "./RealPhotoUrl";

 

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store)=>store.requests);

  const reviewRequest = async(status,_id)=>{
    try{
      const res = await axios.post(
        BASE_URL+"/request/review/"+ status+"/"+_id ,{},{
          withCredentials:true,
        }
      );

      dispatch(removeRequest(_id));
      

    }catch(err){

      console.log(err.message);

    }
  };

 

  const fetchRequest = async()=>{
    try{
      const res = await axios.get(BASE_URL + "/user/request/received",{
        withCredentials:true,
      });
      dispatch(addRequests(res.data.data));
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    fetchRequest();
  },[]);

    if(!request)return ;

    
    if(request.length === 0) return <h1 className="text-2xl font-bold text-center my-10">No Request Found</h1>;
   
  return (
    <div className="my-10 text-center ">
        <h1 className="font-bold text-2xl">Connection Requests</h1>
        {request.map((request) =>{
            const{_id,firstName,lastName,age,gender,about,photoUrl}=request.fromUserId;
           return(
            <div key={_id} className="m-4 p-4 flex justify-between items-center bg-base-300 rounded-lg w-2/3 mx-auto">
                <div>
                     <RealImage alt="photo" className=" w-20 h-20 rounded-full "src={photoUrl}/>
                </div> 
                <div className="text-left mx-10 ">
                   <h2 className="font-bold">{firstName + " " + lastName}</h2>
                   {age && gender && <p>{gender + "," + age}</p>}
                   <p>{about}</p>
                </div>

                <div className="">
                  <button className="btn btn-primary mx-2"
                   onClick={()=> reviewRequest("rejected",request._id)}>
                    Reject</button>
                  <button className="btn btn-secondary mx-2" 
                  onClick={()=> reviewRequest("accepted",request._id)}>
                    Accept</button>  
                </div>
               
            </div>
           );
        })}
    </div>
  );
};

export default Requests;