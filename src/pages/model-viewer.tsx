import '@google/model-viewer/dist/model-viewer';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MESSAGES, REDIRECT_URL, WEBSITE_URL } from '@/const';
import { Button } from '@/components/ui/button';
import { ModelViewerElement } from '@google/model-viewer';
import { VolumeX, Volume2 } from 'lucide-react';
import { Spinner } from '@/components/spinner';

function Page() {
  const arButtonRef = useRef<HTMLButtonElement>(null);
  const redirectButtonRef = useRef<HTMLButtonElement>(null);
  const modelViewerRef = useRef<ModelViewerElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  const isiOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isArLoading, setIsArLoading] = useState(false);
  const [canActivateAR, setCanActivateAR] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(true);

  //
  // Enter AR button && is model viewer loaded
  //
  useEffect(() => {
    modelViewerRef?.current?.addEventListener('load', () => {
      setIsLoaded(true);
      setCanActivateAR(Boolean(modelViewerRef?.current?.canActivateAR));
    });
  }, []);

  //
  // animation + sound play
  //
  const play = () => {
    setIsPlaying(true);

    modelViewerRef?.current?.play();
  };

  const pause = () => {
    setIsPlaying(false);
  };

  //
  // AR
  //
  // useEffect(() => {
  //   if (isiOS && canActivateAR) {
  //     // timeout, so loading textures doesn't break on ios safari
  //     setTimeout(() => {
  //       activateAr();
  //     }, 1000);
  //   }
  // }, [activateAr, canActivateAR, isiOS]);

  //
  // AR call to action
  //
  useEffect(() => {
    if (isiOS) {
      modelViewerRef?.current?.addEventListener(
        'quick-look-button-tapped',
        () => redirectButtonRef?.current?.click()
      );
    }
  }, [isiOS]);

  const activateAr = useCallback(() => {
    setIsArLoading(true);
    modelViewerRef?.current?.activateAR();
    setIsDialogOpen(false);
    pause();

    setTimeout(() => {
      setIsArLoading(false);
    }, 5000);
  }, [modelViewerRef]);

  const handleDialog = () => {
    // if (canActivateAR) {
    //   activateAr();
    // } else {
    play();
    // }
    setIsDialogOpen(false);
  };

  return (
    <div className='w-screen h-[100dvh]'>
      <model-viewer
        camera-target='0m 0m 0m'
        camera-orbit='25deg 55deg 1m'
        // animation-crossfade-duration='0'
        src={encodeURI(
          WEBSITE_URL +
            '/assets/rawModels/Astronaut.glb?' +
            'title=' +
            MESSAGES?.TITLE +
            '&link=' +
            REDIRECT_URL +
            '#S.browser_fallback_url=' +
            REDIRECT_URL
        )}
        ios-src={encodeURI(
          WEBSITE_URL +
            '/assets/rawModels/Astronaut.usdz' +
            '#checkoutTitle=' +
            MESSAGES?.TITLE +
            '&checkoutSubtitle=' +
            MESSAGES?.DESCRIPTION
        )}
        // alt='A 3D model of an astronaut'
        ar
        // ar-modes='scene-viewer web-xr quick-look'
        ar-modes='scene-viewer quick-look'
        camera-controls
        // autoplay
        shadow-intensity={1}
        // @ts-ignore
        ref={modelViewerRef}
        style={
          {
            width: '100%',
            height: '100%',
          } as any
        }
      ></model-viewer>

      {isLoaded && (
        <div className='z-30 fixed bottom-0 left-0 right-0 w-full flex flex-col gap-2 pb-4 px-4'>
          <Button
            type='button'
            variant='outline'
            className='ml-auto w-12 h-12 p-0'
            disabled={!isLoaded}
            onClick={() => (isPlaying ? pause() : play())}
            ref={playButtonRef}
          >
            {isPlaying ? (
              <>
                <Volume2 className='w-5 h-5' />
              </>
            ) : (
              <>
                <VolumeX className='w-5 h-5' />
              </>
            )}
          </Button>

          {canActivateAR ? (
            <Button
              type='button'
              size='xl'
              variant='outline'
              className='w-full uppercase bg-background'
              disabled={!canActivateAR || !isLoaded || isArLoading}
              onClick={() => activateAr()}
              ref={arButtonRef}
            >
              {isArLoading ? 'Loading...' : MESSAGES?.VIEW_IN_AR_TEXT}
            </Button>
          ) : null}
        </div>
      )}

      {isDialogOpen &&
        (isLoaded ? (
          <div
            className='fixed z-40 inset-0 bg-background flex justify-center items-center'
            onClick={handleDialog}
          >
            <Button
              type='button'
              variant='outline'
              className='rounded-full h-[104px] w-[104px] p-0 transition-all cursor-pointer uppercase tracking-[0.5em] indent-[0.5em] text-center'
            >
              {MESSAGES?.WELCOME_DIALOG_BUTTON}
            </Button>
          </div>
        ) : (
          <div className='fixed z-40 inset-0 bg-background flex justify-center items-center'>
            <Spinner />
          </div>
        ))}
    </div>
  );
}

export default Page;
