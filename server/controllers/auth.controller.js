// Methods(tasks) to be executed on routes
const signup = (req, res)=>{ 
	res.send("Hello, Welcome to our signup Page yeah"); 
} 

const login = (req, res)=>{ 
	res.send("Hello, Welcome to our login Page"); 
} 

const logout = (req, res)=>{ 
	res.send("Hello, you got logged out"); 
} 

// Export of all methods as object 
module.exports = { 
	login, 
	logout,
	signup
}
