import * as React from 'react';
import dynamic from 'next/dynamic';
import AOS from "aos";
import "aos/dist/aos.css";

const Layout = dynamic(() => import('@/components/layout'));
const Battle = dynamic(() => import('@/components/battleSection'));

function Home() {

  React.useEffect(() => {
    AOS.init({once: true});
    AOS.refresh();
  }, []);
  return (
    <Layout>
      <div className='sections h-full overflow-hidden text-slate-200'>
        <Battle />
      </div>
    </Layout>
  );
}
export default Home;
