import React from "react";
import styled from "styled-components";
import YoutubeImg from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FeedIcon from "@mui/icons-material/Feed";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 50px;
  margin: -30px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
  padding: 6px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Container>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Wrapper>
          <Logo>
            <Img src={YoutubeImg} />
            iTube
          </Logo>
          <Item>
            <HomeIcon />
            Home
          </Item>
          <Link
            to="trends"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>
              <ExploreOutlinedIcon />
              Explore
            </Item>
          </Link>
          <Link
            to="subscriptions"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>
              <SubscriptionsIcon />
              Subscription
            </Item>
          </Link>
          <Hr />
          <Item>
            <VideoLibraryIcon /> Library
          </Item>
          <Item>
            <ManageHistoryIcon /> History
          </Item>
          <Hr />
          {!currentUser && (
            <>
              <Login>
                Sign in to like videos, comment, and subscribe.
                <Link to="signin" style={{ textDecoration: "none" }}>
                  <Button>
                    <AccountCircleIcon />
                    Sign IN
                  </Button>
                </Link>
              </Login>
              <Hr />
            </>
          )}
          <Title>BEST OF iTube</Title>
          <Item>
            <MusicNoteIcon /> Music
          </Item>
          <Item>
            <EmojiEventsIcon /> Sports
          </Item>
          <Item>
            <SportsEsportsIcon /> Gaming
          </Item>
          <Item>
            <FeedIcon /> News
          </Item>
          <Item>
            <OnlinePredictionIcon /> Live
          </Item>
          <Hr />

          <Item onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <WbSunnyIcon /> : <NightlightIcon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Item>
        </Wrapper>
      </Link>
    </Container>
  );
};

export default Menu;
