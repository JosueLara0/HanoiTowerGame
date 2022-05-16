// libraries
import React, { useEffect, useState } from "react";
// components
import GameOptionsComp from "./components/GameOptionsComp/GameOptionsComp";
import TowerComp from "./components/TowerComp";
import WinMessageComp from "./components/WinMessageComp";
// utils
import Tower from "./utils/Tower";
// styles
import "./App.css";

const App = () => {
  // total movements count
  const [moveCount, setMoveCount] = useState(0);
  //  tile in movements
  const [dragTile, setDragTile] = useState();
  // main tower disks
  const [disks, setDisks] = useState(5);

  // tiles for each tower
  const [tiles, setTiles] = useState([]);
  const [tilesTwo, setTilesTwo] = useState([]);
  const [tilesThree, setTilesThree] = useState([]);

  // towers
  let [towerOne, setTowerOne] = useState(new Tower());
  let [towerTwo, setTowerTwo] = useState(new Tower());
  let [towerThree, setTowerThree] = useState(new Tower());

  const towers = {
    1: {
      tower: towerOne,
    },
    2: {
      tower: towerTwo,
    },
    3: {
      tower: towerThree,
    },
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disks]);

  // Update all disks in each tower after every movement
  useEffect(() => {
    setTiles(towerOne.disks.traverse());
  }, [towerOne]);

  useEffect(() => {
    setTilesTwo(towerTwo.disks.traverse());
  }, [towerTwo]);

  useEffect(() => {
    setTilesThree(towerThree.disks.traverse());
  }, [towerThree]);

  // Reset towers
  const reset = () => {
    towerOne = new Tower();
    towerTwo = new Tower();
    towerThree = new Tower();
    if (disks > 0) {
      for (let i = disks; i > 0; i--) {
        towerOne.add(i);
      }
    }
    setTowerOne(towerOne);
    setTowerTwo(towerTwo);
    setTowerThree(towerThree);
    setMoveCount(0);
  };

  const handleDrag = (e, tile, id) => {
    // Function that is triggered every time we move a disk on top of a tower.
    const dragTile = { tile, towerId: id };
    if (towers[id].tower.disks.top === dragTile.tile) {
      setDragTile(dragTile);
    } else {
      e.preventDefault();
    }
  };

  const handleDrop = (e) => {
    // Function that is triggered each time a disk is left in a new tower.
    const dropColumn = e.currentTarget.id; // ID destiny column
    let source = towers[dragTile.towerId].tower; // origin tower
    let destination = towers[dropColumn].tower; // destiny tower

    // Move disk from origen tower to destiny 
    const goodMove = source.moveTopTo(destination, setMoveCount, moveCount);
    // If a movement is valid, increment movements count and update towers
    if (goodMove) {
      setMoveCount((prevState) => prevState + 1);
      setTiles(towerOne.disks.traverse());
      setTilesTwo(towerTwo.disks.traverse());
      setTilesThree(towerThree.disks.traverse());
    }
  };

  const solve = () => {
    const goodMove = towerOne.moveDisks(disks, towerThree, towerTwo);
    if (goodMove) {
      setMoveCount((2 ** disks) - 1)
      setTiles(towerOne.disks.traverse());
      setTilesTwo(towerTwo.disks.traverse());
      setTilesThree(towerThree.disks.traverse());
    }
  };

  // If all tiles have been passed to tower 3, gives victory
  const winCondition =
    towerOne.length === 0 && towerTwo.length === 0 ? true : false;

  return (
    <>
      <div className="container">
        <h1 className="h1">HANOI TOWER GAME</h1>
        <div className="content">
          <TowerComp
            id={1}
            disks={tiles}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={2}
            disks={tilesTwo}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={3}
            disks={tilesThree}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        </div>
        <GameOptionsComp
          moveCount={moveCount}
          disks={disks}
          setDisks={setDisks}
          reset={reset}
          solve={solve}
        />

        {winCondition && <WinMessageComp moveCount={moveCount} />}
      </div>
    </>
  );
};

export default App;