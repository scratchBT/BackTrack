import React from 'react';

const SignupComp = () => {
    return (
      <div>
        <h1>Sign up to start listening</h1>
        <form>
            <input type='text' placeholder='First name'></input>
            <input type='email' placeholder='name@domain.com'></input>
            <input type='password' placeholder='password'></input>
            <button>Sign up</button>
        </form>
        <p>or</p>
        <div>
            <button>Sign up with Google</button>
            <button>Sign up with Facebook</button>
        </div>
      </div>
    )
};

export default SignupComp;