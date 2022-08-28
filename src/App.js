import React, { useEffect, useState } from "react";
import { Form, Card, Icon, Image } from "semantic-ui-react";
import "./App.css";

function App() {
  const [avtar, setAvtar] = useState("");
  const [userName, setUsername] = useState("");
  const [name, setName] = useState("");
  const [repos, setRepos] = useState("");
  const [gits, setGits] = useState("");
  const [create, setCreate] = useState("");
  const [userInput, setuserInput] = useState("");
  const [error, setError] = useState(null);

  const handleSeach = (event) => {
    setuserInput(event.target.value);
  };

  const submit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    fetch("https://api.github.com/users/examples")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({
    avatar_url,
    login,
    name,
    public_repos,
    public_gists,
    created_at
  }) => {
    const crt = created_at.split("T");
    const dt = crt[0];
    setAvtar(avatar_url);
    setUsername(login);
    setName(name);
    setRepos(public_repos);
    setGits(public_gists);
    setCreate(dt);
  };

  return (
    <div>
      <div className="navbar">Github Search</div>
      <div className="search">
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Input
              placeholder="userName"
              nmae="name"
              onChange={handleSeach}
            />
            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      <div className="card">
        <Card>
          <Image src={avtar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Username : {userName}</Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Header>Name : {name}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="code branch" />
              Repos : {repos}
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              Gits: {gits}
            </a>
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />
            Created At: {create}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default App;
