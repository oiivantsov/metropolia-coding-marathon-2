
# Ensuring Frontend-Backend Communication in Vite for Production

Follow these steps to ensure your Vite frontend communicates properly with your backend in production, especially when deployed on Render or similar platforms.

## 1. Use Full Backend URL in API Calls

Update your API calls in the frontend to use the full backend URL instead of relying on the `/api` proxy.

### Example:

Replace:
```javascript
fetch('/api/jobs/', { ... });
```

With:
```javascript
fetch('https://metropolia-coding-marathon-2-backend.onrender.com/api/jobs/', { ... });
```

You can store the base URL in an environment variable to make it flexible and maintainable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Example:
fetch(\`\${API_BASE_URL}/api/jobs/\`, { ... });
```

For Vite, create an `.env.production` file:

```
VITE_API_BASE_URL=https://metropolia-coding-marathon-2-backend.onrender.com
```

Then, access it in the code:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

---

## 2. Update the Backend to Handle CORS

When the frontend and backend are on different domains (e.g., `render.com`), you must enable **CORS** in your backend.

### Example for Express:
```javascript
const cors = require('cors');

// Configure CORS
const corsOptions = {
  origin: 'https://your-frontend-url.onrender.com', // Replace with your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));
```

This ensures that the backend accepts requests from your deployed frontend.

---

## 3. Check Backend Route Structure

Verify that the backend routes are accessible at the expected URLs. For example:
- `GET https://metropolia-coding-marathon-2-backend.onrender.com/api/jobs/`
- `GET https://metropolia-coding-marathon-2-backend.onrender.com/api/jobs/:id`

Use a tool like **Postman** or the browser console to test these URLs directly.

---

## 4. Update Deployed Frontend Build

Ensure your deployed frontend build is configured to use the full backend URL. Update your `.env` files accordingly, rebuild the project, and redeploy.

### Steps:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to Render or your preferred hosting platform.

---

## 5. Debugging Tips

- Open the browser developer tools on the deployed frontend and check:
  - The actual request URL (under the **Network** tab).
  - The response status and body.
- Confirm that the backend URL is correct and accessible.

---

## 6. Example API Utility

To simplify API requests, you can create a utility function for handling API calls with the base URL.

### Utility Function Example:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token'); // Add token if needed
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token ? \`Bearer \${token}\` : undefined,
    ...options.headers,
  };

  const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API Error');
  }

  return response.json();
};

// Example usage
apiFetch('/api/jobs/')
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));
```

---

## 7. Redeploy

- Redeploy both the backend and frontend after making these changes.
- Ensure the frontend points to the correct backend URL.

By addressing these points, your frontend and backend will communicate properly, even when deployed on Render.
