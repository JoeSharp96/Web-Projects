const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());
const fs = require('fs');
const PORT = process.env.PORT || 3001

function getProjects(){
    const content = fs.readFileSync('webProjects.json');
    return JSON.parse(content);
}

function addProject(obj){
    const projects = getProjects();
    projects.push(obj);
    fs.writeFileSync('webProjects.json', JSON.stringify(projects));
}

function deleteProject(index){
    const projects = getProjects();
    projects.splice(index, 1);
    fs.writeFileSync('webProjects.json', JSON.stringify(projects));

}

function updateProject(value, index){
    const projects = getProjects();
    projects[index] = value;
    fs.writeFileSync('webProjects.json', JSON.stringify(projects));
}

// Displays current projects
app.get('/api', (req, res) => {
    const content = getProjects();
    res.send(content)
})

// Add new project
app.post('/webProjects', (req, res) => {
    const content = req.body;
    addProject(content);
    res.send(content)
})

// Deletes project from file
app.delete('/webProjects/:index', (req, res) => {
    const index = req.params.index;
    const projects = getProjects();
    if (projects[index]) {
        deleteProject(index)
        res.send("Project deleted");
    } else {
        res.send("No project at index number");
    }
})

// Updates a project from file
app.put('/webProjects/:index', (req, res) => {
    const obj = req.body;
    const index = req.params.index;
    const projects = getProjects();
    if (projects[index]) {    
        updateProject(obj, index);
        res.send("Updated")
    } else {
        res.send("Index number not valid.")
    }
})

app.listen(PORT, function () {

});