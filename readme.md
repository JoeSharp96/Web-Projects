# HyperionDev WD T53

This is a RESTful API created using Express that allows a user to store a list of 'Web project' items. By using [Postman](https://www.postman.com/), the user can add, edit, and delete entries.

## Add a project

1. Set the request method to POST
2. Set the url in Postman to http://localhost:8080/webProjects/:title/:description/:url.
    * _Note, change the parameters after /webprojects/ to desired values._
3. Send request via Postman

## View projects

1. Set the request method to GET
2. Set the url in Postman to http://localhost:8080/api and send the request.
3. Postman will return an array of objects submitted.

## Edit a project

1. Set the request method to PUT.
2. Set the url in Postman to http://localhost:8080/webProjects/:index/?queryString=response
    * Change :index to index number of project you would like to edit.
    * Project values can be updated using a query string. Please note, only one value can be udpated per request. Query strings available to update:
        * Title: ?title=New title
        * Description: ?description=New description
        * URL: ?url=New URL

## Delete a project

1. Set the request method to DELETE.
2. Set the URL in Postman to http://localhost:8080/webProjects/:index
    * Change :index to index number of project you would like to delete.