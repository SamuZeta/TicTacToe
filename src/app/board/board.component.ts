import { Component, OnInit} from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  squares: any[];
  wList: string []=[];
  xIsNext: boolean;
  winner: string;
  count: any=0;
  constructor(private toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.newGameX();
  }

  newGameO(){
    this.count=0;
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = false;
  }

  newGameX(){
    this.count=0;
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  stopGame(){
    this.count=0;
    this.wList.push(this.winner);
    console.log(this.wList);
    if(this.winner=='X'){
      this.showToast('success')
    }else if(this.winner=='O'){
       this.showToast('info')
    }
    else{
      this.showToast('warning')
    }
  }

  showToast(status: NbComponentStatus) {
     this.toastrService.show(status, `winner: ${this.winner}`, { status });
     this.newGameX();
  }

  get player(){
    return this.xIsNext ? 'X' : 'O';
  }

  get lastWinner(){
    if(this.wList[this.wList.length-1]!="tie"){
      return this.wList[this.wList.length-1];
    }
    else{
      return "No winner";
    }
  }

  resetWList(){
    this.count=0;
    // return this.wList=Array(this.wList.length).fill(null);
    this.wList = [];
  }

  makeMove(idx: number){
    if(!this.squares[idx]){
      this.squares.splice(idx, 1, this.player);
      this.xIsNext= !this.xIsNext;
      this.count++;
    }
    this.winner=this.calculateWinnerRound();
    if(this.winner===null && this.count==9){
      this.count=0;
      this.winner="tie";
      this.stopGame();
    }
    if (this.winner!=null){
      this.count=0;
      this.stopGame();
    }
  }

  calculateWinnerRound(){
    const lines=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i=0; i<lines.length; i++){
      const[a,b,c]=lines[i];
      if(
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ){
        return this.squares[a];
      }
    }
    return null;
  }
}
