import React from "react";
import { Link } from "react-router-dom";

const LoginComp = () => {

  return (
    <div className='authenticationPage--container'>
      <div className='authenticationComp--container'>
        <h1>Login in to BackTrack</h1>

        <div className='btn--container'>
          <button className='btn'> Log in with Spotify </button>
          <button className='btn'> Log in with Google </button>
          <button className='btn'> Log in with Facebook </button>

        </div>

        <form>
          <label htmlFor='input--email'>Email</label>
          <input
            type="text"
            name="email"
            placeholder="youremail@email.com"
          />
          <label htmlFor='input--password'>Password</label>
          <input
            type="text"
            name="password"
            placeholder="password"
          />
          <button type="submit" className='btn'>Log In</button>
        </form>

        <p>Don't have an account?</p>
        <Link to="/sign-up">Sign Up for BackTrack</Link>
      </div>
    </div>
  )

}

export default LoginComp;