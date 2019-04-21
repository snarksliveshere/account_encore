import moment from 'moment'
/**
 * Возвращает список дат для выбранного периода.
 * @param {String} start - Начальная дата периода, в формате `YYYY-MM-DD`.
 * @param {String} end - Конечная дата периода, в формате `YYYY-MM-DD`.
 */
export function selectPeriod(start, end) {
  const dates = []

  if (start && end) {
    const current = new Date(start)
    const last = new Date(end)

    do {
      dates.push(formatDate(current))
      current.setDate(current.getDate() + 1)
    } while (current < last)

    dates.push(formatDate(last))
  } else {
    if (start) dates.push(start)
    if (end) dates.push(end)
  }

  return dates
}

/**
 * Возвращает список дат для выбранного шаблона
 * @param {String} pattern - Название шаблона, допустимые значения:
 * today, yesterday, thisWeek, lastWeek, thisMonth, lastMonth, thisYear, lastYear
 */
export function selectPatternDates(pattern) {
  let dates = []

  switch (pattern) {
    case 'today': {
      const date = new Date()
      dates.push(formatDate(date))
      break
    }
    case 'yesterday': {
      const date = new Date(new Date().getTime() - 3600 * 1000 * 24)
      dates.push(formatDate(date))
      break
    }
    case 'thisWeek': {
      const end = moment().format('YYYY-MM-DD')
      const start = moment(end).startOf('isoWeek').format('YYYY-MM-DD')
      dates = selectPeriod(start, end)
      break
    }
    case 'lastWeek': {
      const end = moment().subtract(1, 'week').endOf('isoWeek').format('YYYY-MM-DD')
      const start = moment(end).startOf('isoWeek').format('YYYY-MM-DD')
      dates = selectPeriod(start, end)
      break
    }
    case 'thisMonth': {
      const end = moment().format('YYYY-MM-DD')
      const start = moment(end).startOf('month').format('YYYY-MM-DD')
      dates = selectPeriod(start, end)
      break
    }
    case 'lastMonth': {
      const end = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
      const start = moment(end).startOf('month').format('YYYY-MM-DD')
      dates = selectPeriod(start, end)
      break
    }
    case 'thisYear': {
      const end = moment().format('YYYY-MM-DD')
      const start = moment(end).startOf('year').format('YYYY-MM-DD')
      dates = selectPeriod(start, end)
      break
    }
    case 'lastYear': {
      const end = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
      const start = moment(end).startOf('year').format('YYYY-MM-DD')
      dates = selectPeriod(start, end)
      break
    }
    default:
      break
  }

  return dates
}

/**
 * Форматирует дату в строку формата `YYYY-MM-DD`, например: '1999-01-01'.
 * @param {Date} date - Форматируемая дата.
 */
export function formatDate(date) {
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  return `${year}-${month}-${day}`
}

export function isEmptyObjectWithOutKeys(obj) {
  if (undefined !== obj && null !== obj) {
    return Object.keys(obj).length === 0;
  }
  return false
}