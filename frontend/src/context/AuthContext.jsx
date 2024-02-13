import { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use must be used AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const signUp = async (dataSend) => {
    try {
      const { data } = await axios.post("/signup", dataSend);
      setUser(data);
      setIsAuth(true);

      return data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }

      setErrors([error.response.data.message]);
    }
  };

  const signIn = async (dataSend) => {
    try {
      const { data } = await axios.post("/signin", dataSend);
      setUser(data);
      setIsAuth(true);
      return data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }

      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (Cookie.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          console.log(res.data.data);
          setUser(res.data.data);
          setIsAuth(true);
        })
        .catch((err) => {
          setUser(null);
          setIsAuth(false);
        });
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signUp,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
