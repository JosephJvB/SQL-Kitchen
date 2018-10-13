const n = Number((window.innerWidth / 23).toString().split('.')[0])
const reggie = new RegExp(`.{1,${n}}`, 'g')

// split, chunk, join
// if any line is too large, chunk it
// ternary to handle 'no-text' case
module.exports = (text) => text
  ? text
    .split('\n')
    .reduce((acc, line) => acc.concat(line.length >= n ? line.match(reggie) : line), [])
    .join('\n')
  : ''
