import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Projects() {
    // State for Modal popup
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // State for form projectName content
    const [projectName, setName] = useState("");
    const updateName = (event) => setName(event.target.value)

    // State for form description content
    const [projectDesc, setDesc] = useState("");
    const updateDesc = (event) => setDesc(event.target.value)

    // State for form url content
    const [projectURL, setURL] = useState("");
    const updateURL = (event) => setURL(event.target.value)

    const resetFields = () => {
        setName("");
        setDesc("");
        setURL("");
        setNum("");
    }

    // Creates new project post
    const submitProject = (event) => {
        event.preventDefault();
        const project = {
            title: projectName,
            description: projectDesc,
            url: projectURL
        };

        fetch('/webProjects', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project)
        })
        .then((data) => data.json())

        handleClose();
        resetFields();
        getData();
    }

    // Deletes project
    const deleteProject = (event) => {
        event.preventDefault();
        const id = event.target.parentElement.parentElement.id;
        fetch(`/webProjects/${id}`, {
            method: "DELETE"
        })
        getData();
    }

    // Section for editing projects
    const [editIndexNum, setNum] = useState()
    // Edit modal state toggle
    const [showEdit, setShowEdit] = useState(false);
    const editHandleClose = () => {
        setShowEdit(false);
        resetFields();
    };
    const editHandleShow = () => setShowEdit(true);
    
    // Sets index number of object to edit and content in edit form.
    const editModalSettings = (event) => {
        event.preventDefault();
        const id = event.target.parentElement.parentElement.id;
        setNum(id);
        setDesc(projects[id].description);
        setName(projects[id].title);
        setURL(projects[id].url);
        editHandleShow();
    }

    // Sends edits to specified project
    const editProject = (event) => {
        event.preventDefault();
        const project = {
            title: projectName,
            description: projectDesc,
            url: projectURL
        };

        fetch(`/webProjects/${editIndexNum}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project)
        })
        .then((data) => data.json())

        editHandleClose();
        getData();
    }

    // Updates list of projects
    const [projects, setProjects] = useState([]);
    // getData called after every function call to update list
    const getData = async () => {
        try {
            const response = await fetch("/api");
            const json = await response.json();
            setProjects(json);
        } catch(error) {
            console.log('Unable to load content', error)
        }
    };

    useEffect(() => {
        getData();
    },[]);

    return (
        <Container>
            <Row xl={4} className='project-list'>
                {projects.map((projectItem, index) => (
                    <Col className='p-1' key={index} id={index}>
                        <div className='project-item py-5 px-3'>
                            <p>Name: {projectItem.title}</p>
                            <p>Description: {projectItem.description}</p>
                            <p>URL: <a href={projectItem.url}>{projectItem.url}</a></p>
                            <Button variant='primary' onClick={deleteProject}>Delete</Button>
                            <Button variant='secondary' onClick={editModalSettings}>Edit</Button>
                        </div>
                    </Col>
                ))}
                <Col className='p-1'>
                    <div className='project-item-default py-5'>
                        <p>Add a new project</p>
                        <span className='add-project' onClick={handleShow}>+</span>
                    </div>
                    {/* Modal contains form for creating a new project */}
                    <Modal
                        show={show} 
                        onHide={handleClose}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add a new project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className='mb-3'controlId='project-name'>
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control type='input' placeholder='Enter name here' value={projectName} onChange={updateName}></Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as='textarea' rows={3} placeholder='Enter a short description of the project' value={projectDesc} onChange={updateDesc}></Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='description'>
                                    <Form.Label>URL</Form.Label>
                                    <Form.Control type='url' placeholder='Add the project URL' value={projectURL} onChange={updateURL}></Form.Control>
                                </Form.Group>
                                <Button variant='primary' type='button' onClick={submitProject}>Submit</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    {/* Modal contains form for updating an exisitng project */}
                    <Modal
                        show={showEdit} 
                        onHide={editHandleClose}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Edit project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className='mb-3'controlId='project-name'>
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control type='input' placeholder='Enter name here' value={projectName} onChange={updateName}></Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as='textarea' rows={3} placeholder='Enter a short description of the project' value={projectDesc} onChange={updateDesc}></Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='description'>
                                    <Form.Label>URL</Form.Label>
                                    <Form.Control type='url' placeholder='Add the project URL' value={projectURL} onChange={updateURL}></Form.Control>
                                </Form.Group>
                                <Button variant='primary' type='button' onClick={editProject}>Submit</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </Container>
    )
};

export default Projects;