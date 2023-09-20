import Cookies from "js-cookie";
import fetchUtil from "../utils/hooks/fetchUtils";

export const getUsers = async () =>{
  try {
    
     const response = await fetchUtil.get(`users/all`);
     console.log("response users.js:", response.data);
     return response
   } catch (error) {
     console.error('An error occurred while fetching Users:', error);
   }
}
export const getUser = async (user_id) => {
  try {
    const response = await fetchUtil.get(`users/${user_id}`);
    return response.json();
  } catch (e) {
    console.log(e);
  }

};
export const deleteUser = async (user_id) => {
   
  try {
    const response = await fetchUtil.delete(`users/delete${user_id}`);
  } catch (e) {
    console.log(e);
  }
}
export const updateUser = async (user_id,{username, firstname, lastname, email}) => {
  console.log("username, fiirstname, lastname, email", username, firstname, lastname, email)
  try {
    //console.log(`updating id ${user_id}`);
    const response = await fetchUtil.put(`users/update${user_id}`, {username, firstname, lastname, email});
    //return response.json();
  } catch (e) {
    console.log(e);
  }
}

export const login = async ({email, password, navigate}) =>{
  try {
      //const response = await axios.post(`${API_URL}/users/signin`, {email: email, password: password});
      const response = await fetchUtil.post('users/signin', {email: email, password: password});
      console.log(response.data);

      const { token } = response.data;

    if(token){
      // Save the token in a cookie
      Cookies.set('token', token, { expires: 0.01 }); // Set the expiration time as per your requirement
      navigate('/index');
    }
    else{
      return response.data
    }
      
      
  
    } catch (error) {
      console.error(error);
    }
}

export const register = async ({username, password, firstname, lastname, email}) => {
  try {
      const response =  await fetchUtil.post('users/register',{username, password, firstname, lastname, email});
       console.log(response.data);
      // return response.data;
    } catch (error) {
      console.error(error);
    }
  }
