import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const fetchBlogs = async () => {
      let response = await fetch("http://localhost:3001/blogs");
      try {
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setBlogs(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    setBlog(blogs.find((blog) => blog._id === id));
    console.log(blog);
    setLoading(false);
  }, [blogs]);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <>
        {blog && (
          <div className="blog-details-root">
            <Container>
              <Image className="blog-details-cover" src={blog.cover} fluid />
              <h1 className="blog-details-title">{blog.title}</h1>

              <div className="blog-details-container">
                <div className="blog-details-author">
                  <BlogAuthor {...blog.author} />
                </div>
                <div className="blog-details-info">
                  <div>{blog.createdAt}</div>
                  <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <BlogLike defaultLikes={["123"]} onChange={console.log} />
                  </div>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              ></div>
            </Container>
          </div>
        )}
      </>
    );
  }
};

export default Blog;
