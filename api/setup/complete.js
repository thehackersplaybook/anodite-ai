export default async function handler(req, res) {
  const { installation_id, setup_action } = req.query;
  
  if (setup_action === 'install') {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>ReviewRanger Setup Complete</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 600px; 
            margin: 50px auto; 
            padding: 20px;
            text-align: center;
          }
          .success { color: #28a745; }
          .code { 
            background: #f6f8fa; 
            padding: 15px; 
            border-radius: 6px; 
            font-family: monospace;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <h1>🤠 ReviewRanger Setup Complete!</h1>
        <p class="success">✅ Successfully installed on your repositories</p>
        
        <h3>What happens next?</h3>
        <ul style="text-align: left;">
          <li>ReviewRanger will automatically review new pull requests</li>
          <li>AI-powered feedback will appear as PR comments</li>
          <li>No additional configuration needed</li>
        </ul>
        
        <h3>Test it out:</h3>
        <div class="code">
          1. Create a new branch<br>
          2. Make some code changes<br>
          3. Open a pull request<br>
          4. Watch ReviewRanger analyze your code! 🤠
        </div>
        
        <p>
          <a href="https://github.com/settings/installations" target="_blank">
            Manage Installation Settings
          </a>
        </p>
      </body>
      </html>
    `);
  }
  
  return res.status(200).json({ message: 'Setup complete' });
}
