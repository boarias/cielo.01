export const metadata = {
  title: 'Calculadora de Antecipação',
  description: 'Simulador de taxas e recebimento com comparativo Cielo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
