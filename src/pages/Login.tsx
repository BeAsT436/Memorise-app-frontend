import { FC, useState } from "react";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [userEmail] = "test@mail.com"
  const [accountPassword] = "123";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== userEmail){
        setError("user not found for this email")
        return
    }
    if (password !== accountPassword){
        setError("the password is incorrect")
        return
    }
    setError("")
    if (email == "test@mail.com" && password == "123") {
            console.log("use secsesfully login")
        
    }
  };
  return (
    <div>
      <h2>Login account</h2>
      <form onSubmit={handleLogin}>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            required
          />
        </div>
        <button>login</button>
      </form>
    </div>
  );
};
