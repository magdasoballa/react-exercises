import moment from "moment";
import React, { useEffect, useState } from "react";
import { Post } from "../../interfaces";
import "./posts.scss";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
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

  return (
    <div>
      <div className=""></div>
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
          {posts.map((post) => {
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
      </div>
    </div>
  );
};
