import "./MySpace.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUsersSpace } from "../../store/user/selectors";
import { Jumbotron } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import PostForm from "./PostForm";
import EditProfile from "./EditProfile";
import Space from "../../components/Space/Space";
import Stories from "../../components/Stories/Stories";

export default function MySpace() {
  const getSpace = useSelector(selectUsersSpace);
  const dispatch = useDispatch();
  const storiesArray = getSpace.stories;
  const [editProfile, setEditProfile] = useState(false);
  const [postStory, setPostStory] = useState(false);

  const sorted_Array = storiesArray
    ? storiesArray.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    : [];

  const showButtons = editProfile === false && postStory === false;

  console.log(editProfile, postStory);
  return (
    <div className="userPage">
      <Space
        id={getSpace.id}
        title={getSpace.title}
        description={getSpace.description}
        backgroundColor={getSpace.backgroundColor}
        color={getSpace.color}
        showLink={false}
      />

      {showButtons ? (
        <Card>
          <div>
            <button onClick={() => setEditProfile(!editProfile)}>
              Edit space
            </button>
            <button onClick={() => setPostStory(!postStory)}>
              Post a story
            </button>
          </div>
          <Stories space={getSpace} />
        </Card>
      ) : null}

      {!editProfile ? null : <EditProfile setState={setEditProfile} />}

      {!postStory ? null : <PostForm setState={setPostStory} />}
    </div>
  );
}
