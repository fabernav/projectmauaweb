import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { AlertCircle, Edit, Plus, Trash2 } from "lucide-react";
import vanService, { Van } from "../../services/vanService";

export const GerenciarVans = () => {
  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentVan, setCurrentVan] = useState<Van | null>(null);

  // Form states
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("VAN");
  const [capacidade, setCapacidade] = useState(15);

  useEffect(() => {
    fetchVans();
  }, []);

  const fetchVans = async () => {
    try {
      setLoading(true);
      const vansData = await vanService.getAll();
      setVans(vansData);
    } catch (error) {
      console.error("Erro ao buscar vans:", error);
      toast.error("Não foi possível carregar as vans");
      setVans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (van?: Van) => {
    if (van) {
      setIsEditMode(true);
      setCurrentVan(van);
      setPlaca(van.placa);
      setTipo(van.tipo);
      setCapacidade(van.capacidade);
    } else {
      setIsEditMode(false);
      setCurrentVan(null);
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setPlaca("");
    setTipo("VAN");
    setCapacidade(15);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const validateForm = () => {
    if (!placa) {
      toast.error("A placa da van é obrigatória");
      return false;
    }
    if (!tipo) {
      toast.error("O tipo de veículo é obrigatório");
      return false;
    }
    if (!capacidade || capacidade <= 0) {
      toast.error("A capacidade deve ser um número positivo");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const vanData = {
        placa,
        tipo,
        capacidade,
        ativo: true,
      };

      if (isEditMode && currentVan) {
        await vanService.update(currentVan.id, vanData);
        toast.success("Van atualizada com sucesso!");
      } else {
        await vanService.create(vanData);
        toast.success("Nova van cadastrada com sucesso!");
      }

      fetchVans();
      handleCloseDialog();
    } catch (error) {
      console.error("Erro ao salvar van:", error);
      toast.error(
        isEditMode ? "Erro ao atualizar van" : "Erro ao cadastrar van"
      );
    }
  };

  const toggleVanStatus = async (van: Van) => {
    try {
      await vanService.update(van.id, { ativo: !van.ativo });
      toast.success(
        `Van ${!van.ativo ? "ativada" : "desativada"} com sucesso!`
      );
      fetchVans();
    } catch (error) {
      console.error("Erro ao alterar status da van:", error);
      toast.error("Erro ao alterar status da van");
    }
  };

  const deleteVan = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta van?")) return;

    try {
      await vanService.delete(id);
      toast.success("Van excluída com sucesso!");
      fetchVans();
    } catch (error) {
      console.error("Erro ao excluir van:", error);
      toast.error("Não foi possível excluir a van");
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Vans</h1>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Van
          </Button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : vans.length === 0 ? (
          <div className="text-center py-10">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">Nenhuma van encontrada</h3>
            <p className="mt-1 text-gray-500">
              Clique em "Nova Van" para adicionar uma van.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Placa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vans.map((van) => (
                  <tr key={van.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {van.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {van.placa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {van.tipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {van.capacidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          van.ativo
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {van.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleVanStatus(van)}
                        >
                          {van.ativo ? "Desativar" : "Ativar"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(van)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => deleteVan(van.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Editar Van" : "Cadastrar Nova Van"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="placa" className="text-right">
                Placa
              </Label>
              <Input
                id="placa"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                placeholder="ABC1234"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tipo" className="text-right">
                Tipo
              </Label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="VAN">Van</option>
                <option value="MICRO_ONIBUS">Micro-ônibus</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacidade" className="text-right">
                Capacidade
              </Label>
              <Input
                id="capacidade"
                type="number"
                value={capacidade}
                onChange={(e) => setCapacidade(parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {isEditMode ? "Salvar" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
