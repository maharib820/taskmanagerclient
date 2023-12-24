import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Layout/Root';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import AuthProvider from './AuthProvider/AuthProvider';
import Register from './Pages/Register';
import TaskManager from './Pages/TaskManager';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PrivateRoute from './Route/PrivateRoute';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Update from './Pages/Update';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <LandingPage></LandingPage>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/taskmanager",
        element: <PrivateRoute><TaskManager></TaskManager></PrivateRoute>
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/update/:id",
        element: <Update></Update>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
)
