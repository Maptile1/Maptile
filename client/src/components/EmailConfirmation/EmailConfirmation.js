import React, { useState } from "react";
import Axios from 'axios';

const EmailConfirmation = (props) => {

    const [inputValid, setInputValid] = useState(false)
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");

    const closeView = () => {
        props.toggleEmailConfirmationView(false);
        props.toggleForgotPasswordView(true);
    }

    const validEmail = (email) => {
      return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    }

    const handleChangeEmail = (event) => {
      if(event.target.value.length !== 0 && validEmail(event.target.value)){
        setInputValid(true);
      }
      setEmail(event.target.value);
    }

    const handleChangeCode = (event) => {
        if(event.target.value.length !== 0){
            setInputValid(true);
        }
        setCode(event.target.value);
    }

    const confirmResetPasswordCode = () => {
      Axios.get("http://localhost:8080/user/email/" + email)
      .then(
        function(response){
          let user = response.data.user[0];
          if(user !== undefined){
            if(Number(code) === user.recoveryCode){
              // continue to reset password
              props.setUser(user);
              props.toggleEmailConfirmationView(false);
              props.toggleResetPasswordView(true);
          }
          else{
              // deny access
              window.alert("Invalid code.")
              // maybe reset code and kick user out
          }
          }
          else{
            window.alert("User with email " + email + " not found.")
          }
        }
      )
      .catch(function(error){
        window.alert(error.response.data.errorMessage)
      });
    }

    return (
        <main
        class="mx-auto flex min-h-screen w-full items-center justify-center bg-maptile-background-dark text-white"
      >
        <div class="bg-maptile-purple flex w-[40rem] h-[28rem] justify-center align-middle shadow-md rounded-lg">
          <section class="flex w-[30rem] flex-col space-y-10 mt-10">
            <div class="text-center text-4xl font-medium">Enter the five-digit code we sent to your email</div>

            <div
              class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                onChange={handleChangeEmail}
              />
            </div>

            <div
              class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
              <input
                type="number"
                name="number"
                placeholder="Enter email confirmation code"
                class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                maxlength="5"
                onChange={handleChangeCode}
              />
            </div>
            <button 
            onClick={confirmResetPasswordCode}
            className={`${!inputValid ? 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-red-unselected hover:bg-maptile-red rounded-xl' : 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl'}`}
          >
            ENTER CODE
          </button>

          <button
            onClick={closeView}
            className="transform text-center font-semibold text-white duration-300 hover:text-gray-300 underline"
                  >Back to Forgot Password
              </button>
          </section>
        </div>
      </main>
    );
}

export default EmailConfirmation;