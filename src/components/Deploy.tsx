import React, { useState } from 'react';
import { Terminal, Copy, CheckCircle2, Download } from 'lucide-react';

export function Deploy() {
  const [copied, setCopied] = useState<string | null>(null);

  const dockerCompose = `version: '3.8'

services:
  pz-server-panel:
    build: .
    container_name: pz-server-panel
    restart: unless-stopped
    ports:
      - "16261:16261/udp"
      - "16262:16262/udp"
      - "3000:3000/tcp"
    volumes:
      - ./pz-data:/home/steam/Zomboid
      - ./pz-server:/opt/pzserver
    environment:
      - TZ=America/Sao_Paulo`;

  const dockerfile = `# Stage 1: Build Frontend
FROM node:20 AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build Backend (Rust)
FROM rust:1.75 AS backend-builder
WORKDIR /app
COPY backend-rust/Cargo.toml backend-rust/Cargo.lock* ./
COPY backend-rust/src ./src
RUN cargo build --release

# Stage 3: Final Image
FROM cm2network/steamcmd:root

# Install required dependencies for Rust binary
RUN apt-get update && apt-get install -y \\
    ca-certificates \\
    && apt-get clean \\
    && rm -rf /var/lib/apt/lists/*

# Create directories
RUN mkdir -p /opt/pzserver /opt/pzpanel /home/steam/Zomboid
WORKDIR /opt/pzpanel

# Copy frontend build
COPY --from=frontend-builder /app/dist ./dist

# Copy backend binary
COPY --from=backend-builder /app/target/release/pz-server-panel ./pz-server-panel

# Setup entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Change owner
RUN chown -R steam:steam /opt/pzserver /opt/pzpanel /home/steam/Zomboid

USER steam
EXPOSE 16261/udp 16262/udp 3000/tcp

ENTRYPOINT ["/entrypoint.sh"]`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Deploy do Servidor</h2>
        <p className="text-sm text-zinc-400 mt-1">Arquivos necessários para rodar o servidor e o painel via Docker.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" />
              docker-compose.yml
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(dockerCompose, 'compose')}
                className="p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800"
                title="Copiar"
              >
                {copied === 'compose' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleDownload(dockerCompose, 'docker-compose.yml')}
                className="p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800"
                title="Baixar"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
            <pre className="p-4 text-sm font-mono text-zinc-300 overflow-x-auto">
              <code>{dockerCompose}</code>
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" />
              Dockerfile
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(dockerfile, 'dockerfile')}
                className="p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800"
                title="Copiar"
              >
                {copied === 'dockerfile' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleDownload(dockerfile, 'Dockerfile')}
                className="p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800"
                title="Baixar"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
            <pre className="p-4 text-sm font-mono text-zinc-300 overflow-x-auto">
              <code>{dockerfile}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Instruções de Instalação</h3>
        <ol className="text-sm text-zinc-400 space-y-4 list-decimal list-inside">
          <li>Crie uma pasta para o seu servidor e salve os arquivos <code>docker-compose.yml</code> e <code>Dockerfile</code> nela.</li>
          <li>Crie também o arquivo <code>entrypoint.sh</code> (disponível no repositório) e a pasta <code>backend-rust</code> com o código em Rust.</li>
          <li>Abra o terminal na pasta e execute: <code className="bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-emerald-400">docker-compose up -d --build</code></li>
          <li>Aguarde a compilação do Rust, o download do SteamCMD e do Project Zomboid (pode demorar alguns minutos).</li>
          <li>Acesse o painel em <code className="bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-emerald-400">http://localhost:3000</code></li>
        </ol>
      </div>
    </div>
  );
}
