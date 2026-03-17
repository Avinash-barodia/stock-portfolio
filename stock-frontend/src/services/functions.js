import { setLoading, setToken } from "../redux/reducers/user"
import api from "../utils/api";

export function login(email,password,navigate){
    return async (dispatch)=>{
      dispatch(setLoading(true));
      try{
       // console.log('reached inside function and now making api call');
        const result=await api.post("/login",{email,password});
       
        console.log('data in functions',result);
        dispatch(setToken(result.data.token));
       // console.log('fine till local storage');
        localStorage.setItem('token',result.data.token);

      }
      catch(error){
        console.log(error.message);
      }
    }
}