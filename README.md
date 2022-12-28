# CRUD App Challenge

## Task:

  Implement a simple single-page web application which manages a collection of books. The
  web application should have a UI consisting of a single HTML web page, and a simple
  backend. The backend provides a REST API with which the UI communicates. We want the
  application to have the following features:

    1. When the web page is loaded, it fetches all the books to a list. The title and the
        author of each book are displayed in the list.
    2. When a book in the list is clicked, it is selected and its author, title and description are
        displayed in a form next to the list.
    3. By inputting data to the form and pressing a button labelled “save new”, the user can
        add new books to the collection.
    4. By editing the form data of an existing book and pressing a button labelled “save”,
        the user can update the data of the book in the collection.
    5. There is also a delete button that can be used to delete a selected book from the
        collection.
    6. All the changes that user has made to the collection must be preserved on a page
        reload.
    7. The application (front and backend) can be started with a single command in terminal

## DEMO

![ezgif com-gif-maker (6)](https://user-images.githubusercontent.com/83179142/209777971-c6eb7f27-c344-47e5-bdcc-f50da1438c67.gif)

## Features

    - Add books,
    - List books,
    - Update books,
    - Delete books,
    - Show more switcher,
    - Success/Error message 5s,
    - Delete Dialog Pop-up Box,
    - Mobile friendly,
    - Input clear after submit,
    - Input error mark individually
    

## How to use it

  After cloning the repository execute on the root folder the following command:

    make start


  Open the browser with the following URL:

      http://localhost:3000/
      
  For the database I used MySQL Workbranch with default credentials and created there a new schema with a table.
  !Note that have to set up for yourself!

### Installation package documentation:

    npm create-react-app
    npm install node
    npm install axios
    npm install cors

    npm install @mui/material @emotion/react @emotion/styled
    npm install @mui/material @mui/styled-engine-sc styled-components
    npm i @emotion/react @emotion/styled
    npm install @fontsource/roboto
    npm install @mui/icons-material


Created by: [Gabor Ulenius](https://github.com/mobahug)



