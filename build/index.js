const combos = [
  [ [0,1], [0,2], [0,3], [1,2], [1,3], [2,3] ],
  [ [0,4], [1,5], [2,6], [3,7] ],
  [ [0,8], [1,8], [10,2], [11,3] ],
  [ [0,12], [1,13], [14,2], [15,3] ],
  [ [0,16], [1,17], [18,2], [19,3] ],
  [ [0,20], [1,21], [2,22], [23,3] ],
  [ [0,24], [1,25], [2,26], [27,3] ],
  [ [0,28], [1,29], [2,30], [3,31] ],
  [ [0,32], [1,33], [2,34], [3,35] ],
  [ [0,36], [1,37], [2,38], [3,39] ],
  [ [0,40], [1,41], [2,42], [3,43] ],
  [ [0,44], [1,45], [2,46], [3,47] ],
  [ [0,48], [1,49], [2,50], [3,51] ],

  [ [0,5], [0,6], [0,7], [1,4], [1,6], [1,7], [2,4], [2,5], [2,7], [3,4], [3,5], [3,6] ],
  [ [4,5], [4,6], [4,7], [5,6], [5,7], [6,7] ],
  [ [4,8], [5,8], [10,6], [11,7] ],
  [ [12,4], [13,5], [14,6], [15,7] ],
  [ [16,4], [17,5], [18,6], [19,7] ],
  [ [20,4], [21,5], [22,6], [23,7] ],
  [ [24,4], [25,5], [26,6], [27,7] ],
  [ [28,4], [29,5], [30,6], [31,7] ],
  [ [32,4], [33,5], [34,6], [35,7] ],
  [ [36,4], [37,5], [38,6], [39,7] ],
  [ [4,40], [41,5], [42,6], [43,7] ],
  [ [4,44], [45,5], [46,6], [47,7] ],
  [ [4,48], [49,5], [50,6], [51,7] ],

  [ [0,9], [0,10], [0,11], [1,9], [1,10], [1,11], [2,8], [2,9], [11,2], [3,8], [3,9], [10,3] ],
  [ [4,9], [10,4], [11,4], [5,9], [10,5], [11,5], [6,8], [6,9], [11,6], [7,8], [7,9], [10,7] ],
  [ [8,9], [8,10], [8,11], [9,10], [9,11], [10,11] ],
  [ [12,8], [13,8], [10,14], [11,15] ],
  [ [16,8], [17,8], [10,18], [11,19] ],
  [ [20,8], [21,8], [10,22], [11,23] ],
  [ [24,8], [25,8], [10,26], [11,27] ],
  [ [28,8], [29,8], [10,30], [11,31] ],
  [ [32,8], [33,8], [10,34], [11,35] ],
  [ [36,8], [37,8], [10,38], [11,39] ],
  [ [40,8], [41,8], [10,42], [11,43] ],
  [ [44,8], [45,8], [10,46], [11,47] ],
  [ [48,8], [49,8], [10,50], [11,51] ]
];








    //const worker = new Worker('worker.js');
document.addEventListener("DOMContentLoaded", () => {

  const selectedCards = [0,48,8,28,35,255,255];
  const villianRange = new Uint8Array(169);

  document.body.addEventListener("change", (event = {}) => {
    if (!event.target) return;
    const name = +event.target.name;
    if (selectedCards[name] === undefined) return;

    const value = +event.target.value;
    const prev = selectedCards[name];
    selectedCards[name] = value;

    selectedCards.forEach((e, i) => {
      if (name === i) {
        updateOptions(i, value, prev, true);
      } else {
        updateOptions(i, value, prev);
      }
    });

  });

  document.getElementById("villian-range").addEventListener("click", (event = {}) => {
    if (!event.target || !event.target.getAttribute('data-value')) return;
    const value = +event.target.getAttribute('data-value');


    // Toggle the cell
    villianRange[value] = !villianRange[value];

  });

  document.getElementById("simulate").addEventListener("click", (event = {}) => {
    const hero = new Uint8Array([selectedCards[0], selectedCards[1]]);
    const board = Uint8Array.from(selectedCards.slice(2));
    const boardSize = board.reduce((count, value) =>{
      if (value !== 255) count+=1
      return count;
    }, 0)

    // Take all the 1's from the villian range
    const range = Uint8Array.from(villianRange.reduce((prev, curr, index) => {
      if (curr) prev.push(index);
      return prev;
    }, []));

    if (!range.length) return alert('Select an opponent range to run simulations.');


    // Get the combos
    const handCombos = Uint8Array.from(range.reduce((total, comboIdx) => {
      total.push(...combos[comboIdx]);
      return total;
    }, []).reduce((total, combo) => {
      total.push(...combo);
      return total;
    },[]));
  });


},false);