import React, { useState, useEffect } from "react";

import { useGetPublicContentQuery } from "../api/api";

const Home = () => {
  //const [content, setContent] = useState("");

  const { data: response, isFetching, isSuccess, isLoading, isError, error } = useGetPublicContentQuery();

  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error! {error.data.message}</div>
  if (!response) return <div>Content is missing!</div>

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{response.message}</h3>
      </header>
    </div>
  );
};

export default Home;