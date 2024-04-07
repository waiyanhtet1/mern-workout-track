const configs = {
  development: {
    SERVER_URI: "http://localhost:5000",
  },
  production: {
    SERVER_URI: "https://mern-workout-track.onrender.com",
  },
};

export default configs[process.env.NODE_ENV];

// module.exports.config = configs[process.env.NODE_ENV];
