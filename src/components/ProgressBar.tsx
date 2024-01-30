import React from "react";

interface ProgressProp {
  itemCount: number,
  checkItems: [],
  checkedItemCount: number
}
function ProgressBar(props: ProgressProp) {
  let { itemCount, checkItems = [] } = props || {};
  let checkedItemCount = 0;
 checkItems.forEach((item: {state: string}) => {
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
        // aria-valuenow={calcPercentage}
        // aria-valuemin="0"
        // aria-valuemax="100"
        style={{ width: `${calcPercentage}%` }}
      >
        {`${calcPercentage}%`}
      </div>
    </div>
  );
}
export default ProgressBar;
