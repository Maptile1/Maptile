import React, { useState } from "react";

const EmailConfirmation = (props) => {

    const [inputValid, setInputValid] = useState(false)
    const [code, setCode] = useState("");

    const closeView = () => {
        props.toggleEmailConfirmationView(false);
        props.toggleForgotPasswordView(true);
    }

    const handleChange = (event) => {
        if(event.target.value.length !== 0){
            setInputValid(true);
        }
        setCode(event.target.value);
    }

    const confirmResetPasswordCode = () => {
        console.log(code)
        if(Number(code) === 12345){
            // continue to reset password
            props.toggleEmailConfirmationView(false);
            props.toggleResetPasswordView(true);
        }
        else{
            // deny access
        }
    }

    return (
        <main
        class="mx-auto flex min-h-screen w-full items-center justify-center bg-maptile-background-dark text-white"
      >
        <div class="bg-maptile-purple flex w-[40rem] h-[25rem] justify-center align-middle shadow-md rounded-lg">
          <section class="flex w-[30rem] flex-col space-y-10 mt-10">
            <div class="text-center text-4xl font-medium">Enter the five-digit code we sent to your email</div>

            <div
              class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
              <input
                type="number"
                name="number"
                placeholder="Enter email confirmation code"
                class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                onChange={handleChange}
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