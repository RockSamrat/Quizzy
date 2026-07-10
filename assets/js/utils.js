// function randomSymbol() {
//   let symbols = [
//     "⚽",
//     "📽️",
//     "🎧",
//     "🎬",
//     "🎸",
//     "🏀",
//     "🎮",
//     "🎵",
//     "⭐",
//     "🏆",
//     "🎯",
//     "🎤",
//     "🎨",
//     "🎻",
//     "🥁",
//     "🎺",
//     "🎷",
//     "🏈",
//     "⚾",
//     "🎾",
//     "🏐",
//     "🎱",
//     "📺",
//     "📻",
//     "🎥",
//     "🌟",
//     "🏅",
//     "🥇",
//   ];

//   for (let symbol of symbols) {
//     let span = document.createElement("span");
//     span.textContent = symbol;
//     span.classList.add("floating-symbol");
//     span.style.top = Math.random() * 100 + "%";
//     span.style.left = Math.random() * 100 + "%";
//     document.body.appendChild(span);
//   }
// }

function randomSymbolPattern() {
  let symbols = [
    "⚽",
    "📽️",
    "🎧",
    "🎬",
    "🎸",
    "🏀",
    "🎮",
    "🎵",
    "⭐",
    "🏆",
    "🎯",
    "🎤",
    "🎨",
    "🎻",
    "🥁",
    "🎺",
    "🎷",
    "🏈",
    "⚾",
    "🎾",
    "🏐",
    "🎱",
    "📺",
    "📻",
    "🎥",
    "🌟",
    "🏅",
    "🥇",
    "⚽",
    "📽️",
    "🎧",
    "🎬",
    "🎸",
    "🏀",
    "🎮",
    "🎵",
    "⭐",
    "🏆",
    "🎤",
    "🎻",
    "🥁",
    "🎺",
    "🎷",
    "🏈",
    "⚾",
    "🎾",
    "🏐",
    "🎱",   
  ];
  let cols = 8;
  let rows = 6;
  for (let i = 0; i < symbols.length; i++) {
    let column = i % cols;
    let row = Math.floor(i / cols);
    let span = document.createElement("span");
    span.textContent = symbols[i];
    span.classList.add("floating-symbol");
    span.style.left =
      (column / cols) * 100 + Math.random() * (100 / cols) + "%";
    span.style.top = (row / rows) * 100 + Math.random() * (100 / rows) + "%";
    span.style.animationDuration = Math.random() * (5 - 2) + 2 + "s";
    span.style.animationDelay = Math.random() * (3 - 0) + 0 + "s";
    document.body.appendChild(span);
  }
}



export { randomSymbolPattern };
