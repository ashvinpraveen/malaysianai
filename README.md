# Malaysian AI

The website for Malaysia's AI Residency and Hub — [malaysianai.org](https://malaysianai.org).

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Supabase](https://supabase.com/) — backend / database
- [Radix UI](https://www.radix-ui.com/) — accessible component primitives
- [Framer Motion](https://www.framer.com/motion/) — animations

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Supabase](https://supabase.com/) project (for form submissions)

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/ashvinpraveen/malaysianai.git
   cd malaysianai
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Copy the example environment file and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See [`.env.example`](.env.example) for all required variables.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous (public) key |

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

## License

[MIT](LICENSE)
