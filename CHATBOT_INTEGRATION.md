# AI Chatbot Integration Guide

This guide explains how to integrate the AI chatbot widget into your HTML pages.

## Quick Integration

Add these three lines before the closing `</body>` tag in your HTML files:

```html
<!-- AI Chatbot Widget -->
<link rel="stylesheet" href="client/dist/style.css">
<div id="chat-root"></div>
<script src="client/dist/chat-widget.umd.cjs"></script>
```

## Step-by-Step Integration

### 1. Build the Client

First, ensure you have built the client application:

```bash
cd client
npm install
npm run build
```

This creates the production-ready files in `client/dist/`:
- `chat-widget.umd.cjs` - JavaScript bundle
- `style.css` - Widget styles

### 2. Integration Options

#### Option A: Direct Integration (Development/Local)

For local development or if the HTML files are in the same repository:

```html
<!-- Add before closing </body> tag -->
<link rel="stylesheet" href="client/dist/style.css">
<div id="chat-root"></div>
<script src="client/dist/chat-widget.umd.cjs"></script>
</body>
</html>
```

#### Option B: Copy to Static Assets (Production)

For production deployment, copy the built files to your web server's static assets directory:

```bash
# Example: copy to an 'assets' or 'static' directory
cp client/dist/chat-widget.umd.cjs /path/to/webroot/assets/
cp client/dist/style.css /path/to/webroot/assets/
```

Then reference them in your HTML:

```html
<!-- Add before closing </body> tag -->
<link rel="stylesheet" href="/assets/style.css">
<div id="chat-root"></div>
<script src="/assets/chat-widget.umd.cjs"></script>
</body>
</html>
```

#### Option C: CDN (Future)

Once deployed to a CDN, you can use absolute URLs:

```html
<link rel="stylesheet" href="https://cdn.example.com/chat-widget/style.css">
<div id="chat-root"></div>
<script src="https://cdn.example.com/chat-widget/chat-widget.umd.cjs"></script>
```

### 3. Example Integration in Home.html

Here's how to add the widget to `Home.html`:

1. Open `Home.html` in your editor
2. Find the closing `</body>` tag (usually at the end of the file)
3. Add the widget code just before `</body>`

**Before:**
```html
    </section>
  </body>
</html>
```

**After:**
```html
    </section>
    
    <!-- AI Chatbot Widget -->
    <link rel="stylesheet" href="client/dist/style.css">
    <div id="chat-root"></div>
    <script src="client/dist/chat-widget.umd.cjs"></script>
  </body>
</html>
```

### 4. Verify Integration

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Serve the HTML file:**
   - Open the HTML file in a browser directly, OR
   - Use a local web server:
     ```bash
     python3 -m http.server 8080
     # Then visit http://localhost:8080/Home.html
     ```

3. **Test the widget:**
   - Look for the purple chat button (💬) in the bottom-right corner
   - Click it to open the chat widget
   - Type a message and send it
   - Verify you get a response

## Configuration

### Backend API URL

By default, the widget connects to `http://localhost:3001`. To change this:

1. Edit `client/src/types/chat.ts`
2. Update the `API_CONFIG.BASE_URL`:
   ```typescript
   export const API_CONFIG = {
     BASE_URL: 'https://your-api-server.com',
     CHAT_ENDPOINT: '/api/chat',
   };
   ```
3. Rebuild the client: `npm run build`

### Environment Variables

The backend requires an OpenAI API key. Set it in `server/.env`:

```bash
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
RATE_LIMIT_PER_MIN=10
```

## Styling Customization

The widget uses CSS variables for theming. You can override them in your own CSS:

```css
/* Add to your custom CSS file */
.chat-widget {
  /* Position adjustments */
  --chat-bottom: 20px;
  --chat-right: 20px;
}

.chat-toggle-button {
  /* Change colors */
  background: linear-gradient(135deg, #yourcolor1 0%, #yourcolor2 100%);
}

.chat-header {
  /* Change header color */
  background: linear-gradient(135deg, #yourcolor1 0%, #yourcolor2 100%);
}
```

## Troubleshooting

### Widget doesn't appear

1. **Check console for errors:**
   - Open browser DevTools (F12)
   - Look for JavaScript errors in the Console tab

2. **Verify files are loaded:**
   - Check the Network tab in DevTools
   - Ensure `chat-widget.umd.cjs` and `style.css` load successfully (200 status)

3. **Check paths:**
   - Ensure the paths in your HTML match where the files are located
   - Try using absolute paths if relative paths don't work

### Chat doesn't send messages

1. **Verify backend is running:**
   ```bash
   curl http://localhost:3001/health
   # Should return: {"status":"ok","timestamp":"..."}
   ```

2. **Check CORS settings:**
   - If serving from a different domain, update `server/src/index.ts`
   - Add your domain to the `cors.origin` array

3. **Check browser console:**
   - Look for network errors
   - Verify the API endpoint URL is correct

### "API key not configured" message

This is expected if you haven't set `OPENAI_API_KEY` in `server/.env`. To fix:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example server/.env
   ```

2. Edit `server/.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

3. Restart the server

## Pages to Integrate

Consider adding the chatbot to these pages:

- ✅ `Home.html` - Main landing page
- ✅ `About.html` - About page
- ✅ `Contact.html` - Contact page
- ✅ `BigdataPlatform.html` - Big data platform page
- ✅ `OpensourceDatabase.html` - Open source database page

## Production Deployment

For production deployment:

1. **Build both client and server:**
   ```bash
   cd client && npm run build
   cd ../server && npm run build
   ```

2. **Set environment variables:**
   - Use your hosting provider's environment variable management
   - Never commit `.env` files with real API keys

3. **Deploy the server:**
   - Deploy `server/dist/` to your Node.js hosting
   - Ensure environment variables are set
   - Start with: `node dist/index.js`

4. **Deploy the client:**
   - Copy `client/dist/*` to your static file hosting
   - Update HTML files to reference the deployed URLs
   - Or integrate the widget code directly into your build process

5. **Update CORS settings:**
   - In `server/src/index.ts`, update the `cors.origin` array
   - Add your production domain(s)
   - Rebuild and redeploy the server

## Security Considerations

- ✅ API key is stored server-side only
- ✅ Rate limiting prevents abuse (10 requests/minute per IP)
- ✅ Input validation prevents malicious payloads
- ✅ CORS restricts which domains can access the API
- ⚠️ Consider adding user authentication (future OAuth integration)
- ⚠️ Monitor API usage and costs
- ⚠️ Implement additional security measures as needed for your use case

## Next Steps

1. **Customize the widget:** Adjust colors, positioning, or messages
2. **Add to all pages:** Integrate the widget across your entire site
3. **Monitor usage:** Track API calls and user interactions
4. **Implement RAG:** Add context from your website content (see `server/retrieval/embeddings.ts`)
5. **Add authentication:** Integrate with OAuth (future enhancement)
6. **Enable streaming:** Implement streaming responses for better UX

## Support

For issues or questions:
- Check the [README.md](README.md) for detailed documentation
- Review the [troubleshooting section](#troubleshooting)
- Check the issue tracker on GitHub
- Review the code comments for implementation details
