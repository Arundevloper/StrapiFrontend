// hoc/withAuth.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated, setRedirectPath } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        setRedirectPath(router.asPath);
        router.push('/login');
      }
    }, [isAuthenticated, setRedirectPath, router]);

    if (!isAuthenticated) {
      return null; // You can return a loading spinner here if you want
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
