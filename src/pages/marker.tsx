import { ROUTES } from '@/const';
import VRWrapper from '../components/VRWrapper';
import { Model as Astronaut } from './../models/ASTRONAUT';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Page() {
  return (
    <>
      <VRWrapper patternUrl={'/data/pattern-hiro.patt'}>
        <Astronaut />
      </VRWrapper>
      <div className='z-30 fixed bottom-0 left-0 right-0 w-full flex flex-col gap-2 pb-4 px-4'>
        <Link to={ROUTES.VR}>
          <Button
            type='button'
            size='xl'
            variant='outline'
            className='w-full uppercase bg-background'
          >
            Disable AR
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Page;
