import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

const router = createBrowserRouter([
  {
    path:"/", element:<App/>
  },
  {
    path:"/login", element:<Login/>
  },
  {
    path:"/register", element:<Register/>
  },
  {
    path:"/profile", element:<p>profile</p>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
