import moment from "moment";

function FormatDate({ dateString }) {
  const formattedDate = moment(dateString).format("YY-MM-DD hh:mm");
  return <>{formattedDate}</>;
}

export default FormatDate;
