import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Calculator from "./components/Calculator";
import { fetchNavData } from "./action/actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchNavData());
      } catch (error) {
        console.error("Error fetching navigation data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Calculator />
    </div>
  );
};

export default App;
