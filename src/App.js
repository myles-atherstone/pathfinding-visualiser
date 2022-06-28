import React, { useState } from "react";
import Select from "./Select/Select";
import Button from "./Button/Button";
import Grid from "./Grid/Grid";
import Instructions from "./Instructions/Instructions";
import "./App.css";

function App() {
  const cellSize = 25;
  const columns = calculateColumns(cellSize);
  const rows = calculateRows(cellSize);

  const [buildingMaze, setBuildingMaze] = useState(false);
  const [running, setRunning] = useState(false);
  const [showInstant, setShowInstant] = useState(false);

  const [algorithm, setAlgorithm] = useState();
  const [maze, setMaze] = useState("none");
  const [speed, setSpeed] = useState();

  const [reset, setReset] = useState(false);
  const [clearWalls, setClearWalls] = useState(false);

  const algorithmOptions = [
    { value: "dijkstra", text: "Dijkstra" },
    { value: "aStar", text: "A*" },
  ];

  const mazeOptions = [
    { value: "none", text: "None" },
    { value: "binaryTree", text: "Binary Tree" },
    { value: "recursiveBacktracking", text: "Recursive Backtracking" },
    { value: "prims", text: "Prims" },
  ];

  const speedOptions = [
    { value: "superFast", text: "Super Fast" },
    { value: "fast", text: "Fast" },
    { value: "normal", text: "Normal" },
    { value: "slow", text: "Slow" },
    { value: "superSlow", text: "Super Slow" },
  ];

  function setButtonText() {
    const index = algorithmOptions.map((item) => item.value).indexOf(algorithm);
    if (index > -1) {
      return algorithmOptions[index].text;
    } else {
      return "LOADING";
    }
  }

  function setRunningFalseCallback() {
    setRunning(false);
    setShowInstant(true);
  }

  function resetCallback(bool) {
    setRunning(false);
    setShowInstant(false);
    setReset(bool);
  }

  function clearWallsCallback(bool) {
    setClearWalls(bool);
  }

  function updateMaze(selectedMaze) {
    setMaze(selectedMaze);
    if (selectedMaze !== "none") {
      setBuildingMaze(true);
    }
  }

  function updateMazeCallback() {
    setBuildingMaze(false);
  }

  return (
    <div>
      <Instructions />
      <div className="toolbar">
        <div className="toolbarTitle">🚀 Pathfinding Visualiser 🚀</div>
        <div className="toolbarTools">
          <Select
            id="algorithms"
            text="Algorithm"
            options={algorithmOptions}
            defaultValue={algorithmOptions[0].value}
            onChange={setAlgorithm}
            disabled={running || buildingMaze}
          />
          <Select
            id="mazes"
            text="Maze"
            options={mazeOptions}
            defaultValue={mazeOptions[0].value}
            onChange={updateMaze}
            disabled={running || buildingMaze}
          />
          <Select
            id="speeds"
            text="Speed"
            options={speedOptions}
            defaultValue={speedOptions[1].value}
            onChange={setSpeed}
            disabled={running || buildingMaze}
          />
          <Button
            text={"Visualise " + setButtonText() + "!"}
            onClick={() => {
              setShowInstant(false);
              setRunning(true);
            }}
            disabled={running || buildingMaze}
          />
          <Button
            text="Reset"
            onClick={() => setReset(true)}
            disabled={running || buildingMaze}
          />
          <Button
            text="Clear Walls"
            onClick={() => setClearWalls(true)}
            disabled={running || buildingMaze}
          />
          <Button
            text="Clear Path"
            onClick={() => setShowInstant(false)}
            disabled={running || buildingMaze}
          />
        </div>
      </div>

      <Grid
        columns={columns}
        rows={rows}
        algorithm={algorithm}
        maze={maze}
        buildingMaze={buildingMaze}
        updateMazeCallback={updateMazeCallback}
        speed={speed}
        running={running}
        setRunningFalseCallback={setRunningFalseCallback}
        showInstant={showInstant}
        reset={reset}
        resetCallback={resetCallback}
        clearWalls={clearWalls}
        clearWallsCallback={clearWallsCallback}
      />
      <div className="footer">
        Made by{" "}
        <b>
          <a href="https://mylesatherstone.com">Myles</a>
        </b>
      </div>
    </div>
  );
}

function calculateColumns(cellSize) {
  const width = window.innerWidth;
  let columns = Math.floor(width / cellSize);
  if (columns % 2 === 0) {
    columns = columns - 1;
  }

  return columns;
}

function calculateRows(cellSize) {
  const toolbarHeight = 110;
  const height = window.innerHeight - cellSize - toolbarHeight;
  let rows = Math.floor(height / cellSize);
  if (rows % 2 === 0) {
    rows = rows - 1;
  }

  return rows;
}

export default App;
