import React, { useState } 	from 'react';

const LogIn = (props) => {
    
    const [input, setInput] = useState({ email: '', password: '' });

    const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

    //needs to be async once accounts are implemented
    const handleLogIn = (e) => {
        for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
        //Async usedb call goes here.
        console.log(input)
        props.toggleLogIn(false)

    }

    return(
        <div>
            <div className="w-2/3 m-2 bg-maptile-purple rounded-lg items-center">
                
                <div className="mb-6">
                    <label htmlFor="email" className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                    <input type="email" id="email" name="email" onBlur={updateInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required></input>
                </div> 
                <div className="mb-6">
                    <label htmlFor="password" className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                    <input type="password" id="password" name="password" onBlur={updateInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required></input>
                </div> 
                
                
                <button type=""  onClick={handleLogIn} className=" text-white text-shadow bg-maptile-green hover:bg-maptile-green-highlight focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </div>
        </div>
    )
}

export default LogIn