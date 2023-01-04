import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [colorData, setColorData] = useState([]);
  const [colorPicker, setColorPicker] = useState([]);
  const [colorMode, setColorMode] = useState([]);
  const [before, setBefore] = useState(true);

  //console.log(colorData);
  console.log(colorPicker);
  console.log(colorMode);

  function colorSearch() {
    fetch(
      `https://www.thecolorapi.com/scheme?hex=${colorPicker}&mode=${colorMode}`
    )
      .then((res) => res.json())
      .then((data) => {
        setColorData(data.colors);
      });
    setBefore(false);
  }

  return (
    <div className="App">
      <div className={before ? "topBefore" : "top"}>
        <input
          type="color"
          onChange={(e) => setColorPicker(e.target.value.slice(1))}
        />
        <select onChange={(e) => setColorMode(e.target.value)}>
          <option value="monochrome">Monochrome</option>
          <option value="monochrome-dark">monochrome-dark</option>
          <option value="monochrome-light">monochrome-light</option>
          <option value="analogic">analogic</option>
          <option value="complement">complement</option>
          <option value="analogic-complement">analogic-complement</option>
          <option value="triad">triad</option>
          <option value="quad">quad</option>
        </select>
        <button
          disabled={colorPicker.length && colorMode.length > 0 ? false : true}
          onClick={colorSearch}
        >
          Get Color Scheme
        </button>
      </div>
      <div className="display">
        {colorData.map((color) => (
          <div key={color.hex.value}>
            <div
              className="display-colors"
              style={{ backgroundColor: color.hex.value }}
            ></div>
            <p>{color.hex.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** disable button */
