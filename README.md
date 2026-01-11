
# AfricaBuilders: Vibe Coding Platform

Vibe Coding is an AI-powered full-stack app generator designed for non-technical African founders. Built on the AfricaBuilders ecosystem, it enables founders to ship MVPs instantly and connect with global venture capital.

## 🚀 Production Deployment (Vercel)

This application is ready for deployment on Vercel.

1.  **Clone the repository**.
2.  **Set Environment Variables**: In your Vercel Dashboard, add the following variables:
    *   `API_KEY`: Your Google Gemini API Key (Required for AI generation).
3.  **Deploy**:
    ```bash
    npm run build
    ```

## 🛠 Tech Stack

*   **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion.
*   **AI Engine**: Google Gemini 3 Pro (`gemini-3-pro-preview`).
*   **Payments**: Simulated Stripe/Paystack logic for multi-tier subscriptions.
*   **Storage**: Local-first storage engine with premium caching.

## 💰 Subscription Architecture

| Plan | Price | Features |
| :--- | :--- | :--- |
| **Free** | $0 | App Prompts, Limited Previews, Directory Access. |
| **Starter** | $10 | Full Code Preview, Verified Badge, Priority AI. |
| **Pro (Whale)** | $30 | Code Download, One-Click Deploy, AI Pitch Builder. |

## 📦 Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start dev server:
    ```bash
    npm run dev
    ```
3.  Add `.env.local` file:
    ```env
    API_KEY=your_gemini_key_here
    ```

## 🌍 Ecosystem Focus

While designed for the entire African continent, AfricaBuilders features deep integrations for the Solana, Ethereum, and Base ecosystems, providing localized support for African developers.
