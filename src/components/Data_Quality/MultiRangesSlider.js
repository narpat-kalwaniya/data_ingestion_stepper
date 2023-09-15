import React from "react";
import { useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import "./Data_Quality.css";

function MultiRangesSlider() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue2, setMinValue2] = useState(0);
  const [maxValue2, setMaxValue2] = useState(0);

  return (
    <div>
      <div className="multi-range-slider-container" style={{ border: "none" }}>
        <MultiRangeSlider
          min={0}
          max={100}
          onInput={(e) => {
            setMinValue(e.minValue);
            setMaxValue(e.maxValue);
          }}
          onChange={(e) => {
            setMinValue2(e.minValue);
            setMaxValue2(e.maxValue);
          }}
          label={false}
          ruler={false}
          style={{
            border: "none",
            boxShadow: "none",
            padding: "5px 3px",
            borderStyle: "none",
          }}
          barLeftColor="green"
          barInnerColor="	#FFFF00"
          barRightColor="red"
          thumbLeftColor="orange"
          thumbRightColor="red"
        />
        {/* <div className="divOutput">
          <div>onInput :</div>
          <div>
            <span>{minValue}</span>
            <span>{maxValue}</span>
          </div>
        </div>
        <div className="divOutput">
          <div>onChange :</div>
          <div>
            <span>{minValue2}</span>
            <span>{maxValue2}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default MultiRangesSlider;
