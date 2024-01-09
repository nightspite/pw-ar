import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Page() {
  return (
    <div className='w-screen h-[100dvh] flex flex-col items-center justify-center gap-4'>
      <h1>Pick AR demo</h1>

      <Link to='/vr'>
        <Button>VR</Button>
      </Link>

      <Link to='/marker'>
        <Button>Marker</Button>
      </Link>

      <Link to='/image-marker'>
        <Button>Image Marker</Button>
      </Link>

      <Link to='/model-viewer'>
        <Button>Model Viewer</Button>
      </Link>
    </div>
  );
}

export default Page;
