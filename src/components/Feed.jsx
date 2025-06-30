
import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utills/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";


const Feed = () => {
  const userFeed = useSelector((store)=>store.feed); 
  const dispatch = useDispatch();

  const getFeed = async()=>{

    if(userFeed)return ; 

  try{  
    const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
      dispatch(addFeed(res?.data?.data));
  }
  catch(err){
        //todo redirect to error page and shopw error
        console.log(err);
    }

  };

  useEffect(()=>{
    getFeed();
  },[]);

  if(!userFeed )return;

  if(userFeed.length === 0)return<h1 className="text-2xl font-bold text-center my-10">No New User Found</h1>;

  return (
    userFeed&& (
    <div className="flex justify-center my-14">
        <UserCard user={userFeed[0]}/>
    </div>
    )
  );
};

export default Feed;