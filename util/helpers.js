module.exports = {
  // The custome helper 'format_time' will take in a timestamp and return a string with only the time
  format_time: (date) => {
    return date.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
  },
  // The custom helper 'format_date' takes in a timestamp and returns a date string
  format_date: (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();

    return `${month}/${day}/${year}`;
  },
};

