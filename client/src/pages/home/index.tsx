import { useEffect, useState } from "react";
import type { IDocument } from "@/commons/types";
import DocumentService from "@/services/document-service";

export const DocumentListPage = () => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [newDoc, setNewDoc] = useState<IDocument>({ title: "", content: "", securitylevel: 0 });

   const securityLevelMap: Record<number, string> = {
      0: "Unclassified",
      1: "Confidential",
      2: "Secret",
      3: "Top Secret",
   };


  // Carregar documentos
  const fetchDocuments = async () => {
    try {
      const response = await DocumentService.findAll();
      setDocuments(response.data || []);
    } catch (error) {
      console.error("Erro ao carregar documentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Criar novo documento
  const handleAddDocument = async () => {
    if (!newDoc.title || !newDoc.content) return;

    try {
      const response = await DocumentService.save(newDoc);
      
      if (response.success && response.data) {
         setDocuments((prev) => [...prev, response.data as IDocument]);
         setNewDoc({ title: "", content: "", securitylevel: 0 });
         setShowForm(false);
      }

    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
    }
  };

  const removeDocument = async (id: number | undefined) => {
    if (!id) return;

    try {
      const response = await DocumentService.remove(id)

      if (response.success) {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      }

    } catch (error) {
      console.error("Erro ao remover o documento:", error);
    }
  }

  if (loading) return <p>Carregando documentos...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Documentos</h2>

      {/* Botão para adicionar */}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => { 
          setShowForm(!showForm)
          setNewDoc({ title: "", content: "", securitylevel: 0 })
        }}
      >
        {showForm ? "Cancelar" : "Adicionar Documento"}
      </button>

      {/* Formulário de novo documento */}
      {showForm && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <input
            type="text"
            placeholder="Título"
            className="border p-2 w-full mb-2"
            value={newDoc.title}
            onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
          />
          <textarea
            placeholder="Conteúdo"
            className="border p-2 w-full mb-2"
            value={newDoc.content}
            onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
          />
         <select
            className="border p-2 w-full mb-2"
            value={newDoc.securitylevel}
            onChange={(e) =>
               setNewDoc({ ...newDoc, securitylevel: parseInt(e.target.value) })
            }
            >
            {Object.entries(securityLevelMap).map(([value, label]) => (
               <option key={value} value={value}>
                  {label}
               </option>
            ))}
         </select>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleAddDocument}
          >
            Salvar Documento
          </button>
        </div>
      )}

      {/* Tabela de documentos */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Título</th>
            <th className="border px-4 py-2 text-left">Conteúdo</th>
            <th className="border px-4 py-2 text-left">Nível de Segurança</th>
            <th className="border px-4 py-2 text-left">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="border px-4 py-2">{doc.title}</td>
              <td className="border px-4 py-2">{doc.content}</td>
               <td className="border px-4 py-2">
                  {securityLevelMap[doc.securitylevel]}
               </td>
              <td className="border px-4 py-2">
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => removeDocument(doc.id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
