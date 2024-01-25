import React from "react";

const LoginComp = () => {

  return (
    <>
      <h1>Login in to BackTrack</h1>
      {/* // login with google goes here
      // login with spotify goes here
      // login with facebook goes here */}

      <form>
        <input
          type="text"
          name="email"
          placeholder="youremail@email.com"
        />
        <input
          type="text"
          name="password"
          placeholder="password"
        />
        <button type="submit">Log In</button>
      </form>
      <h4>Don't have an account?</h4>
      <a href="linktosignupcomponent">Sign Up for BackTrack</a>
    </>
  )

}

export default LoginComp;