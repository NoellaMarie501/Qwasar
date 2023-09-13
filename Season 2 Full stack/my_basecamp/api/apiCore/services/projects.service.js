const { ProjectRepository } = require("../../Database/export_classes");

class ProjectService{

     static async createProject(name, description){
     
       const Project = await ProjectRepository.createProject(name, description);
       return Project;
     }
    
}

module.exports = ProjectService;