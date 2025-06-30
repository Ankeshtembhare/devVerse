
 import { useState } from "react";
 import axios from "axios";
 import { useDispatch } from "react-redux";
 import { addUser } from "../utills/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utills/constants";

const Login = () => {
  const [emailID, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [isLoginForm,setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() =>{

    try{
        const  res = await axios.post( BASE_URL+'/login',{
          emailID,
          password
        },{
          withCredentials:true,
        });
        
        dispatch(addUser(res.data));
        return navigate("/");
    }catch(err){
      setError(err?.response?.data || "Something Went Wrong ..");
    }
  };

  const handleSignup = async()=>{
    try{

      const res = await axios.post(BASE_URL+"/signup"
        ,{firstName,lastName,emailID,password},
      {withCredentials:true});
       dispatch(addUser(res.data.data));
       return navigate("/profile"); 

    }
    catch(err){
       setError(err?.response?.data || "Something Went Wrong ..");
    }
  }

  return (
    <div className="flex justify-center my-6">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">{isLoginForm ? "LOGIN" : "SIGN UP"}</h2>
         
         
          <div className="py-4">
             {!isLoginForm && <>
            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">FIRSTNAME</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">LASTNAME</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
           </>
          }

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">EMAIL</legend>
              <input
                type="text"
                value={emailID}
                className="input"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend my-2 py-2">PASSWORD</legend>
              <input
                type="password"
                value={password}
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500 text-xl">{error}</p>
          <div className="card-actions justify-center py-4">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "LOGIN" : "SIGN UP"}</button>
          </div>
          <p className="cursor-pointer mx-auto" 
          onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm 
          ? "New User ? Sign up Here" 
          : "Exisiting User ? Login here"  }</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
