import React, { Component } from "react";
import styled from "styled-components";
import { media } from "./styled";

export default class Container extends Component {
  render() {
    return <SECTION>{this.props.children}</SECTION>;
  }
}

const SECTION = styled.section`
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  margin: 5rem auto;
  max-width: calc(100vh * 16 / 9);
  // outline: 5px solid yellow;
  // height: calc(100vh - 0rem);
  ${media.mobile`
    flex-direction: column;
  `}
`;
