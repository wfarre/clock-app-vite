import Ipbase from "@everapi/ipbase-js";

const header = document.getElementById("header");
const quotation = document.getElementById("quotation");
const metadata = document.getElementById("metadata");
const moreBtn = document.getElementById("more-btn");
const moreBtnTxt = document.getElementById("btn__txt");
const moreBtnArrow = document.getElementById("btn__arrow");
const refreshQuoteBtn = document.getElementById("refresh-btn");
const quote = document.getElementById("quote");
const authorOfQuote = document.getElementById("author");
const API_KEY = import.meta.env.API_KEY;

const dayBg = document.getElementById("day-bg");
const nightBg = document.getElementById("night-bg");

const getLocation = async () => {
  const ipBase = new Ipbase(API_KEY);
  return ipBase.info().then((response) => {
    return response.data;
  });
};

// classes
const moveUp = "translate-y-0";
const grow = "scale-y-100";
const disappear = "hidden";
let metaIsOpened = false;

moreBtn.addEventListener("click", () => {
  if (metaIsOpened) {
    header.classList.add(
      "lg:translate-y-[45vh]",
      "sm:translate-y-[43vh]",
      "translate-y-[38vh]"
    );
    quotation.classList.remove(disappear);
    metadata.classList.add("scale-y-0");
    moreBtnArrow.classList.remove("rotate-180");
    moreBtnTxt.innerHTML = "More";

    metaIsOpened = false;
  } else {
    header.classList.remove(
      "lg:translate-y-[45vh]",
      "sm:translate-y-[43vh]",
      "translate-y-[38vh]"
    );
    metadata.classList.remove("scale-y-0");
    quotation.classList.add(disappear);
    moreBtnArrow.classList.add("rotate-180");
    moreBtnTxt.innerText = "Less";
    metaIsOpened = true;
  }
});

const getLocationInformation = async (url) => {
  let data = await fetch(url)
    .then((res) => {
      const response = res.json();
      //   console.log(response);
      return response;
    })
    .then((res) => {
      //   console.log(res);
      return res;
    })
    .catch((err) => err);

  //   console.log(data);

  return data;
};

const getQuote = async () => {
  const quote = await fetch("https://api.quotable.io/quotes/random")
    .then((res) => res.json())
    .then((data) => data[0])
    .catch((err) => console.log(err));

  console.log(quote);
  return quote;
};

getQuote();

const refreshQuote = async () => {
  const quoteData = await getQuote();

  console.log(quoteData);
  const quoteContent = quoteData.content;
  const quoteAuthor = quoteData.author;

  authorOfQuote.innerHTML = quoteAuthor;
  quote.innerHTML = quoteContent;
};

refreshQuote();

refreshQuoteBtn.addEventListener("click", () => {
  refreshQuote();
});

const displayTime = async () => {
  const currentLocation = await getLocation();
  console.log(currentLocation);

  // data to display
  const timezoneCode = currentLocation.timezone.code;
  const currentTime = currentLocation.timezone.current_time;
  const city = currentLocation.location.city.name;
  const country = currentLocation.location.country.alpha2;
  const daylight = currentLocation.timezone.is_daylight_saving;

  // DOM
  const time = document.getElementById("time");
  const timezone = document.getElementById("timezone");
  const location = document.getElementById("location");

  const timeToDisplay = new Date(currentTime);

  let minutes = timeToDisplay.getMinutes();
  const hours = timeToDisplay.getHours();

  if (parseInt(minutes) < 10) {
    minutes = "0" + minutes;
  }

  time.innerHTML = hours + ":" + minutes;
  timezone.innerHTML = timezoneCode;
  location.innerHTML = "in " + city + ", " + country;

  if (daylight) {
    nightBg.classList.add("hidden");
    dayBg.classList.remove("hidden");
  }
  if (!daylight) {
    nightBg.classList.remove("hidden");
    dayBg.classList.add("hidden");
  }
};

displayTime();

// console.log(b);

const displayMetaData = async () => {
  const currentLocation = await getLocation();
  console.log(currentLocation.ip);
  const url = "http://worldtimeapi.org/api/ip/" + currentLocation.ip;

  const locationMetadata = await getLocationInformation(url);

  const currentTimezone = locationMetadata.timezone;
  const dayOfTheWeek = locationMetadata.day_of_week;
  const dayOfTheYear = locationMetadata.day_of_year;
  const weekNumber = locationMetadata.week_number;

  const currentTimezoneDisplay = document.getElementById("current-timezone");
  const dayOfTheWeekDisplay = document.getElementById("day-of-week");
  const dayOfTheYearDisplay = document.getElementById("day-of-year");
  const weekNumberDisplay = document.getElementById("week-number");

  currentTimezoneDisplay.innerHTML = currentTimezone;
  dayOfTheWeekDisplay.innerHTML = dayOfTheWeek;
  dayOfTheYearDisplay.innerHTML = dayOfTheYear;
  weekNumberDisplay.innerHTML = weekNumber;
};

displayMetaData();
