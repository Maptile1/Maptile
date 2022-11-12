import React, { useState } from "react";

const ForgotPassword = (props) => {

    const [inputValid, setInputValid] = useState(false)
    const [email, setEmail] = useState("")

    const updateEmailInput = (event) => {
        setEmail(event.target.value);
        setInputValid(validEmail(event.target.value));
    }

    const validEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      }

    const handleResetPassword = () => {
        props.closeView();
        props.toggleEmailConfirmationView(true);
        props.handleSendEmailCode(email);
    }

    return (
        <main
        class="mx-auto flex min-h-screen w-full items-center justify-center bg-maptile-background-dark text-white"
      >
        <div class="bg-maptile-purple flex w-[40rem] h-[28rem] justify-center align-middle shadow-md rounded-lg">
          <section class="flex w-[30rem] flex-col space-y-10 mt-10">
            <div class="text-center text-4xl font-medium">Forgot Password?</div>
            <div class="text-center text-2xl font-medium">Enter your email address linked to your account and we'll send you a code</div>

            <div
              class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                onChange={updateEmailInput}
              />
            </div>

            <button 
            onClick = {handleResetPassword}
            className={`${!inputValid ? 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-red-unselected hover:bg-maptile-red rounded-xl' : 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl'}`}
          >
            SEND EMAIL
          </button>
  
            <button
            onClick={() => props.closeView()}
            className="transform text-center font-semibold text-white duration-300 hover:text-gray-300 underline"
                  >Back to Login
              </button>
          </section>
        </div>
      </main>
    );
}

export default ForgotPassword;