import React, { useState } from 'react';

const CreateAccount = (props) => {
    const [input, setInput] = useState({ email: '', password: '', userName: ''});
    const [inputValid, setInputValid] = useState(false)

    const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
        setInputValid(updated.email !== '' && updated.password !== '' && updated.userName !== '');
	};

    const handleLogIn = (e) => {
        if(inputValid){
            props.handleLogIn()
        }
    }

    return (
        <main
            className="mx-auto flex min-h-screen w-full items-center justify-center bg-maptile-background-dark text-white"
        >
            <div className="bg-maptile-purple flex w-[40rem] h-[35rem] justify-center align-middle shadow-md rounded-lg">
                <section className="flex w-[30rem] flex-col space-y-10 mt-10">
                    <div className="text-center text-4xl font-medium">Create Account</div>

                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="text"
                            name="userName"
                            placeholder="Username"
                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                            onBlur={updateInput}
                        />
                    </div>

                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                            onBlur={updateInput}
                        />
                    </div>
                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        />
                    </div>
                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="password"
                            name="password"
                            placeholder="Confirm Password"
                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                            onBlur={updateInput}
                        />
                    </div>

                    <button onClick={handleLogIn}
                        className={`${!inputValid ? 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-red-unselected hover:bg-maptile-red rounded-xl': 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl'}`}
                        //className="transform rounded-sm py-2 font-bold duration-300 {{inputValid ? 'bg-maptile-red-unselected hover:bg-maptile-red' : 'bg-maptile-green-highlight hover:bg-maptile-green'}}"
                    >
                        Register
                    </button>

                    <button
                        onClick={() => props.handleHomeScreenView()}
                        className="transform text-center font-semibold text-white duration-300 hover:text-gray-300 underline"
                    >Return
                    </button>


                </section>
            </div>
        </main>

    )
}

export default CreateAccount