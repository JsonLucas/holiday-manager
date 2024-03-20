import { AppRoutes } from './routes';
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  return (
    <APIProvider apiKey="AIzaSyCrJJit_yKkbSFMvC9khGE0oS5Zc_nhG5Y">
      <AppRoutes />
    </APIProvider>
  )
}

export default App
