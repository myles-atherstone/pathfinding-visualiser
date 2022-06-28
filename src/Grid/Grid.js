import React, { useState, createRef, useEffect } from "react";
import Cell from "./Cell/Cell";
import createGraph from "./CreateGraph";
import dijkstra from "./Algorithms/Dijkstra";
import astar from "./Algorithms/Astar";

import binaryTree from "./Algorithms/Mazes/BinaryTree";
import recursiveBacktracking from "./Algorithms/Mazes/RecursiveBacktracking";
import prims from "./Algorithms/Mazes/Prims";

import "./Grid.css";

const wallCells = [];

function Grid(props) {
  const {
    columns,
    rows,
    algorithm,
    maze,
    speed,
    running,
    buildingMaze,
    showInstant,
  } = props;

  const cellRefs = createCellRefs();
  const table = createTable(columns, rows);

  const [startCell, setStartCell] = useState(() =>
    getInitialStartCell(columns, rows)
  );
  const [targetCell, setTargetCell] = useState(() =>
    getInitialTargetCell(columns, rows)
  );
  const [changingStartCell, setChangingStartCell] = useState(false);
  const [changingTargetCell, setChangingTargetCell] = useState(false);
  const [changingWallCells, setChangingWallCells] = useState(false);

  function createTable(columns, rows) {
    const table = [];
    for (let row = 0; row < rows; row++) {
      table.push(createTableRow(row, columns));
    }
    return table;
  }

  function createTableRow(row, columns) {
    const cells = [];
    for (let column = 0; column < columns; column++) {
      const index = columns * row + column;
      cells.push(createCell(index));
    }
    return <tr key={row}>{cells}</tr>;
  }

  function createCell(index) {
    const cell = (
      <Cell
        key={index}
        index={index}
        ref={addToRefs}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
      />
    );
    return cell;
  }

  function addToRefs(element) {
    cellRefs.current.push(element);
  }

  function getInitialStartCell(columns, rows) {
    const startCell =
      columns * Math.floor(rows / 2) + Math.floor(columns * 0.333);
    return startCell;
  }

  function getInitialTargetCell(columns, rows) {
    const targetCell =
      columns * Math.floor(rows / 2) + Math.floor(columns * 0.666);
    return targetCell;
  }

  function onMouseDown(event, index) {
    event.preventDefault();
    if (running || buildingMaze) {
      return;
    } else if (isStartCell(index)) {
      setChangingStartCell(true);
    } else if (isTargetCell(index)) {
      setChangingTargetCell(true);
    } else {
      setChangingWallCells(true);
      editWallCells(index);
    }
  }

  function onMouseEnter(event, index) {
    event.preventDefault();
    if (running || buildingMaze) {
      return;
    } else if (changingStartCell && showInstant) {
      changeStartCell(index);
    } else if (changingTargetCell && showInstant) {
      changeTargetCell(index);
    } else if (changingWallCells) {
      editWallCells(index);
    }
  }

  function onMouseUp(event, index) {
    event.preventDefault();
    if (running || buildingMaze) {
      return;
    } else if (changingStartCell) {
      changeStartCell(index);
      setChangingStartCell(false);
    } else if (changingTargetCell) {
      changeTargetCell(index);
      setChangingTargetCell(false);
    } else {
      setChangingWallCells(false);
    }
  }

  function isStartCell(index) {
    return index === startCell;
  }

  function isNotStartCell(index) {
    return index !== startCell;
  }

  function isTargetCell(index) {
    return index === targetCell;
  }

  function isNotTargetCell(index) {
    return index !== targetCell;
  }

  function isWallCell(index) {
    return wallCells.includes(index);
  }

  function isNotWallCell(index) {
    return !wallCells.includes(index);
  }

  function changeStartCell(index) {
    if (isNotTargetCell(index) && isNotWallCell(index)) {
      setStartCell(index);
    }
  }

  function changeTargetCell(index) {
    if (isNotStartCell(index) && isNotWallCell(index)) {
      setTargetCell(index);
    }
  }

  function editWallCells(index) {
    if (isNotStartCell(index) && isNotTargetCell(index)) {
      if (isWallCell(index)) {
        const idx = wallCells.indexOf(index);
        wallCells.splice(idx, 1);
        cellRefs.current[index].className = "cell";
      } else {
        wallCells.push(index);
        cellRefs.current[index].className = "cell wall";
      }
    }
  }

  function setSpeed(value) {
    switch (value) {
      case "superFast":
        return 2;
      case "fast":
        return 20;
      case "normal":
        return 50;
      case "slow":
        return 100;
      case "superSlow":
        return 1000;
      default:
        return 25;
    }
  }

  function animateInstant(visited, path) {
    for (let i = 1; i < visited.length; i++) {
      cellRefs.current[visited[i]].className = "cell visitedInstant";
    }

    for (let i = 1; i < path.length; i++) {
      cellRefs.current[path[i]].className = "cell inPathInstant";
    }
  }

  function animate(visited, path, speed) {
    const visitedTime = speed * visited.length;
    const totalTime = speed * path.length + visitedTime + 2000;

    for (let i = 1; i < visited.length; i++) {
      setTimeout(() => {
        cellRefs.current[visited[i]].className = "cell visited";
      }, speed * i);
    }

    for (let i = 1; i < path.length; i++) {
      setTimeout(() => {
        cellRefs.current[path[i]].className = "cell inPath";
      }, speed * i + visitedTime);
    }

    setTimeout(() => {
      props.setRunningFalseCallback();
    }, totalTime);
  }

  function runInstant() {
    const graph = createGraph(props.columns, props.rows, wallCells);
    let result = [];
    if (algorithm === "dijkstra") {
      result = dijkstra(graph, startCell, targetCell);
    } else if (algorithm === "aStar") {
      result = astar(graph, startCell, targetCell, props.columns);
    }
    animateInstant(result[0], result[1]);
  }

  function run() {
    const graph = createGraph(props.columns, props.rows, wallCells);
    let result = [];
    if (algorithm === "dijkstra") {
      result = dijkstra(graph, startCell, targetCell);
    } else if (algorithm === "aStar") {
      result = astar(graph, startCell, targetCell, props.columns);
    }
    animate(result[0], result[1], setSpeed(speed));
  }

  function reset() {
    setStartCell(getInitialStartCell(props.columns, props.rows));
    setTargetCell(getInitialTargetCell(props.columns, props.rows));
    wallCells.length = 0;
    props.resetCallback(false);
  }

  function clearWalls() {
    wallCells.length = 0;
    props.clearWallsCallback(false);
  }

  function applyClasses() {
    for (let i = 0; i < cellRefs.current.length; i++) {
      if (isWallCell(i)) {
        cellRefs.current[i].className = "cell wall";
        if (changingStartCell || changingTargetCell) {
          cellRefs.current[i].className = "cell wall changeInvalid";
        }
      } else if (i === startCell) {
        cellRefs.current[i].className = "cell start";

        if (changingStartCell) {
          cellRefs.current[i].className = "cell start faded";
        } else if (changingTargetCell) {
          cellRefs.current[i].className = "cell start changeInvalid";
        }
      } else if (i === targetCell) {
        cellRefs.current[i].className = "cell target";

        if (changingTargetCell) {
          cellRefs.current[i].className = "cell target faded";
        } else if (changingStartCell) {
          cellRefs.current[i].className = "cell target changeInvalid";
        }
      } else if (changingStartCell) {
        cellRefs.current[i].className = "cell changeStart";
      } else if (changingTargetCell) {
        cellRefs.current[i].className = "cell changeTarget";
      } else {
        cellRefs.current[i].className = "cell";
      }
      if (running || buildingMaze) {
        const currentClass = cellRefs.current[i].className;
        const newClass = currentClass.concat(" changeInvalid");
        cellRefs.current[i].className = newClass;
        continue;
      }
    }
  }

  useEffect(() => {
    applyClasses();

    if (running) {
      run();
    }

    if (showInstant) {
      runInstant();
    }

    if (props.reset) {
      reset();
    }

    if (props.clearWalls) {
      clearWalls();
    }
  });

  useEffect(
    () => {
      if (maze !== "none") {
        wallCells.length = 0;

        const newMaze = createMaze(maze, columns, rows);
        const walls = newMaze[0];
        setStartCell(newMaze[1]);
        setTargetCell(newMaze[2]);

        const totalTime = 10 * walls.length;
        for (let i = 0; i < walls.length; i++) {
          setTimeout(() => {
            wallCells.push(walls[i]);
            cellRefs.current[walls[i]].className = "cell wall changeInvalid";
          }, 10 * i);
        }

        setTimeout(() => props.updateMazeCallback(), totalTime);
      } else {
        wallCells.length = 0;
        applyClasses();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maze]
  );

  return (
    <div className="gridContainer">
      <table className="grid">
        <tbody>{table}</tbody>
      </table>
    </div>
  );
}

function createCellRefs() {
  const cellRefs = createRef([]);
  cellRefs.current = [];
  return cellRefs;
}

function createMaze(maze, columns, rows) {
  switch (maze) {
    case "binaryTree":
      return binaryTree(columns, rows);
    case "recursiveBacktracking":
      return recursiveBacktracking(columns, rows);
    case "prims":
      return prims(columns, rows);
    default:
      console.log("Error: Maze not found, could not create maze!");
  }
}

export default Grid;
