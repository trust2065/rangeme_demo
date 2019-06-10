import React, { Component } from "react";
import styled from "styled-components";

export default class ImageInfo extends Component {
  render() {
    const { author, date, tags, searchTags } = this.props;
    const authorName = author.slice(20, -2);
    const dateYMD = date.slice(0, 10);
    const generateKey = pre => {
      return `${pre}_${new Date().getTime()}`;
    };
    const tagList =
      tags !== "" &&
      tags.split(" ").map(tag => (
        <Tag searchTags={searchTags} key={generateKey(tag)}>
          {tag}
        </Tag>
      ));
    return (
      <Div>
        <Author>{authorName}</Author>
        <div>{dateYMD}</div>
        <List>{tagList}</List>
      </Div>
    );
  }
}

const Div = styled.div`
  color: hsl(208, 8%, 64%);
  margin-left: 3%;
  margin-right: 3%;
  // outline: 5px solid red;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Author = styled.h4`
  font-weight: normal;
  font-size: 1.2rem;
  margin: 0;
`;

const List = styled.ul`
  clear: both;
  list-style: none;
  padding: 0;
  margin-left: 0;
  margin-top: 5px;
  margin-bottom: 20px;
  max-height: 108px;
  overflow: auto;
}
`;
const Tag = styled.li`
  background: #ededed;
  ${({ searchTags, children }) =>
    searchTags && searchTags.includes(children)
      ? "background: #ababeb;"
      : "background: #ededed;"}
  padding: 6px;
  line-height: 21px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  color: black;
  font-weight: 400;
  margin-right: 5px;
  border-radius: 5px;
`;
