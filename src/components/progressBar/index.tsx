import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
const LoadingComponent = dynamic(() => import('@/components/loadingComponent'));

export default function ProgressBar() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
      NProgress.start();
    };
    const handleStop = () => {
      setPageLoading(false);
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      {
        pageLoading && (
          <LoadingComponent />
        )
      }
    </>
  );
}
