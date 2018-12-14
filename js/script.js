const numOfBtns = 9;
let tileStates = [];
//Make tileStates a multiDim array
for(let i = 0; i < 3; i++){
    tileStates[i] = new Array(3);
}


function botMove() {
    let tileScores = [];
    for(let i = 0; i < 3; i++){
        tileScores[i] = new Array(3); //make tileScores multidim
    }

    for(let row = 0;row < tileScores.length; row++){
        for(let col = 0; col < tileScores[row].length; col++){
            tileScores[row][col] = 0; //fill tileScores with zeros
        }
    }

    //loop through tiles and create tile scores
    for(let row = 0;row < tileScores.length; row++){
        for(let col = 0; col < tileScores[row].length; col++){
            if(tileStates[row][col] === 'Move'){
                for(let i = 0; i < 3; i++) {
                    //check row
                    if(tileStates[row][i] === 'Move'){
                        tileScores[row][i] += 4;
                        if(tileStates[row][i + 1] === 'Move'){
                            tileScores[row][i + 1] += 4;
                        }
                    }
                }

                //check column
                for(let i = 0; i < 3; i++) {
                 if(tileStates[i][col] === 'Move'){
                        tileScores[i][col] += 4;
                    if(tileStates[i + 1] !== undefined){
                            if(tileStates[i + 1][col] === 'Move'){
                                tileScores[i + 1][col] += 4;
                            }
                        }
                    }
                }

                //check diagonal
                if(row === col) { //check if on diagonal
                    for(let i = 0; i < 3; i++){
                        if(tileStates[i][i] === 'Move'){
                            tileScores[i][i] += 4
                        if(tileStates[i + 1] !== undefined){
                                if(tileStates[i+1][i+1] === 'Move'){
                                    tileScores[i+1][i+1] += 2;
                                }
                            }
                        }
                    }
                }

                //check oppisite diagonal
                if(row + col === 2) { //check if on oppisite diagonal
                    for(let i = 0; i < 3; i++){
                        if(tileStates[i][2 - i] === 'Move'){
                            tileScores[i][2 - i] += 4;
                            if(tileStates[i + 1] !== undefined){
                                if(tileStates[i + 1][2 - (i + 1)] === 'Move'){
                                    tileScores[i + 1][2 - (i + 1)] += 2;
                                }
                            }
                        }
 
                    }
                 }   
            }
        }
    }
    let btnTilePos = { x: -1, y: -1};
    //find max score in tileScores
    let maxes = [];
    for(row of tileScores){
        maxes.push(Math.max(...row));
    }
    let max = Math.max(...maxes);

    for(let row = 0; row < tileScores.length; row++){ //loop through tiles
        for(let col = 0; col < tileScores[row].length; col++){
                //have bot pick one with highest score
                if(tileScores[row][col] === max){
                    let tempBtnId = 
                        "#button".concat((((row + col) + row * 2) + 1).toString());
                    $(tempBtnId).html('O');
                    btnTilePos.x = row;
                    btnTilePos.y = col;
                    //break out of array
                    row = tileScores.length -1;
                    console.table(tileScores);

                }
            }
    }

        //-- Check if bot has won--

        //loop through states
        for(let row = 0;row < tileStates.length; row++){
            for(let col = 0; col < tileStates[row].length; col++){
                /*read html of button and write it to corresponding
                    tile state index */
                let tempBtnId = 
                    "#button".concat((((row + col) + row * 2) + 1).toString());
                tileStates[row][col] = $(tempBtnId).html();
                console.log(tileStates[row][col]);
            }
        }

        //check row
        for(let i = 0; i < 3; i++) {
            if(tileStates[btnTilePos.x][i] !== 'O')
                break;
            if(i === 2)
                alert('bot win');
        }

        //check column
        for(let i = 0; i < 3; i++) {
            if(tileStates[i][btnTilePos.y] !== 'O')
                break; 
            if(i === 2)
                alert('bot win');
        }

        //check diagonal
        if(btnTilePos.x === btnTilePos.y) { //check if on diagonal
            for(let i = 0; i < 3; i++){
                if(tileStates[i][i] !== 'O')
                    break;
                if(i === 2)
                    alert('bot win');
            }
        }

        //check oppisite diagonal
        if(btnTilePos.x + btnTilePos.y === 2) { //check if on oppisite diagonal
            for(let i = 0; i < 3; i++){
                if(tileStates[i][2 - i] !== 'O') {
                    break;
                }
                if(i === 2)
                    alert('bot win');
            }
        }


}

function move(btnId) {
    //check if btn is empty 
    if($(btnId).html() === 'Move'){
        //move btn
        $(btnId).html('X');
        //--check if player has won--

        let btnTilePos = { x: -1, y: -1}
        //loop through states
        for(let row = 0;row < tileStates.length; row++){
            for(let col = 0; col < tileStates[row].length; col++){
                /*read html of button and write it to corresponding
                    tile state index */
                let tempBtnId = 
                    "#button".concat((((row + col) + row * 2) + 1).toString());
                tileStates[row][col] = $(tempBtnId).html();
                console.log(tileStates[row][col]);
                if(btnId === tempBtnId){ 
                    btnTilePos.x = row;
                    btnTilePos.y = col;
                }
            }
        }

        //check row
        for(let i = 0; i < 3; i++) {
            if(tileStates[btnTilePos.x][i] !== 'X')
                break;
            if(i === 2)
                alert('win');
        }

        //check column
        for(let i = 0; i < 3; i++) {
            if(tileStates[i][btnTilePos.y] !== 'X')
                break; 
            if(i === 2)
                alert('win');
        }

        //check diagonal
        if(btnTilePos.x === btnTilePos.y) { //check if on diagonal
            for(let i = 0; i < 3; i++){
                if(tileStates[i][i] !== 'X')
                    break;
                if(i === 2)
                    alert('win');
            }
        }

        //check oppisite diagonal
        if(btnTilePos.x + btnTilePos.y === 2) { //check if on oppisite diagonal
            for(let i = 0; i < 3; i++){
                if(tileStates[i][2-i] !== 'X') {
                    console.log("i is: " + i + "\n tile[i][2-i] is: " + tileStates[i][2-i]);
                    break;
                }
                if(i === 2)
                    alert('win');
                
            }
        }

        botMove();



    }else {
        //TODO error handling
    }
}

for(let i = 0; i < numOfBtns;i++){ //loop through buttons
    let tempBtnId = "#button".concat((i + 1).toString());
	$(tempBtnId).click( function() {
		move(tempBtnId);
	});
}