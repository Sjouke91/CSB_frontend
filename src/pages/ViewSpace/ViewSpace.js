import "./ViewSpace.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpaceDetails } from "../../store/spaceDetails/actions";
import { pullStories } from "../../store/spaceDetails/selectors";
import { Jumbotron } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Space from "../../components/Space/Space";
import Stories from "../../components/Stories/Stories";

export default function ViewSpace() {
  const userId = useParams().id;
  const dispatch = useDispatch();
  const getSpace = useSelector(pullStories);
  const storiesArray = getSpace.stories;

  const sorted_Array = storiesArray
    ? storiesArray.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    : [];

  useEffect(() => {
    dispatch(getSpaceDetails(userId));
  }, [dispatch, userId]);

  return (
    <div className="detailPage">
      <Space
        id={getSpace.id}
        title={getSpace.title}
        description={getSpace.description}
        backgroundColor={getSpace.backgroundColor}
        color={getSpace.color}
      />

      <div className="storyList">
        <Stories space={getSpace} />
      </div>
    </div>
  );
}
