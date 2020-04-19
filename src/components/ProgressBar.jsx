import React from "react";

function ProgressBar(props) {
  let { itemCount, checkItems } = props;
  let checkedItemCount = 0;
  props.checkItems.forEach((item) => {
    if (item.state === "complete") {
      checkedItemCount++;
    }
  });

  let calcPercentage = Math.ceil(100 / itemCount);
  if (itemCount === checkedItemCount && checkedItemCount !== 0) {
    calcPercentage = 100;
  } else if (checkedItemCount === 0) {
    calcPercentage = 0;
  } else {
    calcPercentage = calcPercentage * checkedItemCount;
  }
  return (
    <div className="progress mb-1">
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={calcPercentage}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: `${calcPercentage}%` }}
      >
        {`${calcPercentage}%`}
      </div>
    </div>
  );
}
export default ProgressBar;
