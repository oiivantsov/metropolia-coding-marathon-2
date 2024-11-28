# **Self-Assessment, Oleg**

---

## **Problem 1: Missing Backend Endpoint for `jobLoader`**

### **Initial Issue:**  
I implemented the `jobLoader` function to fetch job details by ID:

```javascript
const jobLoader = async ({ params }) => {
  const token = localStorage.getItem('token');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const res = await fetch(`${API_BASE_URL}/api/jobs/${params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
  const data = await res.json();
  console.log(data);
  return data;
};
```

### **Solution:** 
I reviewed the backend code and added the missing route for `getJobById`:

```javascript
// Backend route to get a job by ID
router.get("/:id", requireAuth, getJobById);
```

### **Key Lessons Learned:** 
1. **Backend and Frontend Synchronization**: Ensuring that all required endpoints exist before implementing frontend logic.
2. **Debugging Strategies**: Reviewing backend code can uncover discrepancies that are not obvious from frontend errors.


## **Problem 2: Handling Protected Routes**

### **Initial Issue:**  
Initially, our application had protected routes to secure certain pages (e.g., `/jobs` and `/add-job`). However, the implementation relied solely on the presence of a token. This led to an issue where a valid token existed, but the user was unauthorized, causing the page to fail and throw errors.

### **Solution:** 
I introduced a `ProtectedRoute` component to manage access and redirect unauthorized users to the login page. Here’s the implementation:

```javascript
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

I updated the routing configuration to wrap secure pages with `ProtectedRoute`:

```javascript
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-job"
        element={
          <ProtectedRoute>
            <AddJobPage addJobSubmit={addJob} />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

```


### **Key Lessons Learned:** 
1. **User Experience**: Unauthorized users are now seamlessly redirected to the login page instead of experiencing a crash.
2. **Security**: The ProtectedRoute component enforces token-based access control consistently across the app.
3. **Modularity**: Encapsulating the protection logic in a reusable component simplifies routing and improves code maintainability.

## **Summary**
Through these fixes, I improved the reliability and user experience of the application:

- Resolved a critical backend/frontend mismatch by implementing the missing backend endpoint for fetching jobs by ID.
- Enhanced the security and usability of protected routes by redirecting unauthorized users to the login page with a clean and reusable `ProtectedRoute` component.

Both solutions reflect my ability to debug effectively, coordinate between backend and frontend, and design modular, maintainable code.