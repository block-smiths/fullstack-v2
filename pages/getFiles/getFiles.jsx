import React from "react";
import classes from "./getfiles.module.css";

const getFiles = () => {
  const handler = () => {};
  return (
    <div className={classes.container}>
      <div className={classes.box1}>
        <select className={classes.select}>
          Type
          <option value="adhar">Adhar Card</option>
          <option value="pan">Pan Card</option>
        </select>
        <input className={classes.input} type="text" placeholder="Hash" />
        <button className={classes.btn} onClick={handler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default getFiles;
