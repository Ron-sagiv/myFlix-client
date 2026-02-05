import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

export const SignupView = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const navigate = useNavigate();

  const clearInputs = () => {
    setUserName('');
    setBirthday('');
    setPassword('');
    setEmail('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userName: userName,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch('https://flixirama-1ce078bad93f.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 400) {
            throw new Error('User already Exists');
          }
          throw new Error('Something went wrong during signup.');
        }
        return response.json();
      })
      .then((result) => {
        console.log('Signup success:', result);
        clearInputs();
        alert('Account created successfully!');
        navigate('/login');
      })
      .catch((e) => {
        console.log('Error:', e);
        alert(e.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
        minLength="3"
      />

      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength="6"
      />

      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Form.Label>Birthday:</Form.Label>
      <Form.Control
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};
