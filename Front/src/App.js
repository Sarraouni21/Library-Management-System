import React from "react";
import Header from "./components/Header";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import About from "./components/About";
import BookDetail from "./components/Book/BookDetail";
import Borrow from "./components/Book/Borrow";
import Track from "./components/Track";
import SignupForm from "./components/SignUp";
import SigninForm from "./components/SignIn";

const MainLayout = ({ children }) => (
  <React.Fragment>
    <header>
      <Header />
    </header>
    <main>{children}</main>
  </React.Fragment>
);

const NoHeaderLayout = ({ children }) => <main>{children}</main>;

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Routes>
              <Route index element={<Home />} />
            </Routes>
          </MainLayout>
        }
      />
      <Route
        path="/add"
        element={
          <MainLayout>
            <AddBook />
          </MainLayout>
        }
      />
      <Route
        path="/books"
        element={
          <MainLayout>
            <Books />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/borrow"
        element={
          <MainLayout>
            <Borrow />
          </MainLayout>
        }
      />
      <Route
        path="/track"
        element={
          <MainLayout>
            <Track />
          </MainLayout>
        }
      />
      <Route
        path="/books/:id"
        element={
          <MainLayout>
            <BookDetail />
          </MainLayout>
        }
      />
      {/* Routes without header */}
      <Route
        path="/signup"
        element={
          <NoHeaderLayout>
            <SignupForm />
          </NoHeaderLayout>
        }
      />
      <Route
        path="/login"
        element={
          <NoHeaderLayout>
            <SigninForm />
          </NoHeaderLayout>
        }
      />
    </Routes>
  );
}

export default App;
