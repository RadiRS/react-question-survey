import { Container } from "@mui/material";
import { QuestionContainer } from "./containers";

import { QuestionProvider } from "./context";

function App() {
  return (
    <Container className="root-container">
      <QuestionProvider>
        <QuestionContainer />
      </QuestionProvider>
    </Container>
  );
}

export default App;
