# LuxWear Control Center

Projeto Vite + React + Supabase pronto para publicar na Vercel.

## Como rodar no PC

```bash
npm install
npm run dev
```

## Como gerar build

```bash
npm run build
```

## Configuração no Vercel

Ao importar o projeto:

```txt
Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Root Directory: ./
```

Se o projeto estiver dentro de uma pasta chamada `LuxWear`, use:

```txt
Root Directory: LuxWear
```

## Variáveis de ambiente no Vercel

Em `Settings > Environment Variables`, adicione:

```txt
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Depois clique em **Redeploy**.

## Banco de dados Supabase

No Supabase, vá em `SQL Editor > New Query` e rode o conteúdo do arquivo:

```txt
supabase.sql
```
