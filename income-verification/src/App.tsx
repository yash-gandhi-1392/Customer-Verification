import { useState } from "react";
import { Container, Paper, Step, StepLabel, Stepper } from "@mui/material";
import SoftDeclaration from "./components/SoftDeclaration";
import AutoIncomeInfo from "./components/AutoIncomeInfo";
import Processing from "./components/Processing";
import IncomeResult from "./components/IncomeResult";
import { fetchMockTransactions } from "./services/mockFlinksService";
import { processIncome } from "./services/incomeProcessor";
import type { IncomeResultType } from "./types/income.types";

const steps = ["Declaration", "Connect Bank", "Processing", "Result"];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<IncomeResultType | null>(null);

  const handleConnect = async () => {
    setActiveStep(2);
    const transactions = await fetchMockTransactions();
    const computed = processIncome(transactions);
    setResult(computed);
    setActiveStep(3);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <SoftDeclaration onNext={() => setActiveStep(1)} />
        )}

        {activeStep === 1 && (
          <AutoIncomeInfo onConnect={handleConnect} />
        )}

        {activeStep === 2 && <Processing />}

        {activeStep === 3 && result && (
          <IncomeResult result={result} />
        )}
      </Paper>
    </Container>
  );
}

export default App;
