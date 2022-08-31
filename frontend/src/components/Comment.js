import React from "react";
import styled from "styled-components";
import thumbnails from "../img/thumbnail.jfif";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
    fotn-size:12px;
    font-weight:400;
    color:${({ theme }) => theme.textSoft}
    margin-left:5px;
`;
const Text = styled.span`
  font-size: 14px;
`;

const Comment = () => {
  return (
    <Container>
      <Avatar src={thumbnails} />
      <Details>
        <Name>
          Kush Kumar<Date> 1 day ago</Date>
        </Name>
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, eligendi
          quam corporis ullam dolorum sed doloribus tenetur repellat nisi nulla?
          Cumque, similique. Consectetur!
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
