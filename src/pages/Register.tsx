import React, { FC, useState } from "react";

export const Register: FC = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleRegister = (e: React.FormEvent)=>{
        e.preventDefault()

        if (!name || !email || !password || !confirmPassword) {
            setError("please fill in all fields")
            return
        }
        if (password !== confirmPassword) {
            setError("passwords do not much")
            return
        }
        setError("")
        if (email == "test@mail.com" && password == "123") {
            console.log("use secsesfully login");
            
        }
    }
  return (
    <div className="bg-amber-400 rounded-lg max-w-md p-8 w-full">
      <h2 className="text-3xl font-bold text-gray-700 mb-5">create account</h2>
      <form className="space-y-5" onSubmit={handleRegister}>
        <div>
          <label
            className="block text-sm font-medium text-gray-600 "
            htmlFor="name"
          >
            name
          </label>
          <input
            onChange={(e)=>setName(e.target.value)}
            value={name}
            className="mt-2 block w-full p-3 border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            type="text"
            id="name"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600 "
            htmlFor="email"
          >
            email
          </label>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            className="mt-2 block w-full p-3 border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            type="email"
            id="email"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600 "
            htmlFor="password"
          >
            password
          </label>
          <input
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            className="mt-2 block w-full p-3 border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            type="password"
            id="password"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600 "
            htmlFor="confirmPassword"
          >
            confirm password
          </label>
          <input
            onChange={(e)=>setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="mt-2 block w-full p-3 border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            type="password"
            id="confirmPassword"
            required
          />
        </div>
        <button className="h-8 rounded-md bg-blue-600 hover:bg-blue-700 text-white p-2 inline-flex items-center justify-center font-medium ">register</button>
      </form>
    </div>
  );
};
