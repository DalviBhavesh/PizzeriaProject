import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import BuildUrPizza from './components/BuildUrPizza.jsx'
import Cart from './components/Cart.jsx'
import OrderPizza from './components/OrderPizza.jsx'

import { Provider } from 'react-redux'
import store from './store/store.js'

import App from './App.jsx'

// USE 'createHashRoute()' IF THE PROJECT IS TO BE UPLOADED TO GITHUB 

// const router = createHashRouter([
//   {
//     path: "",
//     element: <App />,
//     children: [
//       {
//         path:"",
//         element: <Home />
//       },
//       {
//         path:"buildUrPizza",
//         element: <BuildUrPizza />
//       },
//       {
//         path:"cart",
//         element: <Cart />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path:"",
        element: <Home />
      },
      {
        path:"orderPizza",
        element: <OrderPizza />
      },
      {
        path:"buildUrPizza",
        element: <BuildUrPizza />
      },
      {
        path:"cart",
        element: <Cart />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    {/* Redux includes a <Provider /> component, which makes the Redux store available to the rest of the app */}
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>

)

