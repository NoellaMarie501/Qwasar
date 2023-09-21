
import fetchUtil from "../utils/hooks/fetchUtils";

export const getProjects = async () =>{
  try {
   
     const response = await fetchUtil.get(`projects/all`);
     console.log("response projects.js:", response.data);
     return response
   } catch (error) {
     console.error('An error occurred while fetching Projects:', error);
   }

  
}
export const getProject = async (project_id) => {
  try {
    const response = await fetchUtil.get(`projects/${project_id}`);
    return response;
  } catch (e) {
    console.log(e);
  }

};
export const deleteProject = async (project_id) => {
   
  try {
    const response = await fetchUtil.delete(`projects/delete${project_id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
export const updateProject = async (project_id,{name, description}) => {
  console.log("name, description", name, description)
  try {
    //console.log(`updating id ${project_id}`);
    const response = await fetchUtil.put(`projects/update${project_id}`, {name,description});
    //return response.json();
  } catch (e) {
    console.log(e);
  }
}



export const createProject = async ({name, description}) => {
  try {
      const response =  await fetchUtil.post('projects/new_project',{name,description});
       console.log(response.data);
      // return response.data;
    } catch (error) {
      console.error(error);
    }
  }
