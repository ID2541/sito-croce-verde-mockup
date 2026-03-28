import { AdminDemoNotice } from "@/components/admin/AdminDemoNotice";

export default function AdminNewsPage() {
  return (
    <AdminDemoNotice
      title="Gestione news"
      description="La demo mostra il perimetro della console editoriale, ma non simula listing, filtri, cancellazioni o sincronizzazione con backend."
    />
  );
}
