/* eslint-disable no-unused-vars */
 import axios from "axios";
 import {BASE_URL} from "../utills/constants";
import RealImage from "./RealPhotoUrl";
import { useDispatch } from "react-redux";
import {removeuserFeed} from "../utills/feedSlice";

const UserCard = ({ user }) => {
  const { _id,firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleConnection = async(status,userId)=>{
    try{

      const res = await axios.post(BASE_URL+"/request/send/" + status + "/"+ userId , {} ,{
        withCredentials:true,
      });

      dispatch(removeuserFeed(userId));
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-5 pt-5">
        < RealImage src={photoUrl}
         alt="user-photo"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + ", " + gender}</p>
        <p>{about}</p>
        <div className="card-actions">
          <button className="btn btn-primary" 
          onClick={ ()=> handleConnection("ignored",_id)}>
            Ignored</button>
          <button className="btn btn-secondary"
          onClick={()=> handleConnection("interested",_id)}>
            Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;