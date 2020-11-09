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

  useEffect(() => {
    dispatch(getSpaceDetails(userId));
  }, [dispatch]);

  return (
    <div className="spacesPage">
      <Jumbotron>
        <h1>Details page</h1>
      </Jumbotron>
      <div className="storyList">
        {!spaceDetails.stories ? (
          <h2>Loading... </h2>
        ) : (
          spaceDetails.stories.map((s) => {
            console.log("this is s", s);
            return (
              <div
                className="spaceCard"
                key={s.id}
                style={{
                  backgroundColor: `${spaceDetails.backgroundColor}`,
                  color: `${spaceDetails.color}`,
                }}
              >
                <h2>{s.name}</h2>
                <p>{s.content}</p>
                <img alt={s.name} src={s.imageUrl}></img>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
