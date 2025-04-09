'use client';
import { useState } from 'react';

export default function Page() {
  const [valor, setValor] = useState(10000);

  const taxas = [
    { titulo: "2.45%", taxa: 2.45 },
    { titulo: "2.51%", taxa: 2.51 },
    { titulo: "2.60%", taxa: 2.60 },
    { titulo: "3.27%", taxa: 3.27 }
  ];

  const copiarValores = () => {
    navigator.clipboard.writeText(`Valor da venda: R$ ${valor.toFixed(2)}`);
    alert("Valores copiados para área de transferência!");
  };

  const exportarPDF = () => {
    window.print();
  };

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Calculadora de Antecipação</h1>
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
        className="p-2 border rounded mb-4 w-full"
        placeholder="Digite o valor da venda"
      />

      <div className="flex gap-4 mb-6 justify-center">
        <button onClick={copiarValores} className="bg-blue-600 text-white px-4 py-2 rounded">Copiar valores</button>
        <button onClick={exportarPDF} className="bg-green-600 text-white px-4 py-2 rounded">Exportar PDF</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {taxas.map(({ titulo, taxa }) => {
          const parcelas = calcularParcelas(taxa);
          return (
            <div key={titulo} className="border p-4 rounded shadow">
              <h2 className="font-semibold mb-2">Taxa {titulo}</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>Parc.</th>
                    <th>Dias</th>
                    <th>Efetiva</th>
                    <th>Liquido</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelas.map((p) => (
                    <tr key={p.i}>
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

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Parcelamento sem antecipação</h2>
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th>Parcelas</th>
              <th>Taxa</th>
              <th>Valor Parcela</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {calcularSemAntecipacao().map((p) => (
              <tr key={p.i}>
                <td>{p.i}x</td>
                <td>{p.taxa}%</td>
                <td>R$ {p.valorParcela.toFixed(2)}</td>
                <td>R$ {p.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
