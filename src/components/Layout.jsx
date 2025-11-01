import React, { useState, useMemo } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/hooks/useCart';
import { LayoutDashboard, BookOpen, Calendar, Target, MessageSquare, Users, Trophy, Settings, LogOut, Menu, X, Moon, Sun, Shield, User, Store as StoreIcon, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ShoppingCart from '@/components/ShoppingCart';
const Layout = () => {
  const {
    user,
    logout
  } = useAuth();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    cartItems
  } = useCart();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalCartItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Trilhas', href: '/dashboard/tracks', icon: BookOpen },
    { name: 'Plano de Estudos', href: '/dashboard/study-plan', icon: Calendar },
    { name: 'Missões', href: '/dashboard/missions', icon: Target },
    { name: 'Falha Controlada', href: '/dashboard/mission-controlled', icon: Shield }, // ✅ Adicionado Falha Controlada
    { name: 'Fórum', href: '/dashboard/forum', icon: MessageSquare },
    { name: 'Mentorias', href: '/dashboard/mentorship', icon: Users },
    { name: 'Ranking', href: '/dashboard/leaderboard', icon: Trophy },
    { name: 'Material Extra', href: '/dashboard/extra-material', icon: StoreIcon } // ✅ Alterado Loja para Material Extra
  ];
  if (user?.role === 'admin') {
    navigation.push({
      name: 'Admin',
      href: '/dashboard/admin',
      icon: Shield
    });
  }
  return <div className="min-h-screen bg-background">
    <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

    <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="flex items-center space-x-2">
            <img className="h-8 hidden dark:block" alt="Testing Company Logo" src="https://horizons-cdn.hostinger.com/0a238b5f-27c7-4b77-ba83-31f710594744/tc-removebg-preview-rOLCk.png" />
            <img className="h-8 dark:hidden" alt="Testing Company Logo" src="https://horizons-cdn.hostinger.com/0a238b5f-27c7-4b77-ba83-31f710594744/icone-09AlM.png" />
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return <Link key={item.name} to={item.href} onClick={() => setSidebarOpen(false)} className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}
                  `}>
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>;
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Link to="/dashboard/profile" className="block mb-3">
            <div className="flex items-center space-x-3">
              <Avatar>
                {/* tenta carregar imagem salva no localStorage */}
                <img
                  src={localStorage.getItem('profileImage') || '/profile.jpg'}
                  alt="Foto de perfil"
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </Link>
          <div className="flex space-x-2">
            <Link to="/dashboard/profile" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="flex-1" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>

    <div className="lg:pl-64">
      <header className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                {user?.points || 410} pts
              </span>
            </div>
            <Button onClick={() => setIsCartOpen(true)} variant="ghost" size="icon" className="relative">
              <ShoppingCartIcon className="h-5 w-5" />
              {totalCartItems > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                {totalCartItems}
              </span>}
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  </div>;
};
export default Layout;