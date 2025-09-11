import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout";
// import { HomePage } from "@/pages/home";
import { RequireAuth } from "@/components/require-auth";
import { NotFound } from "@/pages/not-found";
import { DocumentListPage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 


        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/documents" element={<DocumentListPage />} />

          
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}