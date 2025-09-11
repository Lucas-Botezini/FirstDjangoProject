import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/auth-service";
import { Link } from "react-router-dom";
import type { IUserRegister } from "@/commons/types";

const securityLevels = [
  { label: "Unclassified", value: 0 },
  { label: "Confidential", value: 1 },
  { label: "Secret", value: 2 },
  { label: "Top Secret", value: 3 },
];

export const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IUserRegister>({
    defaultValues: { 
      username: "",
      email: "",
      password: "",
      securitylevel: 0
    }
  });

  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const onSubmit = async (user: IUserRegister) => {
    setLoading(true);
    try {
      const response = await AuthService.signup(user);

      if (response.success) {
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Usuário cadastrado com sucesso!",
          life: 3000,
        });
        reset();

        // Redireciona para login
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: response.message,
          life: 3000,
        });
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao registrar usuário",
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
        <h2 className="mb-6 font-bold text-2xl text-center">Registro</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username */}
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
                  className={`w-full ${errors.username ? "p-invalid border-red-500" : ""}`}
                />
              )}
            />
            {errors.username && (
              <small className="text-red-400">{errors.username.message}</small>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Informe o email" }}
              render={({ field }) => (
                <InputText
                  id="email"
                  {...field}
                  className={`w-full ${errors.email ? "p-invalid border-red-500" : ""}`}
                />
              )}
            />
            {errors.email && (
              <small className="text-red-400">{errors.email.message}</small>
            )}
          </div>

          {/* Password */}
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
                  className={`w-full ${errors.password ? "p-invalid border-red-500" : ""}`}
                />
              )}
            />
            {errors.password && (
              <small className="text-red-400">{errors.password.message}</small>
            )}
          </div>

          {/* Security Level */}
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="securitylevel" className="text-sm font-semibold">
              Nível de Segurança
            </label>
            <Controller
              name="securitylevel"
              control={control}
              rules={{ required: "Selecione o nível de segurança" }}
              render={({ field }) => (
                <Dropdown
                  id="securitylevel"
                  {...field}
                  options={securityLevels}
                  placeholder="Selecione um nível"
                  className={`w-full ${errors.securitylevel ? "p-invalid border-red-500" : ""}`}
                />
              )}
            />
            {errors.securitylevel && (
              <small className="text-red-400">{errors.securitylevel.message}</small>
            )}
          </div>

          {/* Botão Registrar */}
          <Button
            type="submit"
            label="Registrar"
            icon="pi pi-user-plus"
            className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 mt-4"
            loading={loading || isSubmitting}
            disabled={loading || isSubmitting}
          />

          {/* Link para login */}
          <div className="text-center mt-4">
            <small>
              Já possui uma conta?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </small>
          </div> 

        </form>
      </div>
    </div>
  );
};
