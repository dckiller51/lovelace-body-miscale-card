// src/declarations.d.ts
declare module '*.css' {
  import type { CSSResult } from 'lit';
  const content: CSSResult;
  export default content;
}
