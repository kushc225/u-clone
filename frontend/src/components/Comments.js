import React from "react";
import styled from "styled-components";
import thumbnails from "../img/thumbnail.jfif";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Hr = styled.div`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  width: 100%;
  background: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;
const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src={thumbnails} />
        <Input placeholder="add a comment here" />
        <Hr />
      </NewComment>
      <Comment />
    </Container>
  );
};

export default Comments;
