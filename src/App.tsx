import 'unfonts.css';
import Index from './pages/index';
import VR from './pages/vr';
import Marker from './pages/marker';
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
    path: ROUTES.MODEL_VIEWER,
    element: <ModelViewer />,
  },
  {
    path: ROUTES.PROBLEM,
    element: <div>There was some problem loading AR</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
