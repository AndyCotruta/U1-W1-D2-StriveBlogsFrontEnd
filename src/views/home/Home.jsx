import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = (props) => {
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Epicode Blog!</h1>
      <a href="http://localhost:3001/authors/googleLogin">Click here!</a>
      <BlogList />
    </Container>
  );
};

export default Home;
