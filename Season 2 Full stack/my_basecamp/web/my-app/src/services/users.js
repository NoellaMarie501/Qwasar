import fetchUtil from "../utils/hooks/fetchUtils";
import Cookies from "js-cookie";

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
    const response = await fetchUtil.delete(`users/${user_id}`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
}
export const updateUser = async (user_id,{username, fiirstname, lastname, email}) => {
  try {
    const response = await fetchUtil.put(`users/${user_id}`, {username: username, fiirstname: fiirstname, lastname: lastname, email: email});
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export const login = async ({email,password, navigate}) =>{
  try {
      //const response = await axios.post(`${API_URL}/users/signin`, {email: email, password: password});
      const response = await fetchUtil.post('users/signin', {email: email, password: password});
      console.log(response.data.token);

      const { token } = response.data;

      // Save the token in a cookie
      Cookies.set('token', token, { expires: 0.01 }); // Set the expiration time as per your requirement
      navigate('/index');
      
  
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
