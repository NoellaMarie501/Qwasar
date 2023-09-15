const { ProjectRepository } = require("../../Database/export_classes");

class ProjectService{

  //Method to create a new project
  static async createProject(name, description){
   
    const Project = await ProjectRepository.createProject(name, description);
    return Project;
  }

  //method to update project
  static async UpdateProject(id, options) {
        
    const project = await ProjectRepository.updateProject(id, options);
    if(!project) {
      return "Project not found";
    }
     
    return project;
  }

  static async GetProject(id){
    
    const project = await ProjectRepository.findProjectById(id);
    if(!project) {
      return "Project not found";
    }
    //console.log("project",project)
    return project;

  }
  static async Projects(id){
    
    const projects = await ProjectRepository.allProjects(id);
    if(!projects) {
      return "Projects not found";
    }
    //console.log("project",projects)
    return projects;

  }

  static async DeleteProject(id){
    
    const projects = await ProjectRepository.deleteProject(id);
    if(!projects) {
      return null;
    }
   // console.log("project",projects)
    return projects;

  }
    
}

module.exports = ProjectService;