import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type {  AuthenticationResponse } from "@/commons/types";
import { api } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


interface AuthContextType {
  authenticated: boolean;
  handleLogin: (authenticationResponse: AuthenticationResponse) => Promise<any>;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const validateToken = () => {
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const storedToken = localStorage.getItem("token");

    if (storedRefreshToken && storedToken) {
      try {
        const token = JSON.parse(storedToken);
        const decodedToken: any = jwtDecode(token);

        // Verifica se o token expirou (exp é em segundos, Date.now() em milissegundos)
        if (decodedToken.exp * 1000 > Date.now()) {
          // Token está valido
          setAuthenticated(true);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return true;
        } else {
          // Token inválido / expirado
          console.log("Token expirado. Deslogando automaticamente.");
          handleLogout();
          return false; 
        }
      } catch (error) {
        handleLogout(); 
        return false;
      }
    }
    // Não há token ou usuário armazenado
    setAuthenticated(false);
    return false;
  }

  useEffect(() => {
    validateToken(); // Valida o token ao carregar o componente
  }, []); // O array de dependências é vazio para garantir que isso só seja executado uma vez na montagem

  useEffect(() => {
    const storedRefresh = localStorage.getItem("refresh_token");
    const storedToken = localStorage.getItem("token");

    if (storedRefresh && storedToken) {
      setAuthenticated(true);
      api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
        storedToken
      )}`;
      navigate("/documents/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleLogin = async (authenticationResponse: AuthenticationResponse) => {
    try {
      const access_token = authenticationResponse.access;
      const access_refresh = authenticationResponse.refresh;

      localStorage.setItem("token", JSON.stringify(access_token));
      localStorage.setItem("refresh_token", JSON.stringify(access_refresh));

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      setAuthenticated(true);
      navigate("/documents/"); // redireciona após login
    } catch {
      setAuthenticated(false);
    }
  };


  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    api.defaults.headers.common["Authorization"] = "";

    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };