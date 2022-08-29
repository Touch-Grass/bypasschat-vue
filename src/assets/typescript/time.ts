//Imports the required dayjs modules and plugins
import dayjs from "dayjs"; //Main dayjs module
import utc from "dayjs/plugin/utc"; //utc plugin, converts time to utc time
import relativeTime from "dayjs/plugin/relativeTime"; //relativeTime plugin, gets the time since the date
import customParseFormat from "dayjs/plugin/customParseFormat"; //customParseFormat plugin, used to parse custom date formats
//Adds the plugins to dayjs
dayjs.extend(utc); //Adds the utc plugin to dayjs
dayjs.extend(relativeTime); //Adds the relativeTime plugin to dayjs
dayjs.extend(customParseFormat); //Adds the customParseFormat plugin to dayjs

/**
 * @return {string} = current time in UTC to save to firebase, ex: "2021-09-01/09:16:45/pm"
 */
export function getTime(): string {
  //The format to be saved to firebase is: "YYYY-MM-DD/hh:mm:ss/a", ex: "2021-09-01/09:16:45/pm"
  // Gets the current time then converts to utc time to make work in any timezone and then formats to custom data format to save to firebase
  return dayjs().utc().format("YYYY-MM-DD/hh:mm:ss/a");
}

/**
 * @param {string} date = unformatted input date in utc time
 * @return {string} = how long ago time was relative to current time, ex: "2 hours ago" or "a few seconds ago"
 */
export function formatTime(date: string): string {
  // parse utc time from custom format used in firebase and then calls .fromNow() to return string of how long ago that time was relative to current time
  return dayjs.utc(date, "YYYY-MM-DD/hh:mm:ss/a").fromNow();
}
