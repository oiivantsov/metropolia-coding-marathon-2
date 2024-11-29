
# Handling Environment Variables in Vite to deploy on Render

## 1. Define Environment Variables in `.env` Files

Create `.env` files for both your development and production environments.

### `.env`
```env
VITE_API_BASE_URL=http://localhost:4000
```

### `.env.production`
```env
VITE_API_BASE_URL=https://metropolia-coding-marathon-2-backend.onrender.com
```

## 2. Access Environment Variables in Code

You can access the environment variable using `import.meta.env.VITE_API_BASE_URL`. So you also need to change urls which go to fetch.

### Example:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const fetchJobs = async () => {
  try {
    const res = await fetch(\`\${API_BASE_URL}/api/jobs/\`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: \`Bearer \${localStorage.getItem('token')}\`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Failed to fetch jobs');
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
  }
};
```

## 3. Rebuild and Deploy

After defining the environment variables:

1. **Run the App Locally:**
   ```bash
   npm run dev
   ```
   This will use the `VITE_API_BASE_URL` from `.env`.

2. **Build for Production:**
   ```bash
   npm run build
   ```
   This will use the `VITE_API_BASE_URL` from `.env.production`.

3. **Deploy the Build**: Upload the `dist` folder to Render or any other hosting service.

## 4. Verify API Base URL

Log the `API_BASE_URL` to ensure the correct value is being used:
```javascript
console.log('API Base URL:', API_BASE_URL);
```

## Important Notes:
- **Prefix with `VITE_`:** Vite requires environment variables to be prefixed with `VITE_`.
- **Don't Use `process.env`:** Replace `process.env` with `import.meta.env` in Vite projects. `process.env` will work if you use Create React App
- **Restart the Dev Server:** If you add or modify `.env` files, restart the Vite dev server (`npm run dev`) to apply the changes.
