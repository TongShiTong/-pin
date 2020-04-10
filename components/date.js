export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
	let month
	if(date.getMinutes()<=9) {
		month = '0' + date.getMinutes()
	}else {
		month = date.getMinutes()
	}
	let hours
	if(date.getHours()<=9) {
		hours = '0' + date.getHours()
	}else {
		hours = date.getHours()
	}
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': hours,
        'm+': month,
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

 export function getWeek(timedat) {  //timedat参数格式：   getWeek（new Date("2017-10-27" )）

             var week;

          if(timedat.getDay() == 0) week = "周日"

          if(timedat.getDay() == 1) week = "周一"

          if(timedat.getDay() == 2) week = "周二"

          if(timedat.getDay() == 3) week = "周三"

          if(timedat.getDay() == 4) week = "周四"

          if(timedat.getDay() == 5) week = "周五"
          if(timedat.getDay() == 6) week = "周六"

      return week;  
    }

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};


export function getDateDiff (dateTimeStamp) {
    var result = ''
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var month = day * 30
    var now = new Date().getTime()
    var diffValue = now - dateTimeStamp
    if (diffValue < 0) return
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    if (monthC >= 1) {
      result = "" + parseInt(monthC) + "月前"
    }
    else if (weekC>=1) {
      result = "" + parseInt(weekC) + "周前"
    }
    else if (dayC >= 1) {
      result = ""+ parseInt(dayC) + "天前"
    }
    else if (hourC >= 1){
      result = "" + parseInt(hourC) + "小时前"
    }
    else if (minC >= 1) {
      result = ""+ parseInt(minC) + "分钟前"
    } else {
      result = "刚刚"
    }
    return result
  }

export function formatMsgTime (timespan) {

  var dateTime = new Date(timespan);

  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());  //typescript转换写法

  var milliseconds = 0;
  var timeSpanStr;

  milliseconds = now_new - timespan;

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  }
  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  }
  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }
  return timeSpanStr;
};