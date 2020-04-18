import React from "react";

function ProgressBar(props) {
  return (
    <div className="progress mb-1">
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow="34"
        aria-valuemin="0"
        aria-valuemax="100"
        data-checkitemcount="3"
        data-checkeditem="1"
        style={{ width: "34%" }}
      >
        34%
      </div>
    </div>
  );
}
export default ProgressBar;
