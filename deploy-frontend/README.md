
# README: Deploying Frontend on Render

## Step 1: Prepare Code and Environment Variables

1. **Update the Code**:
   - Follow the instructions in the file **`frontend_deploy_on_render.md`** to configure your frontend project for deployment on Render.
   - For Vite projects, ensure environment variables are handled correctly as explained in **`vite_env_var.md`**.

2. **Set Environment Variables**:
   - Use the backend URL as the `VITE_API_BASE_URL` (for Vite) or `REACT_APP_API_BASE_URL` (for React).
   - Refer to **`vite_env_var.md`** for details on setting up the `.env` files.

---

## Step 2: Deploy Frontend on Render

1. **Select the Correct Branch**:
   - During the Render deployment setup, select the branch containing your frontend code.

2. **Set the Build Folder**:
   - For React projects, set the build folder to `build/`.
   - For Vite projects, set the build folder to `dist/`.

3. **Configure Environment Variables**:
   - Add the backend URL as an environment variable during deployment:
     - Use the screenshot **`render_env.png`** for guidance on adding environment variables in the Render dashboard.

---

Following these steps will ensure your frontend is correctly deployed on Render and can communicate with the backend.
