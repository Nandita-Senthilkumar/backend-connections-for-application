import axios  from "axios";

const baseURL="http://localhost:4000/";
//this token is obtainEd from app.js
export const validateUser=async(token)=>{
    try {
        const res=await axios.get(`${baseURL}api/users/login`,{
            headers:{
                //Bearer is a prominent type used for accessing token 
                Authorization:"Bearer "+token,
            },
        })
        return res.data;
    } catch (error) {
        
    }
}