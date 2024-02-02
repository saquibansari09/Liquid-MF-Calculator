import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  Switch,
  Container,
  Typography,
  FormControlLabel,
} from "@mui/material";

const Calculator = () => {
  const [amount, setAmount] = useState("");
  const [units, setUnits] = useState("");
  const [isAmountEnabled, setIsAmountEnabled] = useState(true);
  const navData = useSelector((state) => state.navData);

  const findNavForFund = (fundName) => {
    const fund = navData.find((entry) => entry.fundName === fundName);

    if (fund) {
      return fund.nav;
    } else {
      return "Fund not found";
    }
  };

  const nav = findNavForFund("Motilal Oswal Liquid Fund - Direct Growth");

  const handleAmountChange = (event) => {
    const calculatedUnits = calculateUnitsFromAmount(event.target.value);
    setAmount(event.target.value);
    setUnits(calculatedUnits);
  };

  const handleUnitsChange = (event) => {
    const calculatedAmount = calculateAmountFromUnits(event.target.value);
    setUnits(event.target.value);
    setAmount(calculatedAmount);
  };

  const handleSwitchChange = () => {
    setIsAmountEnabled(!isAmountEnabled);
  };

  const calculateUnitsFromAmount = (amount) => {
    return amount / nav;
  };

  const calculateAmountFromUnits = (units) => {
    return units * nav;
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Liquid MF Calculator
      </Typography>
      <FormControlLabel
        control={
          <Switch checked={isAmountEnabled} onChange={handleSwitchChange} />
        }
        label={isAmountEnabled ? "Amount" : "Units"}
      />
      <TextField
        label={"Amount"}
        type="number"
        fullWidth
        value={amount}
        onChange={handleAmountChange}
        disabled={!isAmountEnabled}
        style={{ marginTop: "10px" }}
      />
      <TextField
        label={"Units"}
        type="number"
        fullWidth
        value={units}
        onChange={handleUnitsChange}
        disabled={isAmountEnabled}
        style={{ marginTop: "10px" }}
      />
    </Container>
  );
};

export default Calculator;
