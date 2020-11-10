import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectUsersSpace } from "../../store/user/selectors";
// import { updateMySpace } from "../../store/user/actions";

export default function MySpaceForm(props) {
  const space = useSelector(selectUsersSpace);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(space.title);
  const [description, setDescription] = useState(space.description || "");
  const [backgroundColor, setBackgroundColor] = useState(space.backgroundColor);
  const [color, setColor] = useState(space.color);
  const setState = props.setState;

  function submitForm(event) {
    event.preventDefault();

    console.log(title, description, backgroundColor, color);
    // dispatch(updateMySpace(title, description, backgroundColor, color));
    setState(false);
  }
  return (
    <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
      <h1 className="mt-5 mb-5">Edit your space</h1>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="Title of your space"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          type="text"
          placeholder="What is your space about"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Background Color</Form.Label>
        <Form.Control
          value={backgroundColor}
          onChange={(event) => setBackgroundColor(event.target.value)}
          type="color"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Text Color</Form.Label>
        <Form.Control
          value={color}
          onChange={(event) => setColor(event.target.value)}
          type="color"
        />
      </Form.Group>
      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Save changes
        </Button>
      </Form.Group>
    </Form>
  );
}
