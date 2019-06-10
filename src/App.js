import _ from "lodash";
import React from "react";
import "./App.css";
import ImageBox from "./components/ImageBox";
import Container from "./components/Container";
import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showLength: 8, isFetching: false };
  }
  // componentDidMount() {
  //   this.doSearch();
  // }

  doSearch = searchText => {
    const searchTags =
      searchText &&
      searchText
        .replace(" & ", " ")
        .replace(" and ", " ")
        .replace(", ", " ")
        .replace(",", " ")
        .split(" ")
        .map(item => item.trim());
    this.setState({ searchTags: searchTags, showLength: 8 });

    const tag = searchTags ? searchTags.join(",") : "";

    const url = `https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/feeds/photos_public.gne?tags=${tag}&tagmode=all&format=json`;
    const method = "GET";
    const req = new XMLHttpRequest();
    const self = this;
    req.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(this.responseText.substring(15).slice(0, -1));
        // console.log(data);
        // console.log(JSON.stringify(data.items));
        self.setState({ data: data.items, isFetching: false });
      }
    };
    req.open(method, url, true);
    req.send();
  };

  search = _.debounce(searchText => {
    this.setState({ data: {}, isFetching: true });
    this.doSearch(searchText);
  }, 1000);

  addImageLength = _.debounce(() => {
    const length = this.state.showLength + 8;
    this.setState({ showLength: length });
  }, 100);

  generateKey = pre => {
    return `${pre}_${new Date().getTime()}`;
  };

  handleFocus = e => e.target.select();

  render() {
    const { isFetching } = this.state;
    const searchTags = this.state && this.state.searchTags;
    const data = this.state ? this.state.data : {};
    const showLength = (this.state && this.state.showLength) || 0;
    // console.log(`showLength: ${showLength}`);
    const imageBoxList =
      searchTags &&
      _.map(data, (item, i) => {
        // console.log(`item: ${JSON.stringify(i)}`);
        if (i < showLength) {
          return (
            <ImageBox
              key={this.generateKey(
                `${item.author_id}_${item.published}_${item.date_taken}`
              )}
              searchTags={searchTags}
              author={item.author}
              date={item.date_taken}
              fullImgUrl={item.link}
              tags={item.tags}
              src={item.media.m}
              alt={item.title}
            />
          );
        }
      });
    return (
      <div>
        <Header>
          <SearchBar
            type="text"
            onChange={e => this.search(e.target.value)}
            placeholder="e.g., cat dog"
            onFocus={this.handleFocus}
            // defaultValue="tiger lion"
          />
        </Header>
        <div>
          {isFetching ? (
            <LoadingIndicator>
              <Icon />
            </LoadingIndicator>
          ) : (
            searchTags && (
              <div>
                <Container>{imageBoxList}</Container>
                {showLength <= 20 && (
                  <Footer>
                    <Button onClick={this.addImageLength}>More Image</Button>
                  </Footer>
                )}
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 1rem;
  z-index: 999;
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: white;
  margin-bottom: 2rem;
`;
const Button = styled.button`
  background: white;
  width: 180px;
  border-radius: 5px;
  padding: 5px;
  font-size: 1.3rem;
  :hover {
    cursor: pointer;
  }
`;

const SearchBar = styled.input`
  max-width: 75%;
  width: 400px;
  padding: 12px;
  line-height: 1.5rem;
  font-size: 1.5rem;
  border-radius: 10px;
  text-shadow: 1px 1px 1px;
  text-align: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Icon = styled(FaSpinner)`
  color: white;
  font-size: 3rem;
  animation: ${spin} infinite 2s linear;
  margin-right: 10px;
`;

const LoadingIndicator = styled.span`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
