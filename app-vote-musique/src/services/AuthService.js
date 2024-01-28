import axios from "axios";

const API_URL = "http://localhost:5000/"; // Changez ceci par l'URL de base de votre API

const register = (email, password) => {
  return axios.post(API_URL + "register", {
    email,
    password,
    // Vous pouvez ajouter d'autres champs ici si nécessaire, comme 'role'
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        // Assurez-vous que la réponse de votre API contient le token sous la clé 'token'
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  // Vous pouvez appeler l'API de déconnexion ici si votre serveur le nécessite
};


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
