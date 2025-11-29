# Anodite AI 🤠 - Open Source AI-Powered PR Reviewer

[![GitHub license](https://img.shields.io/badge/license-MIT-blue)](#license)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)](#contributors)

> 🚦 Disclaimer: Anodite AI is in its early stages and may evolve rapidly.
> Contributions and feedback are welcome!

---

## Introduction 🔧

Anodite AI is an **Open Source AI-powered PR Reviewer** that works as a **GitHub App** to automate and simplify the code review process. Built for teams who value fast, efficient, and cost-effective workflows, Anodite AI integrates seamlessly into your GitHub repositories with professional branding—just like CodeRabbit, Dependabot, and other popular tools.

Developed at [_The Hackers Playbook_](https://www.linkedin.com/company/the-hackers-playbook/), Anodite AI solves a persistent challenge: making PR reviews faster and more reliable without relying on expensive third-party services. This lightweight, self-hosted tool can be set up in under **5 minutes** to enhance your team's efficiency and code quality.

---

## Table of Contents 📚

- [Introduction](#introduction)
- [Why Anodite AI?](#why-anodite-ai)
- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [How It Works](#how-it-works)
- [Contributors](#contributors)
- [License](#license)

---

## Why Anodite AI? 💡

Code reviews are essential for maintaining code quality, consistency, and catching bugs early. However, manual reviews are time-consuming, and existing AI solutions are often:
- **Expensive**: Subscription-based pricing that adds up quickly
- **Closed Source**: No transparency or customization
- **External Dependencies**: Reliance on third-party services

**Anodite AI** addresses these challenges by providing:

- ✅ **Open Source**: Full transparency and community-driven development
- ✅ **Self-Hosted**: Deploy on your own infrastructure (Vercel, AWS, etc.)
- ✅ **Cost-Effective**: Pay only for OpenAI API usage (~$0.01-0.50 per PR)
- ✅ **GitHub App**: Professional integration with custom branding
- ✅ **Fast Setup**: Get running in under 5 minutes
- ✅ **Customizable**: Modify prompts, models, and behavior to fit your needs

---

## Key Features ⚙️

- 🤖 **AI-Powered Reviews**: Leverages OpenAI GPT models to analyze code changes
- 💬 **Inline Comments**: Posts feedback directly on specific lines of code
- 🎯 **Smart Analysis**: Identifies bugs, security issues, performance problems, and best practice violations
- 🔧 **Customizable**: Adjust AI models, prompts, and review behavior
- 🚀 **Fast**: Reviews complete in 30-60 seconds for typical PRs
- 🔒 **Secure**: Webhook signature verification and minimal permissions
- 📊 **Professional**: Shows as a branded GitHub App, not generic "github-actions"
- 🌐 **Self-Hosted**: Deploy on Vercel, AWS Lambda, or any serverless platform

---

## Quick Start

### For Repository Owners (Installing the App)

1. **Install the GitHub App** on your repositories
2. **Create a pull request** to test
3. **Get AI-powered feedback** automatically

👉 **See detailed instructions:** [CLIENT_SETUP.md](./CLIENT_SETUP.md)

### For Developers (Setting Up Your Own Instance)

1. **Clone the repository**
2. **Create a GitHub App**
3. **Deploy to Vercel**
4. **Configure environment variables**
5. **Install on your repositories**

👉 **See detailed instructions:** [DEVELOPER_SETUP.md](./DEVELOPER_SETUP.md)

---

## Documentation

- **[CLIENT_SETUP.md](./CLIENT_SETUP.md)** - Guide for installing Anodite AI on your repositories
- **[DEVELOPER_SETUP.md](./DEVELOPER_SETUP.md)** - Complete setup guide for developers and self-hosting

---

## How It Works

```
┌─────────────────┐
│  Pull Request   │
│     Created     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Webhook  │
│   Triggered     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Anodite AI     │
│  (Vercel)       │
└────────┬────────┘
         │
         ├──────────────────┐
         ▼                  ▼
┌─────────────────┐  ┌─────────────────┐
│  Fetch PR Diff  │  │  OpenAI GPT     │
│  from GitHub    │  │  Analysis       │
└────────┬────────┘  └────────┬────────┘
         │                    │
         └──────────┬─────────┘
                    ▼
         ┌─────────────────┐
         │  Post Review    │
         │  Comments       │
         └─────────────────┘
```

### Architecture

- **GitHub App**: Receives webhook events for pull requests
- **Vercel Serverless Function**: Processes webhooks and orchestrates the review
- **OpenAI API**: Analyzes code changes and generates feedback
- **GitHub API**: Posts review comments back to the pull request

---

## Technology Stack

- **Runtime**: Node.js 16+
- **Language**: TypeScript/JavaScript
- **Deployment**: Vercel (or any serverless platform)
- **AI**: OpenAI GPT-3.5/GPT-4
- **GitHub Integration**: Octokit.js
- **Authentication**: GitHub App with JWT

---

## Cost Estimation

### OpenAI API Usage (per PR)

- **Small PR (< 100 lines)**: ~$0.01-0.05
- **Medium PR (100-500 lines)**: ~$0.05-0.15
- **Large PR (500+ lines)**: ~$0.15-0.50

### Hosting (Vercel)

- **Free Tier**: Sufficient for most small-to-medium teams
- **Pro Tier**: $20/month for larger teams with high volume

**Total Cost Example**: A team with 100 PRs/month would spend approximately **$5-15/month** on OpenAI + free Vercel hosting.

---

## Contributing 🤝

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with tests
4. **Commit**: `git commit -m 'Add amazing feature'`
5. **Push**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Contributors

- **Aditya Patange (AdiPat)** - Creator & Maintainer

---

## Roadmap

- [ ] Support for GitLab and Bitbucket
- [ ] Custom review templates
- [ ] Integration with CI/CD pipelines
- [ ] Review analytics dashboard
- [ ] Multi-language support for review comments
- [ ] Code suggestion auto-apply

---

## Support

- **Issues**: [GitHub Issues](https://github.com/thehackersplaybook/anodite-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/thehackersplaybook/anodite-ai/discussions)
- **Contact**: [The Hackers Playbook](https://www.linkedin.com/company/the-hackers-playbook/)

---

## License 🔒

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

> **"Effortless code reviews, powered by AI."** ✨
> 
> Built with ❤️ by [The Hackers Playbook](https://www.linkedin.com/company/the-hackers-playbook/)
