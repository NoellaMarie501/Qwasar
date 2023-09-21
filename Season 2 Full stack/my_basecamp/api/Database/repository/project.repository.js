const db = require("../models/connection");
class ProjectRepository {

    //cresting new project
    static async createProject(name, description, userId) {
       console.log("userid", userId);
        const project =  db.projects.create({name, description, UserId: userId});
        if(!project) {
            console.log("REPOSITORY no Project");
        }
        else{
            console.log("REPOSITORY Project: " + project);
        } 
        return project; 
       
    }

  //finding project by id
    static async findProjectById(id){
        const project = await db.projects.findByPk(id);

        if(!project) {
          return "Project Not found";
        }
        return project;
      
    }
  
    //updating project
    static async updateProject(id, options){
        //checking if Project exist first before updating
        const project = await this.findProjectById(id);
        if(!project) {
         return "Project Not found";
        }
  
          //updating Project with the options
        await db.projects.update(options, {
                  where: { id : project.id}
        });
       
        
        //getting back the updated Project to be sure it was updated
        const updatedProject = await this.findProjectById(project.id);
  
        return updatedProject;
    }
    
    //getting all projects
    static async allProjects(){

        //getting all pojects
        const allProjects = await db.projects.findAll();
        
        return allProjects;
    }

     //deleting a project with id
     static async deleteProject(id){
        const project = await db.projects.findByPk(id);
        if(!project){
            return null
        }
        //getting all pojects 
        const deletedNUm = await db.projects.destroy({
                where: {
                    id: project.id
                }
        });
        //console.log("del",deletedNUm);
        if(!deletedNUm){
            return null
        }
            return deletedNUm;
    }

}


// let noel = ProjectRepository.findProjectById(1);
// console.log(noel);
module.exports = ProjectRepository;