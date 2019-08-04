# React-Book-Store
### Workshop project for a bookstore application with a server


The project is a ReactJS application representing a simple book store and a local server built using Express, Node.js and MongoDB for the database. 

The app supports JWT authentication, error handling, form validation and notification messages(using React Toastify). Its styling is enhanced with Bootstrap. 

It supports **admin functionality**, as well as logged in users and simply visitors. The Admin is seeded at the start of the application. His role is to create and manage a collection of books. He can create new books, edit existing ones and/or delete them. 

The random **visitors** can only see the Landing(Home) page, the All Books page, the Details page and can Register or Log in. 

The **logged in users** can now buy any of the available books. When a book is bought, it is no longer available and is not listed on the Home page and All Books page. It cannot be bought, edited or deleted. The logged in users can also view their profile with the books they have purchased and logout.

