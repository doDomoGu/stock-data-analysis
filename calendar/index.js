import dayjs from "dayjs";
console.time("runTime");

const startDate = dayjs("2021-01-01");

// const endDate = dayjs("2021-01-31");
const endDate = dayjs("2024-10-31");

const dayLength = endDate.diff(startDate, "d") + 1;

const weekdayMap = ["日", "一", "二", "三", "四", "五", "六"];
const holiday = ["2021-01-01"];

for (let i = 0; i < dayLength; i++) {
  const date = startDate.add(i, "day");

  const weekdayNum = date.format("d");

  let isRight = true;
  if (weekdayNum == 0 || weekdayNum == 6) {
    isRight = false;
  }
  if (holiday.includes(date.format("YYYY-MM-DD"))) {
    isRight = false;
  }
  //   console.log(holiday, date.format("YYYY-MM-DD"));
  console.log(
    "date:",
    date.format("YYYY-MM-DD"),
    // date.format("ddd"),
    `星期${weekdayMap[weekdayNum]}`,
    isRight ? "ok" : "not"
  );
}

console.timeEnd("runTime");
