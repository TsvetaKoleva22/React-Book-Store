import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.css';

import { registerFetch, loginFetch } from './services/auth-service';
import { getAllBooksF, createBookF, editBookF, deleteBookF, buyBookF } from './services/books-service';

import Header from './common/Header';
import Footer from './common/Footer';

import Home from './views/Home';
import About from './views/About';
import Register from './views/Register';
import Login from './views/Login';
import AllBooks from './views/AllBooks';
import Details from './views/Details';
import Create from './views/Create';
import DeleteBook from './views/Delete';
import Edit from './views/Edit';
import MyBooks from './views/MyBooks';
import BuyBookConfirm from './views/Buy';

const NotFound = () => {
  return <h2>UUUUPPS, 404 - Page not found!</h2>
}

const Logout = (props) => {
  props.logout();
  return <Redirect to="/" />
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      isAdmin: false,
      books: [],
      hasFetched: false
    }

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
    this.createBook = this.createBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.buyBook = this.buyBook.bind(this);
  }

  registerUser(userData) {
    registerFetch(userData)
      .then(body => {
        //console.log(body)
        if (!body.success && body.errors) {
          toast.warn(body.message, { closeButton: false });
          for (let er in body.errors) {
            toast.error(body.errors[er], { closeButton: false });
          }
        } else {
          this.loginUser(userData, body.message)
        }
      })
  }

  loginUser(userData, regMessage) {
    loginFetch(userData)
      .then(body => {
        //console.log(body);
        let isAdminCheck = false;

        if (body.success === false && body.errors) { //due to empty fields
          toast.warn(body.message, { closeButton: false });
          for (let er in body.errors) {
            toast.error(body.errors[er], { closeButton: false });
          }
        } else if (body.success === false) { //due to wrong username and/or pass
          toast.error(body.message, { closeButton: false });
        } else {
          //successful login
          sessionStorage.setItem('username', body.user.username);
          sessionStorage.setItem('token', body.token);

          if (body.user.roles.includes('Admin')) {
            sessionStorage.setItem('isAdmin', true);
            isAdminCheck = true;
          } else {
            sessionStorage.setItem('isAdmin', false);
          }

          if (regMessage) {
            toast.success(regMessage, { closeButton: false });
          }
          toast.success(body.message, { closeButton: false });

          this.setState({
            username: body.user.username,
            isAdmin: isAdminCheck
          })
        }
      })
  }

  logout() {
    sessionStorage.clear();
    toast.success('Successfully logged out', { closeButton: false });
    this.setState({
      username: null,
      isAdmin: false
    })
  }

  getAllBooks(mesFromPrevTask) {
    getAllBooksF()
      .then(body => {
        // console.log(body)
        if (mesFromPrevTask) {
          toast.success(mesFromPrevTask, { closeButton: false });
        }
        this.setState({
          books: body,
          hasFetched: false
        })
      })
  }

  createBook(bookData) {
    createBookF(bookData)
      .then(body => {
        //console.log(body);
        if (body) {
          if (body.success === false && body.errors) {
            toast.warn(body.message, { closeButton: false });
            for (let er in body.errors) {
              toast.error(body.errors[er], { closeButton: false });
            }
            this.setState({
              hasFetched: false
            })
          } else if (body.success === false) {
            toast.error(body.message, { closeButton: false });
            this.setState({
              hasFetched: false
            })
          } else {
            this.setState({
              hasFetched: true
            })
            this.getAllBooks(body.message);
          }
        } else {
          toast.error('Unothorized 401!!!!', { closeButton: false });
          this.setState({
            hasFetched: false
          })
        }
      })
  }

  editBook(bookData, id) {
    editBookF(bookData, id)
      .then(body => {
        // console.log(body);

        if (body) {
          if (body.success === false && body.errors) {
            toast.warn(body.message, { closeButton: false });
            for (let er in body.errors) {
              toast.error(body.errors[er], { closeButton: false });
            }
            this.setState({
              hasFetched: false
            })
          } else if (body.success === false) {
            toast.error(body.message, { closeButton: false });
            this.setState({
              hasFetched: false
            })
          } else {
            this.setState({
              hasFetched: true
            })
            this.getAllBooks(body.message);
          }
        } else {
          toast.error('Unothorized 401!!!!', { closeButton: false });
          this.setState({
            hasFetched: false
          })
        }
      })
  }

  buyBook(bookData, id) {
    buyBookF(bookData, id)
      .then(body => {
        // console.log(body);

        if (body) {
           if (body.success === false) {
            toast.error(body.message, { closeButton: false });
            this.setState({
              hasFetched: false
            })
          } else {
            this.setState({
              hasFetched: true
            })
            this.getAllBooks(body.message);
          }
        } else {
          toast.error('Unothorized 401!!!!', { closeButton: false });
          this.setState({
            hasFetched: false
          })
        }
      })
  }

  deleteBook(id) {
    deleteBookF(id)
      .then(body => {
        //console.log(body);

        if (body) {
          if (body.success === false) {
            toast.error(body.message, { closeButton: false });
            this.setState({
              hasFetched: false
            })
          } else {
            this.setState({
              hasFetched: true
            })
            this.getAllBooks(body.message);
          }
        } else {
          toast.error('Unothorized 401!!!!', { closeButton: false });
          this.setState({
            hasFetched: false
          })
        }
      })
  }


  componentDidMount() {
    this.getAllBooks();
    let currUsername = sessionStorage.getItem('username');
    let currIsAdmin = sessionStorage.getItem('isAdmin');
    if (currIsAdmin === 'true') { //string, not boolean!
      this.setState({
        username: currUsername,
        isAdmin: true
      })
    } else if (currUsername) {
      this.setState({
        username: currUsername,
        isAdmin: false
      })
    } else {
      this.setState({
        username: null,
        isAdmin: false
      })
    }
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Header username={this.state.username} isAdmin={this.state.isAdmin} logout={this.logout} />
        <Switch>
          <Route path='/' exact render={() => (
            <Home {...this.state} />)}
          />
          <Route path='/about' component={About} />

          <Route path='/register' render={() => <Register registerUser={this.registerUser} username={this.state.username} />} />
          <Route path='/login' render={() => <Login loginUser={this.loginUser} username={this.state.username} />} />
          <Route path='/logout' render={() => <Logout logout={this.logout} />} />

          <Route path='/all' render={() => (
            <AllBooks {...this.state} />)}
          />

          <Route path='/details/:bookid' render={(props) => (
            <Details books={this.state.books} {...props} />)}
          />

          <Route path='/create' render={(props) => (
            this.state.isAdmin ?
              (<Create createBook={this.createBook} {...this.state} {...props} />)
              : (<Home {...this.state} />)
          )} />

          <Route path='/edit/:bookid' render={(props) => (
            this.state.isAdmin ?
              (< Edit editBook={this.editBook} books={this.state.books} hasFetched={this.state.hasFetched} {...props} />)
              : (<Home {...this.state} />)
          )} />

          <Route path='/delete/:bookid' render={(props) => (
            this.state.isAdmin ?
              (< DeleteBook deleteBook={this.deleteBook} books={this.state.books} hasFetched={this.state.hasFetched} {...props} />)
              : (<Home {...this.state} />)
          )} />

          <Route path='/buy/:bookid' render={(props) => (
            this.state.username ?
              (< BuyBookConfirm buyBook={this.buyBook} books={this.state.books} hasFetched={this.state.hasFetched} {...props} />)
              : (<Home {...this.state} />)
          )} />
          
          <Route path='/mybooks' render={() => (
            this.state.username ?
              (<MyBooks books={this.state.books} />)
              : (<Home {...this.state} />)
          )} />

          <Route component={NotFound} />

        </Switch>
        <Footer />
      </div>
    );
  }
}


export default App;
