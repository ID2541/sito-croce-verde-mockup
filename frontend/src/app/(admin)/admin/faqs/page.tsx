import { AdminDemoNotice } from "@/components/admin/AdminDemoNotice";

export default function AdminFaqsPage() {
  return (
    <AdminDemoNotice
      title="Gestione FAQ"
      description="Questo punto del progetto mostra il perimetro del catalogo FAQ interno. Nel deploy statico non sono esposti fetch autenticati, ordinamenti o azioni di modifica."
    />
  );
}
