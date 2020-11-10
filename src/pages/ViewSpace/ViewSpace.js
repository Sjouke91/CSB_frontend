import "./ViewSpace.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpaceDetails } from "../../store/spaceDetails/actions";
import { pullStories } from "../../store/spaceDetails/selectors";
import { Jumbotron } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function ViewSpace() {
  const userId = useParams().id;
  const dispatch = useDispatch();
  const spaceDetails = useSelector(pullStories);
  const storiesArray = spaceDetails.stories;

  const sorted_Array = storiesArray
    ? storiesArray.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    : [];

  console.log("this is sorted:", sorted_Array);

  useEffect(() => {
    dispatch(getSpaceDetails(userId));
  }, [dispatch, userId]);

  return (
    <div className="detailPage">
      <Jumbotron>
        <h1>Details page</h1>
      </Jumbotron>
      <div className="storyList">
        {!spaceDetails.stories ? (
          <h2>Loading... </h2>
        ) : (
          sorted_Array.map((s) => {
            return (
              <div
                className="storyCard"
                key={s.id}
                style={{
                  backgroundColor: `${spaceDetails.backgroundColor}`,
                  color: `${spaceDetails.color}`,
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
