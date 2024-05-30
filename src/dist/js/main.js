function formatNumber(number) {
  let numberStr = number.toFixed(2);
  let parts = numberStr.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1];
  let withThousandSeparators = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  return withThousandSeparators + "." + decimalPart;
}

function formatDate(inputDate) {
  let parts = inputDate.split("-");
  let year = parts[0]; // "2024"
  let monthNum = parseInt(parts[1]); // 1
  // let day = parts[2]; // "25"
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthAbbr = monthNames[monthNum - 1]; // Adjust month number by subtracting 1
  let formattedDate = monthAbbr + " " + year;
  return formattedDate;
}
