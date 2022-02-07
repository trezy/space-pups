export function humanizePrice(value) {
  const [
    dollars,
    cents = 0
  ] = value
    .toString()
    .split('.')

  const commaSeparatedDollars = dollars
    .split('')
    .reverse('')
    .reduce((accumulator, character, index) => {
      if ((index > 0) && ((index % 3) === 0)) {
        accumulator.push(',')
      }

      accumulator.push(character)

      return accumulator
    }, [])
    .reverse()
    .join('')

  return `$${commaSeparatedDollars}.${cents}`
}
