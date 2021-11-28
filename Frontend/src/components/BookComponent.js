import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import Book from "./Book";
import "./bookComponent.css";
import "react-toastify/dist/ReactToastify.css";

class BookComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ISBN: "",
      title: "",
      authors: "",
      pageCount: 0,
      haveRead: "",
      readBooks: [],
      fromDb: "",
      hasErrors: false,
      notes: "",
    };
  }

  handleAdd = (value) => {
    this.setState({
      fromDb: "yes",
    });
  };

  handleRemove = (value) => {
    this.setState({
      fromDb: "No",
    });
  };
  handleInputChange = (value) => {
    this.setState({
      ISBN: value,
    });
  };

  handleHaveRead = () => {
    for (let i = 0; i < this.state.readBooks.length; i++) {
      if (this.state.readBooks[i] === this.state.ISBN) {
        return true;
      }
    }
    return false;
  };

  validate = () => {
    const value = this.state.ISBN;
    if (value.length < 13 || value[0] !== "9") {
      toast("Input should be 13 digits long and it should start with 9", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    return true;
  };
  handleSearch = (e) => {
    if (this.validate() === true) {
      this.setState({
        hasErrors: false,
      });
      axios
        .get(`http://localhost:8081/book/${this.state.ISBN}`)
        .then((response) => {
          //console.log(response);
          this.setState({
            isbn: response.data.isbn,
            title: response.data.title,
            authors: response.data.author,
            pageCount: response.data.noofPages,
            haveRead: response.data.haveRead,
            notes: response.data.notes,
            fromDb: "yes",
          });
        })
        .catch((err) => {
          let list1 = [];
          axios
            .get(
              "https://www.googleapis.com/books/v1/users/104692358047678426117/bookshelves/4/volumes"
            )
            .then((response) => {
              response.data.items.map((item) => {
                return item.volumeInfo.industryIdentifiers.map((iden) => {
                  if (iden.type !== "ISBN_10") {
                    list1.push(iden.identifier);
                  }
                });
              });
              this.setState({
                readBooks: list1,
              });
            })
            .then(() => {
              axios
                .get(
                  `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.ISBN}`
                )
                .then((response) => {
                  let list2 = [];
                  response.data.items.map((item) => {
                    item.volumeInfo.industryIdentifiers.map((iden) => {
                      if (iden.type == "ISBN_13") {
                        list2.push(iden.identifier);
                      }
                    });
                  });
                  this.setState({
                    isbn: list2[0],
                    items: response.data.items,
                    title: response.data.items[0].volumeInfo.title,
                    authors:
                      response.data.items[0].volumeInfo.authors.join(","),
                    pageCount: response.data.items[0].volumeInfo.pageCount,
                    haveRead: this.handleHaveRead() ? "Yes" : "No",
                    fromDb: "No",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        });
    } else {
      this.setState({
        hasErrors: true,
      });
      return;
    }
  };
  render() {
    return (
      <div className="container-fluid ">
        <div className="row hero">
          <div className="col">
            <div className="pt-5">
              <div className="input-group mb-3 w-50 mx-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ISBN"
                  name="ISBN"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={this.state.ISBN}
                  onChange={(e) => this.handleInputChange(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-light"
                    type="button"
                    onClick={this.handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Book
          books={this.state}
          handleRead={this.handleHaveRead}
          handleAdd={this.handleAdd}
          handleRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default BookComponent;
