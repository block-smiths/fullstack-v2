import React from "react";
import classes from "./getFiles.module.css";


const getFiles = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box1}>
        <div>
          <p>Hash : yvcsdhvcsew</p>
          <p>Type : Adhar</p>
        </div>
      </div>
      <div className={classes.box1}>
        <div>
          <p>Hash : yvcsdhvcsew</p>
          <p>Type : PAN</p>
        </div>
      </div>
    </div>
  );
};

export default getFiles;
