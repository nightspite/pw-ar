import VRWrapper from '../components/VRWrapper';
import { Model as Astronaut } from './../models/ASTRONAUT';

function Page() {
  return (
    <VRWrapper patternUrl={'/data/pattern.patt'}>
      <Astronaut />
    </VRWrapper>
  );
}

export default Page;
