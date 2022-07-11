import moment from "moment";
import React, { useEffect, useState } from "react";
import "./posts.scss";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import { Post } from "../../interfaces";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [selectValue, setSelectValue] = useState();
  const [activeIndexOfPagination, setActiveIndexOfPagination] = useState(0)
  const [searcherValue, setSearcherValue] = useState('')
  const [showResultsFromSearch, setShowResultsFromSearch] = useState(false)
  let filteredPosts = posts.filter(el => el.title.includes(searcherValue))

  let paginationMaxNumber = +posts.length / +rowsPerPage;
  let paginationMaxNumberOfSearchResult = Math.ceil(+filteredPosts.length / +rowsPerPage);
  ;
  console.log(displayedPosts.length, 'displayedPosts length')
  const arrOfPagination: any = [];
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())

      .then((res) => {
        setPosts(completePostsData(res));
        setDisplayedPosts(completePostsData(res))
      });

  }, []);


  const getRandomDate = () => {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    const d = new Date(timestamp);

    return moment(d).format("DD/M/YYYY");

  };

  const completePostsData = (postsData: Post[]) => {
    if (postsData) {
      return postsData.map((el) => {
        el.views = Math.floor(Math.random() * 999);
        el.published = getRandomDate();
        el.hasComments = el.views > 500 ? true : false;
        return el;
      });
    } else {
      return [];
    }
  };
  const chooseRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
    setDisplayedPosts(posts.slice(0, event.target.value))
    setActiveIndexOfPagination(0)
  };

  const setPagination = (event: any) => {

    chooseRowsPerPage(event);
  };

  const showPaginationArray = () => {
    let num;
    for (num = 1; showResultsFromSearch ? num <= paginationMaxNumberOfSearchResult : num <= paginationMaxNumber; num++) {
      console.log(paginationMaxNumberOfSearchResult, 'paginationMaxNumberOfSearchResult')
      arrOfPagination.push(num);
    }
  };

  const getSpecificPosts = (index: number) => {
    let slicedPosts: Post[];
    setActiveIndexOfPagination(index)
    const startIndex =
      rowsPerPage === 5 ? index * 5 + 1 : index * rowsPerPage + 1;
    let endIndex: any;
    if (index === 0) {
      endIndex = rowsPerPage;
    }
    if (rowsPerPage === 5) {
      endIndex = index * +rowsPerPage + 5;
    } else if (rowsPerPage > 5) {
      endIndex = index * +rowsPerPage + +rowsPerPage;
    }
    slicedPosts = showResultsFromSearch ? filteredPosts.slice(startIndex - 1, endIndex) : posts.slice(startIndex - 1, endIndex);
    console.log('tuuuuuuu', filteredPosts.slice(startIndex - 1, endIndex))
    setDisplayedPosts(slicedPosts);
    showPaginationArray()
    return undefined;
  };

  showPaginationArray();

  const handleChange = (event: any) => {
    setSearcherValue(event.target.value);
  };

  const searchForPost = (event: any) => {
    event.preventDefault()
    // filteredPosts = posts.filter(el => el.title.includes(searcherValue))
    setDisplayedPosts(filteredPosts)

    paginationMaxNumber = Math.ceil(filteredPosts.length / +rowsPerPage)
    showPaginationArray()
    setShowResultsFromSearch(true)
    console.log(filteredPosts.length, 'tuuuuuu search for posts')
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <form className="searcher-form" onSubmit={searchForPost}>
          <input className="searcher-input" placeholder="Search" onChange={handleChange}
          />
          <SearchIcon />
        </form>
        <div className="buttons">
          <div className="add"></div>
          <div className="create"></div>
          <div className="export"></div>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <input type="checkbox" id="scales" name="scales" />
              </th>
              <th>Id</th>
              <th>Title</th>
              <th>Published at</th>
              <th>Com.</th>
              <th>Views</th>
            </tr>
          </thead>
          {displayedPosts.slice(0, rowsPerPage).map((post) => {
            return (
              <tbody>
                <tr key={post.id}>
                  <td>
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                  </td>
                  <td>
                    {" "}
                    <input type="checkbox" id="scales" name="scales" />
                  </td>
                  <td>{post.id}</td>
                  <td>
                    {post.title.length > 25
                      ? `${post.title.slice(0, 20)}...`
                      : post.title}
                  </td>
                  <td className="date">{post.published}</td>
                  <td>{post.hasComments && <CheckIcon></CheckIcon>}</td>
                  <td>{post?.views}</td>
                  <td className="tiles">
                    <div className="blue-tile">
                      <EditIcon></EditIcon> <div>EDIT</div>
                    </div>
                    <div className="blue-tile">
                      <RemoveRedEyeIcon></RemoveRedEyeIcon> <div>SHOW</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <label htmlFor="row-select">Rows per page:</label>
        <select
          name="pets"
          id="row-select"
          value={selectValue}
          onChange={setPagination}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div>
          {filteredPosts.length}
          {arrOfPagination.map((el: any, index: number) => (
            <button key={index} className={activeIndexOfPagination === index ? "active" : ''} onClick={() => getSpecificPosts(index)}>{el}</button>
          ))}
        </div>

      </div>
    </div >
  );
};
