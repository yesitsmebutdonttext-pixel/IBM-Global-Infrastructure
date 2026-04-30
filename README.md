# IBM Global DPP Infrastructure
### Automated EU 2026 Compliance Engine

This project provides a secure, AI-powered infrastructure for generating **Digital Product Passports (DPP)** as required by upcoming 2026 EU sustainability regulations.

## 🚀 Key Features
* **AI Extraction:** Automatically parses supplier invoices to identify material composition.
* **Security & Verification:** Generates unique HMAC-SHA256 digital signatures for every product to prevent data tampering.
* **GS1 Integration:** Produces GS1-compliant Digital Links for global product tracking.

## 🛠️ Tech Stack
* **Backend:** FastAPI (Python)
* **AI Engine:** OpenAI GPT-4o
* **Frontend:** React (TypeScript)
* **Security:** Cryptographic HMAC Signing

## 📂 Repository Structure
* `main.py`: The core AI backend and security engine.
* `App.tsx`: The supplier-facing upload dashboard.
