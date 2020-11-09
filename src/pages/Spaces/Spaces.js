import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpaces } from "../../store/spaces/actions";
import { pullSpaces } from "../../store/spaces/selectors";
import "./Spaces.scss";
import { Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Spaces() {
  const dispatch = useDispatch();
  const spaces = useSelector(pullSpaces);

  console.log("this is spaces", spaces);

  useEffect(() => {
    dispatch(getSpaces());
  }, [dispatch]);

  return (
    <div className="spacesPage">
      <Jumbotron>
        <h1>Spaces</h1>
      </Jumbotron>
      <div className="spacesList">
        {spaces.status === "Loading" ? (
          <h2>Loading spaces...</h2>
        ) : (
          spaces.data.map((s) => {
            console.log(s);
            return (
              <div
                className="spaceCard"
                key={s.userId}
                style={{
                  backgroundColor: `${s.backgroundColor}`,
                  color: `${s.color}`,
                }}
              >
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <Link to={`/spaces/${s.userId}`}>
                  <button>visit page</button>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
