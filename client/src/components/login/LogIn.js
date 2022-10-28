import React, { useState } from "react";

const LogIn = (props) => {
  const [input, setInput] = useState({ email: "", password: "" });

  const updateInput = (e) => {
    const { name, value } = e.target;
    const updated = { ...input, [name]: value };
    setInput(updated);
  };


  return (
    <main
      class="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white"
    >
      <div class="bg-maptile-purple flex w-[40rem] h-[30rem] justify-center align-middle">
        <section class="flex w-[30rem] flex-col space-y-10 mt-10">
          <div class="text-center text-4xl font-medium">Log In</div>

          <div
            class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
          >
            <input
              type="text"
              placeholder="Email or Username"
              class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div
            class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
          >
            <input
              type="password"
              placeholder="Password"
              class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <button onClick={() => props.handleLogIn()}
            class="transform rounded-sm bg-maptile-green-highlight py-2 font-bold duration-300 hover:bg-maptile-green"
          >
            LOG IN
          </button>

          <button

            class="transform text-center font-semibold text-white duration-300 hover:text-gray-300"
          >FORGOT PASSWORD?
          </button>

          <p class="text-center text-lg">
            No account?
            <button onClick={() => props.handleCreateAccountView()}
              class="font-medium text-indigo-200 underline-offset-4 hover:underline ml-2"
            > Create One
            </button>
          </p>
        </section>
      </div>
    </main>
  );
};

export default LogIn;
