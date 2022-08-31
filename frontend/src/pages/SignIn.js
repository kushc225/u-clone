import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart1, loginSuccess } from "../redux/userSlice";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh-56px);
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh-56px);
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-siz: 24px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  font-size: 12px;
  margin-top: 12px;
  color: ${({ theme }) => theme.textSoft};
  display: flex;
`;
const Links = styled.div``;
const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart1());
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin/", {
        name,
        password,
      });
      if (res.data.success) {
        dispatch(loginSuccess(res.data));
      }
    } catch (error) {
      dispatch(loginFailure());
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to Continue to iTube</SubTitle>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Button onClick={handlerLogin}>sign in</Button>
        <Title>or</Title>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Button>sign up</Button>
      </Wrapper>
      <More>
        <Links>
          English(USA)
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
