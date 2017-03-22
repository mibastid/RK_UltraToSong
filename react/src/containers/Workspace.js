import React, { Component } from 'react';
import UltraSong from '../components/UltraSong';

class Workspace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ultraSong:{
        lines:[
          {
            key: 'one',
            syllables: [
              {
                name:'Chi',
                beat:138,
                duration:2
              },
              {
                name:'qui',
                beat:139,
                duration:2
              },
              {
                name:'ti',
                beat:140,
                duration:3
              },
              {
                name:'ta',
                beat:143,
                duration:2
              },
            ]
          },
          {
            key: 'two',
            syllables: [
              {
                name:'di-',
                beat:146,
                duration:2
              },
              {
                name:'me',
                beat:147,
                duration:2
              },
              {
                name:'por',
                beat:149,
                duration:3
              },
              {
                name:'que',
                beat:152,
                duration:2
              },
            ]
          }
        ]
      }
    }
  }


  paragraphBeatMove = (key, beats) => {
    let lines = this.state.ultraSong.lines;
    var moveNext = false;
    var beatsMoved= 0;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].key === key) {
        moveNext = true;
        beatsMoved = lines[i].syllables[0].beat - beats / 10;
        console.log(beatsMoved);
      }
      if (moveNext) {
        for (var j=0; j < lines[i].syllables.length; j ++) {
          lines[i].syllables[j].beat -= beatsMoved;
        }
      }
    }
    this.setState({ultrastar:lines});
  }

  render() {
    return (
      <div>
        <p>Workspace</p>
        <UltraSong song={this.state.ultraSong} paragraphBeatMove={(key, beats) => this.paragraphBeatMove(key, beats)}/>
      </div>
    );
  }
}

export default Workspace;