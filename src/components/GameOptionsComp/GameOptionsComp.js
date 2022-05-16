// libraries
import { Row, Col, Button } from "react-bootstrap";
// styles
import "./GameOptionsComp.styles.css";

const GameOptionsComp = ({ moveCount, disks, setDisks, reset, solve }) => {
  return (
    <Row className="rowContent">
      <Col>
        <p className="movements">Movements:<span className="disks"> {moveCount}</span></p>
      </Col>
      <Col>
        Disks:<span className="disks"> {disks} </span>
        <Button
          variant="outline-dark"
          className="marginRight"
          onClick={() => {
            if (disks >= 2) {
              setDisks((disks -= 1));
            }
          }}
        >
          -
        </Button>
        <Button
          variant="outline-dark"
          className="marginRight"
          onClick={() => {
            setDisks((disks += 1));
          }}
        >
          +
        </Button>
      </Col>
      <Col>
        <Button variant="outline-dark" className="marginRight" onClick={() => reset()}>
          Reset
        </Button>
        <Button variant="outline-dark" onClick={() => solve()}>
          Solve
        </Button>
      </Col>
    </Row>
  );
};

export default GameOptionsComp;