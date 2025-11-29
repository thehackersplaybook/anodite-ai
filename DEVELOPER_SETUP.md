# Anodite AI - Developer Setup Guide 🛠️

This guide will help you set up Anodite AI for development, testing, and deployment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [GitHub App Configuration](#github-app-configuration)
- [Deployment to Vercel](#deployment-to-vercel)
- [Testing](#testing)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or higher)
- **npm** (v7.x or higher)
- **Git**
- **Vercel CLI** (for deployment)
- **GitHub account** with admin access to create GitHub Apps
- **OpenAI API account** with available credits

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/thehackersplaybook/anodite-ai.git
cd anodite-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your credentials (see [Environment Configuration](#environment-configuration) below).

### 4. Build the Project

```bash
npm run build
```

### 5. Run Tests (Optional)

```bash
npm test
```

---

## Project Structure

```
anodite-ai/
├── api/                      # Vercel serverless functions
│   ├── webhook.js           # Main webhook handler for GitHub events
│   └── setup/
│       └── complete.js      # GitHub App setup completion handler
├── src/                     # Source code (if using TypeScript build)
│   ├── ai_reviewer.ts       # AI review logic
│   ├── constants.ts         # Configuration constants
│   ├── helper.ts            # Helper utilities
│   ├── llm_interface.ts     # OpenAI interface
│   ├── main.ts              # Main entry point
│   ├── pull_request.ts      # PR handling
│   └── search.ts            # Code search utilities
├── types/                   # TypeScript type definitions
├── __tests__/               # Test files
├── .env.example             # Example environment variables
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment configuration
└── README.md                # Project overview
```

---

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# GitHub App Configuration
GITHUB_APP_ID=your_app_id_here
GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
your_private_key_here
-----END RSA PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET=your_webhook_secret_here

# OpenAI Configuration
OPENAI_API_KEY=sk-your_openai_api_key_here

# Optional: Development settings
NODE_ENV=development
```

### Getting the Values:

- **GITHUB_APP_ID**: Obtained when creating the GitHub App (see next section)
- **GITHUB_PRIVATE_KEY**: Generated and downloaded when creating the GitHub App
- **GITHUB_WEBHOOK_SECRET**: A random string you create for webhook security
- **OPENAI_API_KEY**: From [OpenAI API Keys](https://platform.openai.com/api-keys)

---

## GitHub App Configuration

### Step 1: Create a GitHub App

1. Go to [GitHub Developer Settings](https://github.com/settings/apps)
2. Click **"New GitHub App"**
3. Fill in the details:

   **Basic Information:**
   - **GitHub App name**: `Anodite-AI-Dev` (or your preferred name)
   - **Description**: `AI-powered code review assistant`
   - **Homepage URL**: `https://github.com/thehackersplaybook/anodite-ai`
   
   **Webhook:**
   - **Webhook URL**: `https://your-vercel-url.vercel.app/api/webhook` (use ngrok for local testing)
   - **Webhook secret**: Generate a random string (save this for `.env`)
   
   **Permissions:**
   - Repository permissions:
     - **Contents**: Read-only
     - **Metadata**: Read-only
     - **Pull requests**: Read & write
   
   **Subscribe to events:**
   - ✅ Pull request

4. Click **"Create GitHub App"**
5. Note down the **App ID**
6. Scroll down and click **"Generate a private key"**
7. Download the `.pem` file (this is your `GITHUB_PRIVATE_KEY`)

### Step 2: Install the App

1. Go to your GitHub App settings
2. Click **"Install App"** in the left sidebar
3. Select the repositories you want to enable Anodite AI for
4. Click **"Install"**

---

## Deployment to Vercel

### Option 1: Using Vercel CLI (Recommended for Development)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables:**
   ```bash
   vercel env add GITHUB_APP_ID
   vercel env add GITHUB_PRIVATE_KEY
   vercel env add GITHUB_WEBHOOK_SECRET
   vercel env add OPENAI_API_KEY
   ```

5. **Redeploy to apply environment variables:**
   ```bash
   vercel --prod
   ```

### Option 2: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Import Project"**
3. Import from GitHub: `thehackersplaybook/anodite-ai`
4. Configure environment variables in the dashboard
5. Click **"Deploy"**

### Update GitHub App Webhook URL

After deployment, update your GitHub App's webhook URL:

1. Go to your GitHub App settings
2. Update **Webhook URL** to: `https://your-vercel-url.vercel.app/api/webhook`
3. Save changes

---

## Testing

### Local Testing with ngrok

For local webhook testing:

1. **Install ngrok:**
   ```bash
   npm install -g ngrok
   ```

2. **Start your local server:**
   ```bash
   vercel dev
   ```

3. **In another terminal, start ngrok:**
   ```bash
   ngrok http 3000
   ```

4. **Update GitHub App webhook URL** to the ngrok URL:
   ```
   https://your-ngrok-url.ngrok.io/api/webhook
   ```

5. **Create a test PR** in a repository where the app is installed

### Running Unit Tests

```bash
npm test
```

### Running Linter

```bash
npm run lint
```

---

## Development Workflow

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the appropriate files

3. **Test locally** using ngrok or Vercel dev

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

5. **Push to GitHub:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** for review

### Customizing AI Behavior

To modify the AI review behavior, edit the following:

**Review Prompt** (`api/webhook.js`):
```javascript
const PROMPT_FOR_PR_REVIEW = 
  'You are ReviewRanger 🤠, an AI code review assistant...';
```

**AI Model** (`api/webhook.js`):
```javascript
model: 'gpt-3.5-turbo', // Change to 'gpt-4' for better quality
```

**File Filtering** (`api/webhook.js` - `parseDiffToChanges` function):
```javascript
// Add logic to skip certain files
if (currentFile.includes('node_modules') || currentFile.endsWith('.lock')) {
  continue;
}
```

---

## Troubleshooting

### Common Issues

**❌ "Webhook delivery failed"**
- Check Vercel function logs: `vercel logs --follow`
- Verify webhook URL is correct in GitHub App settings
- Ensure environment variables are set in Vercel

**❌ "Authentication failed"**
- Verify `GITHUB_APP_ID` is correct
- Check `GITHUB_PRIVATE_KEY` includes full PEM content with line breaks
- Ensure the app is installed on the repository

**❌ "OpenAI API error"**
- Verify `OPENAI_API_KEY` is correct
- Check OpenAI account has sufficient credits
- Review rate limits at [OpenAI Usage](https://platform.openai.com/usage)

**❌ "Module not found" errors**
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Viewing Logs

**Vercel Logs:**
```bash
# Real-time logs
vercel logs --follow

# Specific function logs
vercel logs api/webhook.js
```

**GitHub Webhook Logs:**
1. Go to your GitHub App settings
2. Click **"Advanced"** tab
3. View recent webhook deliveries and responses

### Debug Mode

Enable verbose logging by adding to `.env`:
```env
DEBUG=true
LOG_LEVEL=debug
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

---

## Additional Resources

- [GitHub Apps Documentation](https://docs.github.com/en/developers/apps)
- [Vercel Documentation](https://vercel.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Octokit.js Documentation](https://octokit.github.io/rest.js/)

---

## Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/thehackersplaybook/anodite-ai/issues)
- Contact: [The Hackers Playbook](https://www.linkedin.com/company/the-hackers-playbook/)

---

**Happy Coding!** 🚀
