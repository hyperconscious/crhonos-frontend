import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NotFound: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[800px] h-[800px]">
          <div className="absolute inset-0 rounded-full border-2 border-foreground/5 animate-pulse-slow" />
          <div className="absolute inset-0 rounded-full border-2 border-foreground/5 animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 rounded-full border-2 border-foreground/5 animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 rounded-full border-2 border-foreground/5 animate-pulse-slow" style={{ animationDelay: '3s' }} />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-8 py-12">
        <div className="text-center">

          <div className="mb-8 flex justify-center">
            <div className="relative">
              <AlertCircle
                className="h-24 w-24 text-destructive animate-pulse-slow"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 animate-ping opacity-75">
                <AlertCircle
                  className="h-24 w-24 text-destructive"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          <h1 className="mb-4 text-8xl font-extrabold tracking-tight text-primary animate-fade-in">
            404
          </h1>
          <h2 className="mb-4 text-2xl font-semibold text-foreground animate-slide-up">
            Page Not Found
          </h2>
          <p className="mb-8 text-muted-foreground animate-slide-up animation-delay-2000">
            Oops! It seems you've ventured into uncharted territory.
            <br />
            The page you're looking for doesn't exist or was moved.
          </p>

          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all
              ${isDark
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
              } rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;