import React, { Component } from "react";
import styled from "styled-components";

export default class ImageHolder extends Component {
  render() {
    return (
      <ImageContainer>
        <Image src={this.props.src} alt={this.props.alt} />
      </ImageContainer>
    );
  }
}

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  // border: 1px solid red;
  padding: 1rem;
`;
