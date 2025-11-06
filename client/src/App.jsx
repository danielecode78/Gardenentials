import { BrowserRouter } from "react-router-dom";
import GardenProvider from "./structure/GardenProvider";
import GardenRoutes from "./structure/GardenRoutes";
import GardenLayout from "./structure/GardenLayout";

export default function App() {
  return (
    <GardenProvider>
      <BrowserRouter>
        <GardenLayout>
          <GardenRoutes />
        </GardenLayout>
      </BrowserRouter>
    </GardenProvider>
  );
}
