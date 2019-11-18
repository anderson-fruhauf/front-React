import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  button {
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    width: 100%;
  }
  a {
    font-size: 16;
    color: #999;
    font-weight: bold;
    text-decoration: none;
  }
`;
