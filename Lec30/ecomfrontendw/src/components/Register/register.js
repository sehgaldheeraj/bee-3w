import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  function registerUser() {}
  return (
    <div>
      <h2>Register</h2>
      <form onClick={registerUser}>
        <div>
          <label for="username">Name</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your full name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <label for="phone">Phone</label>
          <input
            type="phone"
            name="phone"
            placeholder="Enter your Phone"
          ></input>
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password(Min 6 characters)"
          ></input>
        </div>
        <div>
          <label for="role">Name</label>
          <input type="text" name="role" placeholder="Enter your role"></input>
        </div>
        <button type="submit">Register</button>
      </form>
      <h5>
        Already Registered? <a href="/v1/users/login">Login here</a>
      </h5>
    </div>
  );
};

export default Register;
