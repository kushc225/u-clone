import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  jutify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${type}`);
        setVideos(res.data);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
