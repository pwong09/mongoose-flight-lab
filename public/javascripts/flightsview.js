let cPrev = -1;

/*---cached elements---*/
const thEls = document.querySelectorAll('th');

/*---event listeners---*/
thEls.forEach(th => {
    th.addEventListener('click', sortBy);
})

function sortBy(e) {
    console.log(e.target)
    rows = document.getElementById("sortable").rows.length; // num of rows
    console.log(rows)
    columns = document.getElementById("sortable").rows[0].cells.length; // num of columns
    console.log(columns)
    arrTable = [...Array(rows)].map(a => Array(columns)); // create an empty 2d array
    console.log(arrTable)
    for (ro=0; ro<rows; ro++) { 
        for (co=0; co<columns; co++) { 
            // assign the value in each row-column to a 2d array by row-column
            arrTable[ro][co] = document.getElementById("sortable").rows[ro].cells[co].innerHTML;
        }
    }

    th = arrTable.shift(); // remove the header row from the array and save it
    console.log(th) // th is an array
    let c = th.indexOf(e.target.innerText) // grab the index of th to pass through 
    if (c !== cPrev) { 
        arrTable.sort(
            function (a, b) {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else { // if the same column is clicked then reverse the array
        arrTable.reverse();
    }
    
    cPrev = c; // save in previous c

    arrTable.unshift(th);

    // cycle through rows-columns placing values from the array back into the html table
    for (ro=0; ro<rows; ro++) {
        for (co=0; co<columns; co++) {
            document.getElementById("sortable").rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
}

