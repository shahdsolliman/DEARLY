# React + Vite

## Live visitor dashboard

The visitor counter uses Supabase. Run `supabase/visitor-counter.sql` in the
project's SQL Editor, then set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_PUBLISHABLE_KEY` in the local `.env.local` file and in the
production hosting environment. The publishable key is intended for browser
use; never put a Supabase secret or service-role key in frontend code.

Open `/?page=dashboard` and request a one-time sign-in link for
`shahd.soliman2050@gmail.com`. Add the deployed site's root URL to Supabase
Authentication's allowed redirect URLs so the link can return to the dashboard.
The dashboard shows visitors active within the last 90 seconds and refreshes
every 10 seconds.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
