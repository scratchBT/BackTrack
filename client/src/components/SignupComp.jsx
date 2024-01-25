import React from 'react';

const SignupComp = () => {
    return (
      <div className='authenticationPage--container'>
        <div className='authenticationComp--container'>
            <h1>Sign up to start listening</h1>
            <form>
                <label htmlFor='input--name'>Name</label>
                <input type='text' placeholder='First name' id='input--name'></input>
                <label htmlFor='input--email'>Email</label>
                <input type='email' placeholder='name@domain.com' id='input--email'></input>
                <label htmlFor='input--password'>Password</label>
                <input type='password' placeholder='password' id='input--password'></input>
                <button className='btn'>Sign up</button>
            </form>
            <p>or</p>
            <div className='btn--container'>
                <button className='btn'>Sign up with Google</button>
                <button className='btn'>Sign up with Facebook</button>
            </div>
            <p>Already have an account? <a>Log in here</a>.</p>
        </div>
      </div>
    )
};

export default SignupComp;