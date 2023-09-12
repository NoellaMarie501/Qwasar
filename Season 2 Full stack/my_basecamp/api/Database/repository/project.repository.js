const db = require("../models/connection");
class ProjectRepository {

    static async createProject(name, description) {
        const project = new db.projects.create(name, description);
        if(!project) {
            console.log("REPOSITORY no Project");
        }
        else{
            console.log("REPOSITORY Project: " + project);
        }
        return project;
    }

}

module.exports = ProjectRepository;