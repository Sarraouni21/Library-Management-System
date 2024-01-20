import React, { useEffect, useState } from "react";
import "./Book.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Book from "./Book";

const URL = "http://localhost:5000/books";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }
  }, [navigate]);

  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);

  return (
    <div>
      <ul>
        {books &&
          books.map((book, i) => (
            <li key={i}>
              <Book book={book} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Books;
