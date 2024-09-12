import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import HeroSection from './components/HeroSection/HeroSection.jsx'
import CartPage from './components/CartPage/CartPage.jsx'
import AuthPage from './components/AuthPage/AuthPage.jsx'
import NPDAApplicationPage from './components/NPDAApplicationPage/NPDAApplicationPage.jsx'
import MarketplacePage from './components/MarketplacePage/MarketplacePage.jsx'
import CancellationRelease from './components/CancellationRelease/CancellationRelease.jsx'
import Dashboard from './components/DashBoard/DashBoard.jsx'
import CommunityPage from './components/Community/Community.jsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,  // This sets HeroSection as the default route
          element: <HeroSection />
        },
        {
          path: 'Home',
          element: <HeroSection />
        },
        {
          path: 'cart',
          element: <CartPage />
        },
        {
          path: 'Auth',
          element: <AuthPage />
        },
        {
          path: 'npda',
          element: <NPDAApplicationPage />
        },
        {
          path: 'MarketPlace',
          element: <MarketplacePage />
        },
        {
          path: 'CancellationRelease',
          element: <CancellationRelease />
        },
        {
          path: 'DashBoard',
          element: <Dashboard />
        },
        {
          path: 'Community',
          element: <CommunityPage />
        }
      ]
    }
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)