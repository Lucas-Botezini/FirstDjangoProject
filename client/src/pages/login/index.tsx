import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import type { IUserLogin, AuthenticationResponse } from "@/commons/types";
import AuthService from "@/services/auth-service";
import { Toast } from "primereact/toast";
import { useAuth } from "@/context/hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IUserLogin>({ defaultValues: { username: "", password: "" } });

  const { login } = AuthService;
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const onSubmit = async (userLogin: IUserLogin) => {
    setLoading(true);
    try {
      const response = await login(userLogin);
      if (response.status === 200 && response.data) {
        const authData = response.data as AuthenticationResponse;
        handleLogin(authData);

        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Login efetuado com sucesso.",
          life: 3000,
        });

        reset();
        navigate('/documents/');
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Falha ao efetuar login.",
          life: 3000,
        });
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao efetuar login.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Toast ref={toast} />
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-lg"
        style={{ backgroundColor: "var(--surface-card)" }}
      >
        <h2 className="mb-6 font-bold text-2xl text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Usuário */}
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-semibold">
              Usuário
            </label>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Informe o nome de usuário" }}
              render={({ field }) => (
                <InputText
                  id="username"
                  {...field}
                  className={`w-full ${
                    errors.username ? "p-invalid border-red-500" : ""
                  }`}
                />
              )}
            />
            {errors.username && (
              <small className="text-red-400">{errors.username.message}</small>
            )}
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Senha
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Informe a senha" }}
              render={({ field }) => (
                <Password
                  id="password"
                  {...field}
                  toggleMask
                  feedback={false}
                  inputClassName="w-full"
                  className={`w-full ${
                    errors.password ? "p-invalid border-red-500" : ""
                  }`}
                />
              )}
            />
            {errors.password && (
              <small className="text-red-400">{errors.password.message}</small>
            )}
          </div>

          {/* Botão Entrar */}
          <Button
            type="submit"
            label="Entrar"
            icon="pi pi-sign-in"
            className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 mt-4"
            loading={loading || isSubmitting}
            disabled={loading || isSubmitting}
          />

          {/* Link para registro */}
          <div className="text-center mt-4">
            <small>
              Não tem uma conta?{" "}
              <Link to="/register" className="text-blue-400 hover:underline">
                Criar conta
              </Link>
            </small>
          </div> 
         
        </form>
      </div>
    </div>
  );
};
