import React, { Component } from "react";
import styled from "styled-components";
import ImageHolder from "./ImageHolder";
import ImageInfo from "./ImageInfo";
import { media } from "./styled";
import { FaExternalLinkAlt as Link } from "react-icons/fa";

export default class ImageBox extends Component {
  render() {
    const { searchTags, author, date, fullImgUrl, tags, src, alt } = this.props;
    return (
      <Div>
        <ImgAction>
          <a href={fullImgUrl} target="_blank" rel="noopener noreferrer">
            <StyledLink />
          </a>
        </ImgAction>
        <ImageHolder src={src} alt={alt} />
        <ImageInfo
          author={author}
          date={date}
          fullImgUrl={fullImgUrl}
          tags={tags}
          searchTags={searchTags}
        />
      </Div>
    );
  }
}

const StyledLink = styled(Link)`
  padding: 10px 30px 30px 30px;
  color: white;
`;

const Div = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-basis: calc(100% / 4);
  flex-direction: column;
  position: relative;
  // outline: 5px solid green;
  ${media.tablet`
    flex-basis: calc(100% / 2);
  `}
  ${media.mobile`
    flex-basis: 100%;
  `}
`;

const ImgAction = styled.div`
  background: black;
  opacity: 0.5;
  position: absolute;
  right: 0;
  top: 0;
  display: none;
  :hover {
    cursor: pointer;
  }
  ${Div}:hover & {
    display: block;
  }
`;
