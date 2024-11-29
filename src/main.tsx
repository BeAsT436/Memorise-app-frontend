import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Profile } from './pages/Profile'
import { Landing } from './pages/Landing'

const router = createBrowserRouter([
  {
    path:"/", element:<Landing/>
  },
  {
    path:"/login", element:<Login/>
  },
  {
    path:"/register", element:<Register/>
  },
  {
    path:"/profile", element:<Profile/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
