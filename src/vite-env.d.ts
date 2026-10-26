/// <reference types="vite/client" />

// A DECLARATION FILE (.d.ts): only types, no code. It describes things that
// exist at runtime but that TypeScript can't see on its own.

// Vite already declares ImportMetaEnv (MODE, DEV, PROD, BASE_URL...).
// Declaring an interface with the SAME name adds to it ("declaration merging"),
// so import.meta.env.VITE_API_URL is now known and typed.
interface ImportMetaEnv {
  // Optional: this project has no .env file that sets it, so it may be undefined
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
