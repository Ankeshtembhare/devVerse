/* eslint-disable no-unused-vars */
import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import {BASE_URL} from "../utills/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../utills/userSlice";


const EditProfile = ({user}) => {
  const [firstName,setFirstName] = useState(user?.firstName);
  const [lastName,setLastName]=useState(user?.lastName);
  const [photoUrl,setPhotoUrl] = useState(user?.photoUrl || "");
  const [age,setAge] = useState(user?.age || "");
  const [gender,setGender] = useState(user?.gender || "");
  const [about,setAbout] = useState(user?.about || "");
  const [error,setError] = useState("");
  const [showToast,setShowToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.put(BASE_URL+"/profile/edit", {
                firstName, lastName, age, gender, photoUrl, about
            }, { withCredentials: true });

            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            
            setTimeout(()=>{
              setShowToast(false);
            },3000);
           
        } catch (err) {
            setError(err?.response?.data);
        }
    };
  return (
    <div className="flex justify-center my-10 ">
          <div className="flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Edit Profile</h2>

          <div className="py-4">
            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">firstName</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">lastname</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
             <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">age</legend>
              <input
                type="number"
                value={age}
                className="input"
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
             <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">gender</legend>
              <input
                type="text"
                value={gender}
                className="input"
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
              <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">about</legend>
              <input
                type="text"
                value={about}
                className="input"
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
              <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">photoUrl</legend>
              <input
                type="text"
                value={photoUrl}
                className="input"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center py-4">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
         </div>
         <UserCard user={{firstName,lastName,about,age,gender,photoUrl}}/>
        {showToast &&(<div className="toast toast-top toast-center">
           <div className="alert alert-success">
            <span>Profile saved successfully.</span>
         </div>
      </div>)}
    </div>
    
  )
}
 
export default EditProfile;