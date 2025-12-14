export const pomodoro = [
    //Transformando os minutos em segundos, para facilitar a logica do timer
  {
    id: 'focus',
    initialValue: 25 * 60,
    image: require('../../app/pomodoro.png'),
    display: 'Focus'
  },
  {
    id: 'short',
    initialValue: 5 * 60,
    image: require('../../app/short.png'),
    display: 'Short'
  },
  {
    id: 'long',
    initialValue: 15 * 60,
    image: require('../../app/long.png'),
    display: 'Long'
  }
];