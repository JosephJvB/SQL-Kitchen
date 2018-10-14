// split, chunk, join
// if any line is too large, chunk it
module.exports = (text) => {
  const n = Number((window.innerWidth / 23).toString().split('.')[0])
  const reggie = new RegExp(`.{1,${n}}`, 'g')
  if(!text) return ''
  return text
    .split('\n')
    .reduce((acc, line) => acc.concat(line.length >= n ? line.match(reggie) : line), [])
    .join('\n')
}
