import 'unfonts.css';
import Index from './pages/index';
import VR from './pages/vr';
import Marker from './pages/marker';
import ImageMarker from './pages/image-marker';
import ModelViewer from './pages/model-viewer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './const';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Index />,
    // children: [],
  },
  {
    path: ROUTES.VR,
    element: <VR />,
  },
  {
    path: ROUTES.MARKER,
    element: <Marker />,
  },
  {
    path: ROUTES.IMAGE_MARKER,
    element: <ImageMarker />,
  },
  {
    path: ROUTES.MODEL_VIEWER,
    element: <ModelViewer />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
