import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import styled from "styled-components";
import Comments from "../components/Comments";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;
const Title = styled.span`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.span`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Hr = styled.div`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCouter = styled.span`
  margin-top:5px;
  margin-bottom:20px;
  color:${({ theme }) => theme.textSoft}
  font-size:12px;
`;
const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 2px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = ({ type }) => {
  const { id } = useParams();
  const [videos, setVideo] = useState([]);
  const [mainVideo, setMainVideo] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/random`);
        setVideo(res.data);
        // console.log("videos", res.data);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchMainVideoDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/videos/find/${id}`
        );
        setMainVideo(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchMainVideoDetails();
  }, [id]);
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="380"
            src="https://www.w3schools.com"
            title="W3Schools Free Online Web Tutorials"
          ></iframe>
        </VideoWrapper>
        <Title>{mainVideo.title}</Title>
        <Details>
          <Info>
            {mainVideo.views} views * {format(mainVideo.createdAt)}
          </Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon />
              {mainVideo.likes}
            </Button>
            <Button>
              <ThumbDownAltOutlinedIcon />
              {mainVideo.dislikes}
            </Button>
            <Button>
              <ReplyOutlinedIcon />
              share
            </Button>
            <Button>
              <PushPinOutlinedIcon />
              save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={mainVideo.imgUrl} />
            <ChannelDetail>
              <ChannelName>Mr Beast</ChannelName>
              <ChannelCouter>200k</ChannelCouter>
              <Description>{mainVideo.des}</Description>
            </ChannelDetail>
            <Subscribe>SUBSCRIBE</Subscribe>
          </ChannelInfo>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </Recommendation>
    </Container>
  );
};

export default Video;
