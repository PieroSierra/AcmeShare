import { ArtifactHero } from "./components/ArtifactHero";
import { FlightPoll } from "./components/FlightPoll";
import { Layout } from "./components/Layout";
import { lisbonWeekendArtifact } from "./data/artifacts";

function App() {
  return (
    <Layout>
      <ArtifactHero artifact={lisbonWeekendArtifact} />
      <FlightPoll artifact={lisbonWeekendArtifact} />
    </Layout>
  );
}

export default App;
