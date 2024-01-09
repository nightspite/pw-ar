import { Button } from '@/components/ui/button';
import { ROUTES } from '@/const';
import { Link } from 'react-router-dom';

function Page() {
  return (
    <div className='w-screen h-[100dvh] flex flex-col items-center justify-center gap-4'>
      <h1>Pick AR demo</h1>

      <Link to={ROUTES.MARKER}>
        <Button>Marker tracking</Button>
      </Link>

      <Link to={ROUTES.MODEL_VIEWER}>
        <Button>World tracking</Button>
      </Link>
    </div>
  );
}

export default Page;
