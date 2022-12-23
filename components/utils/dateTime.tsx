interface DateObject {
  Y: number;
  m: string;
  d: string;
  H: string;
  i: string;
  s: string;
}

export function date_format(unix_timestamp: number, format: any) {
  const date = new Date(unix_timestamp * 1000);
  const dateObject: DateObject = {
    Y: date.getFullYear(),
    m: String(date.getMonth()).padStart(2, "0"),
    d: String(date.getDate()).padStart(2, "0"),
    H: String(date.getHours()).padStart(2, "0"),
    i: String(date.getMinutes()).padStart(2, "0"),
    s: String(date.getSeconds()).padStart(2, "0"),
  };
  let dateString = "";
  for (let char of format) {
    if (char in dateObject) {
      dateString += dateObject[char as keyof typeof dateObject];
    } else {
      dateString += char;
    }
  }
  return dateString;
}
