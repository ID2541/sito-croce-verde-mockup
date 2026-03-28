import { AdminDemoNotice } from "@/components/admin/AdminDemoNotice";

export default function AdminLoginPage() {
  return (
    <AdminDemoNotice
      title="Login admin"
      description="Il login e mostrato solo come punto di accesso previsto. In questa demo statica non vengono eseguite autenticazione, sessioni o controlli di ruolo."
    />
  );
}
