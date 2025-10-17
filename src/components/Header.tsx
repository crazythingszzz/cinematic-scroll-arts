import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isVisible: boolean;
}

export default function Header({ isVisible }: HeaderProps) {
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Buy', path: '/buy' },
    { name: 'Rent', path: '/rent' },
    { name: 'Projects', path: '/projects' },
    { name: 'Sell with us', path: '/sell-with-us' },
    { name: 'Communities', path: '/communities' },
    { name: 'Lifestyle', path: '/lifestyle' },
    { name: 'About Ortus', path: '/about-ortus' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      
      
        <div className="bg-black/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Logo centered */}
            <Link
              to="/"
              className="flex items-center text-white hover:text-white/80 transition-colors duration-200"
            >
              <img
                src="/images/logo.svg"
                alt="ORTUS"
                className="h-10 w-auto"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<span class="text-3xl font-bold tracking-wider">ORTUS</span>';
                  }
                }}
              />
            </Link>

            {/* Navigation centered below logo */}
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
