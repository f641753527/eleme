export function dateFormate (date, str) {
  if (/(y+)/.test(str)) {
    str = str.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  let obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let i in obj) {
    if (new RegExp(`(${i})`).test(str)) {
      let dateStr = obj[i] + '';
      str = str.replace(RegExp.$1, paddingZero(dateStr.toString()));
    }
  }

  return str;
};

function paddingZero (str) {
  return ('00' + str).substr(str.length);
}
