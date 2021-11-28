import axios from "axios";
import React, { useEffect, useState } from "react";
import "./book.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Book = function (props) {
  const isbn = props.books.isbn;
  const hasErrors = props.books.hasErrors;
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(props.books.notes);
  }, [props.books.notes]);

  function handleInputData(value) {
    setNotes(value);
  }
  function handleAdd() {
    const haveRead = props.handleRead();

    axios
      .post("http://localhost:8081/book/add", {
        isbn: props.books.ISBN,
        author:
          props.books.fromDb !== "yes"
            ? props.books.authors
            : props.books.authors.join(","),
        noofPages: props.books.pageCount,
        title: props.books.title,
        haveRead: haveRead ? "Yes" : "No",
        notes: notes,
      })
      .then((response) => {
        console.log(response);
        setNotes(response.data.notes);

        toast("Book added successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        props.handleAdd(response.data);
      })
      .catch((err) => {
        toast("Error in adding book", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  function handleDelete() {
    axios
      .delete(`http://localhost:8081/book/${props.books.ISBN}`)
      .then((response) => {
        toast(response.data, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        props.handleRemove(response.data);
      })
      .catch((err) => {
        toast("Error in deleting book", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  if (props.books.title) {
    return (
      <div className="container-fluid py-5">
        {!hasErrors ? (
          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ISBN</th>
                      <th scope="col">title</th>
                      <th scope="col">authors</th>
                      <th scope="col">pageCount</th>
                      <th scope="col">haveRead</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{isbn}</th>
                      <td>{props.books.title}</td>
                      <td>{props.books.authors}</td>
                      <td>{props.books.pageCount}</td>
                      <td>{props.books.haveRead}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {props.books.fromDb == "yes" ? (
                notes
              ) : (
                <div className="form-group">
                  <label for="exampleFormControlTextarea1">Notes</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => handleInputData(e.target.value)}
                  ></textarea>
                </div>
              )}

              <div className="d-flex justify-content-center">
                {props.books.fromDb !== "yes" ? (
                  <button
                    className="btn btn-outline-success btn-lg btn-block"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                ) : null}

                {props.books.fromDb === "yes" ? (
                  <button
                    className="btn btn-outline-danger btn-lg btn-block"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
};

export default Book;
