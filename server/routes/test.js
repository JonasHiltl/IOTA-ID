const { DateTime } = require("luxon");

const en = DateTime.local().setLocale("en").toLocaleString("DATE_SHORT")
console.log(en)

//en 4/6/2021
//de = 6.4.2021