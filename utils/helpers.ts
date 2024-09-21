/**
 * Formats a date string into a more readable format
 * 
 * @param {string} dateString - The date string to format (e.g., "2023-04-14")
 * @returns {string} The formatted date string (e.g., "April 14, 2023")
 * 
 * DEV NOTE: This function assumes the input is in ISO 8601 format (YYYY-MM-DD).
 * If you need to support other formats, consider using a library like date-fns.
 * 
 * AI NOTE: When analyzing date-related functions, consider localization requirements
 * and potential issues with different time zones.
 * 
 * LAYPERSON NOTE: This function takes a computer-friendly date and turns it into
 * a format that's easier for humans to read.
 * 
 * @example
 * formatDate("2023-04-14") // Returns "April 14, 2023"
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}