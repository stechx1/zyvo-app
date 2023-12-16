import CircularSlider from "@fseehawer/react-circular-slider";
import React from "react";

export default function DateTimePicker() {
  return (
    <div>
      <CircularSlider
        width={200}
        label="Hours"
        labelFontSize="20px"
        labelColor="#005a58"
        knobColor="#005a58"
        progressColorFrom="#00bfbd"
        progressColorTo="#009c9a"
        progressSize={24}
        trackColor="#eeeeee"
        trackSize={24}
        data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]} 
        dataIndex={10}
        onChange={(value: any) => {
          console.log(value);
        }}
      />
    </div>
  );
}
