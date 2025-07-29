import React from 'react'
import './CSS/LoginSignup.css'; // Assuming you have a CSS file for styling


 function LoginSignup() {
  const [state, setState] = React.useState("login");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const login= async () => {
    console.log("Logging In");
     let responseData;
     await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
  }).then((response) => response.json()).then((data) => {
      responseData = data;
  });

  if(responseData.success) {
      localStorage.setItem("token", responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.message);
    }
  }

   const signup = async () => {
    console.log("Signing Up", formData);
    let responseData;
     await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
  }).then((response) => response.json()).then((data) => {
      responseData = data;
  });

  if(responseData.success) {
      localStorage.setItem("token", responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.message);
    }
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">

    <h1> {state}</h1>
    <div className="loginsignup-fields">
      {state==="Sign Up" ? <input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder="Enter your name" /> : <></>}
      <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Enter your email" />
      <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Enter your password" />
    </div>
    <button onClick={() => {state==="Sign Up" ? signup() : login()}} className="loginsignup-btn">Continue</button>
    {
      state==="Sign Up" ?<p className="loginsignup-login">Already have an account?  <span onClick={() => setState("login")}>Login Here</span></p> : <p className="loginsignup-login">Create an Account?  <span onClick={() => setState("Sign Up")}>Signup Here</span></p>
    }
    
    

    <div className="loginsignup-agree">
      <input type="checkbox" name='' id=''/>
      <p>By Continuing,I agree to term of use and privacy policy</p>
    </div>
   </div>
      </div>
  )
}
export default LoginSignup;