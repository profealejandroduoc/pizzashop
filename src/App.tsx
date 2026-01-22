import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import './index.css';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Cart } from './pages/Cart';
import { Payment } from './pages/Payment';
import { Orders } from './pages/Orders';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProductManagement } from './pages/admin/ProductManagement';
import { UserManagement } from './pages/admin/UserManagement';
import { OrderManagement } from './pages/admin/OrderManagement';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Client Routes - with Navbar and Footer */}
            <Route path="/" element={
              <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                  <Home />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/menu" element={
              <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                  <Menu />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/cart" element={
              <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                  <Cart />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/checkout" element={
              <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                  <Payment />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/orders" element={
              <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                  <Orders />
                </main>
                <Footer />
              </div>
            } />

            {/* Admin Routes - WITHOUT Navbar and Footer */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="orders" element={<OrderManagement />} />
              </Route>
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
