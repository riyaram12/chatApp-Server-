// // src/App.js
// import React, { useState } from "react";

// function App() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [token, setToken] = useState("");

//     const register = async () => {
//         const res = await fetch("http://localhost:3007/users/register", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         });
//         const data = await res.json();
//         console.log(data);
//         alert(data.message);
//     };

//     const login = async () => {
//         const res = await fetch("http://localhost:3007/users/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         });
//         const data = await res.json();
//         console.log(data);
//         if (data.status === 1) {
//             setToken(data.data.token); // store JWT
//             alert("Login Success");
//         } else {
//             alert("Login Failed");
//         }
//     };

//     const getProfile = async () => {
//         const res = await fetch("http://localhost:3007/users/profile", {
//             method: "GET",
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         console.log(data);
//         alert(JSON.stringify(data.user));
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>User Auth Client</h2>
//             <input
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <br />
//             <input
//                 placeholder="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={register}>Register</button>
//             <button onClick={login}>Login</button>
//             <button onClick={getProfile}>Get Profile</button>
//         </div>
//     );
// }

// export default App;
