import moment from 'moment'

import {t} from '#/main/core/translation'
import {getLocale} from '#/main/core/intl/locale'

// configure moment
// this may be not the better place to do it
moment.locale(getLocale())

/**
 * Gets the date format expected by the server API.
 *
 * @return {string}
 */
function getApiFormat() {
  return 'YYYY-MM-DD\THH:mm:ss'
}

/**
 * Gets the display format of the current user.
 * For now it uses the format of the current locale.
 *
 * @param {boolean} long     - gets the full text date, otherwise gets the short digit format.
 * @param {boolean} withTime - appends time format.
 */
function getDisplayFormat(long = false, withTime = false) {
  let displayFormat
  if (long) {
    displayFormat = moment.localeData().longDateFormat('ll') // Sep 4, 1986
  } else {
    displayFormat = moment.localeData().longDateFormat('L') // 09/04/1986
  }

  if (withTime) {
    // appends time (time format is the same for long and short format)
    displayFormat += ' ' + moment.localeData().longDateFormat('LT')
  }

  return displayFormat
}

/**
 * Gets the display format for d3 date charts
 * Converts between Moment formats to d3 formats
 *
 * @return {string} - the d3 date format according to locale
 */
function getD3DisplayFormat() {
  let displayFormat = moment.localeData().longDateFormat('L')
  let d3Format = [], dateSeparator = '/'
  let dateChunks = displayFormat.split(dateSeparator)
  if (dateChunks.length < 3) {
    dateSeparator = '-'
    dateChunks = displayFormat.split(dateSeparator)
  }
  for (let chunk of dateChunks) {
    switch (chunk) {
      case 'YYYY': {
        d3Format.push('%Y')
        break
      }
      case 'MM': {
        d3Format.push('%m')
        break
      }
      case 'DD': {
        d3Format.push('%d')
        break
      }
    }
  }
  
  return d3Format.join(dateSeparator)
}

function isValidDate(value, format = null) {
  if (format) {
    return moment(value, format, true).isValid()
  } else {
    return moment(value).isValid()
  }
}

/**
 * Converts a date from the displayed format to the API one.
 *
 * @param {string}  displayDate - the display date to convert.
 * @param {boolean} long        - does the display date use the full text format ?
 * @param {boolean} withTime    - has it time ?
 *
 * @return {string} - the date in api format.
 */
function apiDate(displayDate, long = false, withTime = false) {
  let date = moment(displayDate, getDisplayFormat(long, withTime))
  if (withTime) {
    date = date.utc()
  }

  return date.format(getApiFormat())
}

/**
 * Converts a date from the api format to the displayed one.
 *
 * @param {string}  apiDate  - the api date to convert.
 * @param {boolean} long     - does the display date use the full text format ?
 * @param {boolean} withTime - has it time ?
 *
 * @return {string} - the date in display format.
 */
function displayDate(apiDate, long = false, withTime = false) {
  return moment.utc(apiDate).local().format(getDisplayFormat(long, withTime))
}

/**
 * Returns a date object based on api received date
 * @param {String} apiDate
 * @returns {Date | false} - Returns a date object or false if apiDate is not valid
 */
function apiToDateObject(apiDate) {
  return isValidDate(apiDate, getApiFormat()) && moment(apiDate, getApiFormat()).toDate()
}

/**
 * Gets API now value.
 *
 * @return {string}
 */
function now() {
  return moment().utc().format(getApiFormat())
}

export {
  getApiFormat,
  getDisplayFormat,
  isValidDate,
  apiDate,
  displayDate,
  now,
  apiToDateObject,
  getD3DisplayFormat
}
