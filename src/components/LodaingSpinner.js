import React from "react";
//import {Dna} from "react-loader-spinner";
import PropagateLoader from "react-spinners/PropagateLoader";
import GridLoader from "react-spinners/GridLoader";
const LodaingSpinner = () => {
  return (
    <div className="loading">
      <GridLoader
        color={"#EB455F"}
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LodaingSpinner;
