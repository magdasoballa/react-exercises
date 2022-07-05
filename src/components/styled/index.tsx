import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: lightpink;
`;

interface Props {
  primary?: boolean;
}

const Button = styled.button<Props>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const Styled = () => {
  return (
    <Wrapper>
      <Title>styled </Title>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </Wrapper>
  );
};
