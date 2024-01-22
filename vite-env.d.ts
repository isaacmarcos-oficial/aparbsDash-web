/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly SUPABASE_KEY: string
  // mais variáveis de ambiente...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}