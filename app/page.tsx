import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, FileDown } from "lucide-react";

export default function CalculadoraAntecipacao() {
  const [valor, setValor] = useState(10000);

  const taxas = [
    { titulo: "2.45%", taxa: 2.45 },
    { titulo: "2.51%", taxa: 2.51 },
    { titulo: "2.60%", taxa: 2.60 },
    { titulo: "3.27%", taxa: 3.27 }
  ];

  const calcularParcelas = (taxa) => {
    const resultado = [];
    for (let i = 1; i <= 12; i++) {
      const dias = i * 30;
      const efetiva = taxa * i;
      const parcelaBruta = valor / 12;
      const liquido = parcelaBruta * (1 - efetiva / 100);
      resultado.push({ i, dias, efetiva, liquido });
    }
    return resultado;
  };

  const calcularSemAntecipacao = () => {
    const resultado = [];
    for (let i = 1; i <= 12; i++) {
      const taxaMensal = i <= 6 ? 2.86 : 3.27;
      const valorParcela = (valor * Math.pow(1 + taxaMensal / 100, i)) / i;
      const total = valorParcela * i;
      resultado.push({ i, taxa: taxaMensal, valorParcela, total });
    }
    return resultado;
  };

  const copiarValores = () => {
    navigator.clipboard.writeText(`Valor da venda: R$ ${valor.toFixed(2)}`);
    alert("Valores copiados para a área de transferência!");
  };

  const exportarPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-zinc-800">Calculadora de Antecipação</h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          className="p-2 border rounded-md w-full md:w-1/3"
          placeholder="Digite o valor da venda"
        />
        <div className="flex gap-2">
          <Button onClick={copiarValores} variant="outline"><Copy className="w-4 h-4 mr-2" /> Copiar</Button>
          <Button onClick={exportarPDF} variant="default"><FileDown className="w-4 h-4 mr-2" /> PDF</Button>
        </div>
      </div>

      <Tabs defaultValue="antecipacao">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="antecipacao">Com Antecipacão</TabsTrigger>
          <TabsTrigger value="sem">Somente Parcelamento</TabsTrigger>
        </TabsList>

        <TabsContent value="antecipacao">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {taxas.map(({ titulo, taxa }) => {
              const parcelas = calcularParcelas(taxa);
              return (
                <div key={titulo} className="border p-4 rounded-2xl shadow-sm bg-white">
                  <h2 className="font-semibold mb-2 text-center text-indigo-600">Taxa {titulo}</h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th>Parc.</th>
                        <th>Dias</th>
                        <th>Efetiva</th>
                        <th>Liquido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parcelas.map((p) => (
                        <tr key={p.i} className="text-center">
                          <td>{p.i}x</td>
                          <td>{p.dias}</td>
                          <td>{p.efetiva.toFixed(2)}%</td>
                          <td>R$ {p.liquido.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="sem">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="text-center">
                <th>Parcelas</th>
                <th>Taxa</th>
                <th>Valor Parcela</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {calcularSemAntecipacao().map((p) => (
                <tr key={p.i} className="text-center">
                  <td>{p.i}x</td>
                  <td>{p.taxa}%</td>
                  <td>R$ {p.valorParcela.toFixed(2)}</td>
                  <td>R$ {p.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
