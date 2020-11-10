import "./MySpace.scss";
import React from "react";
import { useSelector } from "react-redux";
import { selectUsersSpace } from "../../store/user/selectors";
import { Jumbotron } from "react-bootstrap";

export default function MySpace() {
  const getSpace = useSelector(selectUsersSpace);
  console.log("this is space", getSpace);
  const storiesArray = getSpace.stories;

  const sorted_Array = storiesArray
    ? storiesArray.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    : [];

  return (
    <div className="userPage">
      <Jumbotron>
        <h1>Users page</h1>
      </Jumbotron>
      <div className="storyList">
        {!getSpace.stories ? (
          <h2>Loading... </h2>
        ) : (
          sorted_Array.map((s) => {
            return (
              <div
                className="storyCard"
                key={s.id}
                style={{
                  backgroundColor: `${getSpace.backgroundColor}`,
                  color: `${getSpace.color}`,
                }}
              >
                <div className="text">
                  <h2>{s.name}</h2>
                  <p>{s.content}</p>
                </div>
                <img alt={s.name} src={s.imageUrl}></img>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
