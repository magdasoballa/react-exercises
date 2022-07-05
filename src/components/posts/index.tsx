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
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [selectValue, setSelectValue] = useState();
  const paginationMaxNumber = +posts.length / +rowsPerPage;
  const arrOfPagination: any = [];

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())

      .then((res) => {
        setPosts(completePostsData(res));
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
  };

  const setPagination = (event: any) => {
    chooseRowsPerPage(event);
  };

  const showPaginationArray = () => {
    let num;
    for (num = 0; num <= paginationMaxNumber; num++) {
      arrOfPagination.push(num);
    }
  };

  const getSpecificPosts = (index: number) => {
    let slicedPosts: Post[];
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
    console.log(startIndex, "startIndex");
    console.log(endIndex, "endindex");
    const end = endIndex - 1;
    slicedPosts = posts.slice(startIndex - 1, end);
    console.log(slicedPosts);
    // setPosts(slicedPosts);
    return undefined;
  };

  showPaginationArray();

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="searcher">
          <input placeholder="Search" />
          <SearchIcon />
        </div>
        <div className="buttons">
          <div className="add"></div>
          <div className="create"></div>
          <div className="export"></div>
        </div>
      </div>
      <div className="table">
        <table>
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
          {posts.slice(0, rowsPerPage).map((post, ind) => {
            return (
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
                <div className="tiles">
                  <td className="blue-tile">
                    <EditIcon></EditIcon> <div>EDIT</div>
                  </td>
                  <td className="blue-tile">
                    <RemoveRedEyeIcon></RemoveRedEyeIcon> <div>SHOW</div>
                  </td>
                </div>
              </tr>
            );
          })}
        </table>
        <label htmlFor="row-select">Rows per page:</label>
          <div>test</div>
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
        <div>{paginationMaxNumber}</div>
        <div>
          {arrOfPagination.map((el: any, index: number) => (
            <button onClick={() => getSpecificPosts(index)}>{el}</button>
          ))}
        </div>
      </div>
    </div>
  );
};
