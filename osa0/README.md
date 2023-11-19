# Part0 assignments

## Assignment 0.4

The sequence is almost identical to just refreshing the page: there's just an extra HTTP-request (POST) at the start.
```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: The server executes code that appends text from the POST request's payload into the list of notes.
    server-->>browser: Redirect to location /exampleapp/notes
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ content: "", date: ""}, ... ]
    deactivate server    
```

## Assignment 0.5

Almost identical to refreshing "/exampleapp/notes", all the resources just get loaded one by one. 

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: the HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file (this time spa.js instead of main.js, which does essentially the same for now)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ content: "", date: ""}, ... ] (the same JSON-file as with the non-single-app version)
    deactivate server
```

## Assignment 0.6

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Executing the javascript code appends the data to the list and re-renders the list, then sends a POST request to update the list on server-side.
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status 201 created, {"message":"note created"} 
    deactivate server
```
