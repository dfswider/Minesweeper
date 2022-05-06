import React from 'react';
import logo from './bomb.svg';
import './App.css';

const fieldX = 8;
const fieldY = 9;
const mines = 12;
const closed = 0;
const opened = 1;
const tagged = 2;
const flagged = 3;
const fired = 4;

let minesArray = new Array( fieldY );

for ( let i=0; i<fieldY; i++ ) {
    minesArray[i] = new Array( fieldX );
    for ( let j=0; j < fieldX; j++ ) {
        minesArray[i][j] = 0;
    }
}



let i = mines;
let x = 0;
let y = 0;

function getRandomInclusive( min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setMines() {
    console.log("Setting mines");
    while (i > 0) {
        x = getRandomInclusive(0, fieldX - 1);
        y = getRandomInclusive(0, fieldY - 1);
        if (minesArray[y][x] === 0) {
            minesArray[y][x] = 1;
            i--;
        }
    }
}

function App() {
    console.log("App starting");
  setMines();
  return (
      <div className="App">
        <Minesweeper />
      </div>
  );
}

class Cell extends React.Component {
  constructor( props ) {
      super(props);
      this.state = { cellState: closed }
      this.cellId = props.cellId;
      this.rowId = props.rowId;
      this.onClick = this.onClick.bind(this);
      this.onRightClick = this.onRightClick.bind(this);
      if ( minesArray[this.rowId][this.cellId] === 0 ) {
          this.mined = 0;
      } else {
          this.mined = 1;
      }
  }

  onClick() {
      console.log( "left clicked cell: ", this.cellId, " row: ", this.rowId );
      switch (this.state.cellState) {
          case closed:
              if ( this.mined === 0 ) {
                  this.setState({cellState: opened});
                  this.render();
              } else {
                  this.setState({cellState: fired});
                  this.render();
              }
              break;
          case opened:

              break;
          case tagged:

              break;
          case flagged:

              break;
          case fired:

              break;
      }
  }

  onRightClick(e) {
      console.log( "right clicked cell: ", this.cellId, " row: ", this.rowId );
      e.preventDefault();
      switch (this.state.cellState) {
          case closed:
              this.setState( { cellState: flagged });
              this.render();
              break;
          case opened:

              break;
          case tagged:

              break;
          case flagged:
                console.log("right click flagged cell:", this.rowId, " ", this.cellId )
                this.setState( { cellState: closed });
                this.render();
              break;
          case fired:

              break;
      }
  }
  render() {
      switch ( this.state.cellState ) {
          case closed:
              //return (<div className="cell"></div>);
              return (<div className="cell" onClick={this.onClick} onContextMenu={this.onRightClick} ></div>);
          case opened:
              return (<div className="cell opened" onClick={this.onClick} onContextMenu={this.onRightClick}></div>);
          case tagged:
              return (<div className="cell tagged" onClick={this.onClick} onContextMenu={this.onRightClick}></div>);
          case flagged:
              return (<div className="cell flagged" onClick={this.onClick} onContextMenu={this.onRightClick}></div>);
          case fired:
              return (<div className="cell fired" onClick={this.onClick} onContextMenu={this.onRightClick}></div>);
      }
  }
}

class Row extends React.Component {
    constructor( props ) {
        super( props )
        this.rowId = props.rowId;
        let cells = [];
        for ( let i=0; i<fieldX; i++ ) {
            cells.push( i );
        }
        this.rowCells = cells.map( (cell)  => <Cell key={cell.toString()} cellId={cell} rowId={this.rowId}/> );
    }
  render() {
    return (
      <div className="row">{ this.rowCells }</div>
    );
  }
}

class Field extends React.Component {
    constructor(props) {
        super(props);
        let rows = [];
        for ( let i=0; i<fieldY; i++ ) {
            rows.push( i );
        }
        this.fieldRows = rows.map( row  => <Row key={row.toString()} rowId={row} /> );
    }
  render() {
    return (
        <div className="field">{this.fieldRows}</div>
    );
  }
}

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date() };
    }

    tick() {
        this.setState( {date: new Date()});
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(),1000 );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
    return (
        <div className="control-panel">
          <div className="control-header" >
              <p className="control-header-element">ControlPanel</p>
              <img className="control-header-element logo" src={logo} alt="Bomb!"/>
          </div>
          <div className="controls">
            <div className="control" id="flags-counter">{mines.toString()}</div>
            <input className="control" type="button" id="reset-button" value="RESET"/>
            <div className="control" id="timer">{this.state.date.toLocaleTimeString()} </div>
          </div>
        </div>
    );
  }
}

class Minesweeper extends React.Component {
  render() {
    return (
        <div className="Minesweeper">
          <ControlPanel />
          <Field />
        </div>
    );
  }
}

export default App;
