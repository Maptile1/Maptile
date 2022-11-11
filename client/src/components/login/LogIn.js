import React, { useState } from "react";
import Axios from 'axios'
const LogIn = (props) => {
  const [input, setInput] = useState({ userName: '', password: '' });
  const [inputValid, setInputValid] = useState(false)

  const updateInput = (e) => {
    const { name, value } = e.target;
    const updated = { ...input, [name]: value };
    setInput(updated);
    setInputValid(updated.userName !== '' && updated.password !== '' && updated.userName !== '');
  };

  Axios.defaults.withCredentials = true

  const handleLogIn = async (e) => {
    if (inputValid) {
      await Axios.post("https://maptile1.herokuapp.com/user/login",
        {
          userName: input.userName,
          password: input.password,
        },
        {
          headers: { Cookie: "_id=5" }
        }
      )
        .then(function (response) {
          props.handleLogIn(response.data.user);
        })
        .catch(function (error) {
          window.alert(error.response.data.errorMessage)
        })
    }
  }

  return (
    <main
      className="mx-auto flex min-h-screen w-full items-center justify-center bg-maptile-background-dark text-white"
    >
      <div className="bg-maptile-purple flex w-[40rem] h-[33rem] justify-center align-middle shadow-md rounded-lg">
        <section className="flex w-[30rem] flex-col space-y-10 mt-10">
          <div className="text-center text-4xl font-medium">Log In</div>

          <div
            className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
          >
            <input
              type="userName"
              name="userName"
              placeholder="User Name"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={updateInput}
            />
          </div>

          <div
            className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={updateInput}
            />
          </div>

          <button onClick={handleLogIn}
            className={`${!inputValid ? 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-red-unselected hover:bg-maptile-red rounded-xl' : 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl'}`}
          >
            LOG IN
          </button>

          <button

            className="transform text-center font-semibold text-white duration-300 hover:text-gray-300 underline"
          >FORGOT PASSWORD?
          </button>

          <p className="text-center text-lg">
            No account?
            <button onClick={() => props.handleCreateAccountView()}
              className="font-medium text-indigo-200 underline-offset-4 hover:underline ml-2"
            > Create One
            </button>
          </p>

          <button
            onClick={() => props.handleHomeScreenView()}
            className="transform text-center font-semibold text-white duration-300 hover:text-gray-300 underline"
          >Return
          </button>
        </section>
      </div>
    </main>
  );
};

export default LogIn;
