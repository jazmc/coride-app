import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
  LocaleConfig,
  WeekCalendar,
} from "react-native-calendars";
import _ from "lodash";
import { getEventsByDateAndId } from "../assets/HelperFunctions";
import { colors } from "../assets/Colors";
import { getFirestore } from "firebase/firestore";
import moment from "moment";

LocaleConfig.locales["fi"] = {
  monthNames: [
    "Tammikuu",
    "Helmikuu",
    "Maaliskuu",
    "Huhtikuu",
    "Toukokuu",
    "Kesäkuu",
    "Heinäkuu",
    "Elokuu",
    "Syyskuu",
    "Lokakuu",
    "Marraskuu",
    "Joulukuu",
  ],
  monthNamesShort: [
    "Tammi",
    "Helmi",
    "Maalis",
    "Huhti",
    "Touko",
    "Kesä",
    "Heinä",
    "Elo",
    "Syys",
    "Loka",
    "Marras",
    "Joulu",
  ],
  dayNames: [
    "Sunnuntai",
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai",
    "Lauantai",
  ],
  dayNamesShort: ["su", "ma", "ti", "ke", "to", "pe", "la"],
  today: "Tänään",
};
LocaleConfig.defaultLocale = "fi";

const INITIAL_TIME = { hour: 9, minutes: 0 };
const today = new Date();
const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset)
  );

const EVENTS = [
  {
    start: `${getDate(-1)} 09:20:00`,
    end: `${getDate(-1)} 12:00:00`,
    title: "Merge Request to React Native Calendars",
    summary: "Merge Timeline Calendar to React Native Calendars",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate()} 01:15:00`,
    end: `${getDate()} 02:30:00`,
    title: "Meeting A",
    summary: "Summary for meeting A",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate()} 01:30:00`,
    end: `${getDate()} 02:30:00`,
    title: "Meeting B",
    summary: "Summary for meeting B",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate()} 01:45:00`,
    end: `${getDate()} 02:45:00`,
    title: "Meeting C",
    summary: "Summary for meeting C",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate()} 02:40:00`,
    end: `${getDate()} 03:10:00`,
    title: "Meeting D",
    summary: "Summary for meeting D",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate()} 02:50:00`,
    end: `${getDate()} 03:20:00`,
    title: "Meeting E",
    summary: "Summary for meeting E",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate()} 04:30:00`,
    end: `${getDate()} 05:30:00`,
    title: "Meeting F",
    summary: "Summary for meeting F",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(1)} 00:30:00`,
    end: `${getDate(1)} 01:30:00`,
    title: "Visit Grand Mother",
    summary: "Visit Grand Mother and bring some fruits.",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(1)} 02:30:00`,
    end: `${getDate(1)} 03:20:00`,
    title: "Meeting with Prof. Behjet Zuhaira",
    summary: "Meeting with Prof. Behjet at 130 in her office.",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(1)} 04:10:00`,
    end: `${getDate(1)} 04:40:00`,
    title: "Tea Time with Dr. Hasan",
    summary: "Tea Time with Dr. Hasan, Talk about Project",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(1)} 01:05:00`,
    end: `${getDate(1)} 01:35:00`,
    title: "Dr. Mariana Joseph",
    summary: "3412 Piedmont Rd NE, GA 3032",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(1)} 14:30:00`,
    end: `${getDate(1)} 16:30:00`,
    title: "Meeting Some Friends in ARMED",
    summary: "Arsalan, Hasnaat, Talha, Waleed, Bilal",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(2)} 01:40:00`,
    end: `${getDate(2)} 02:25:00`,
    title: "Meet Sir Khurram Iqbal",
    summary: "Computer Science Dept. Comsats Islamabad",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(2)} 04:10:00`,
    end: `${getDate(2)} 04:40:00`,
    title: "Tea Time with Colleagues",
    summary: "WeRplay",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(2)} 00:45:00`,
    end: `${getDate(2)} 01:45:00`,
    title: "Lets Play Apex Legends",
    summary: "with Boys at Work",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(2)} 11:30:00`,
    end: `${getDate(2)} 12:30:00`,
    title: "Dr. Mariana Joseph",
    summary: "3412 Piedmont Rd NE, GA 3032",
    color: colors.lightSecondary,
  },
  {
    start: `${getDate(4)} 12:10:00`,
    end: `${getDate(4)} 13:45:00`,
    title: "Merge Request to React Native Calendars",
    summary: "Merge Timeline Calendar to React Native Calendars",
    color: colors.lightSecondary,
  },
];

export default function CalendarView({ currentStable }) {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [parsedEvents, setParsedEvents] = useState([]);
  const [usedEventIds, setUsedEventIds] = useState([]);
  const [eventsByDate, setEventsByDate] = useState([]);
  const [marked, setMarked] = useState({});

  const db = getFirestore();

  useEffect(() => {
    setCurrentDate(getDate());
    setParsedEvents([]);
    setUsedEventIds([]);
    setMarked({});
  }, [currentStable]);

  useEffect(async () => {
    const events = await getEventsByDateAndId(
      db,
      currentStable.id,
      currentDate
    );
    events.forEach((element) => {
      // jos event ei ole vielä kalenterissa:
      if (usedEventIds.includes(element.id) === false) {
        setParsedEvents([
          ...parsedEvents,
          {
            id: element.id,
            start: moment
              .unix(element.data.startTime.seconds)
              .format("YYYY-MM-DD HH:mm:ss"),
            end: moment
              .unix(element.data.endTime.seconds)
              .format("YYYY-MM-DD HH:mm:ss"),
            title: "TODO: otsikko",
            summary: element.data.description,
          },
        ]);
        // lisätään id käytettyihin ettei tuu tuplia
        setUsedEventIds([...usedEventIds, element.id]);
        // lisätään täppä kalenterin pvm:ään
        setMarked({
          ...marked,
          [`${moment
            .unix(element.data.startTime.seconds)
            .format("YYYY-MM-DD")}`]: {
            marked: true,
          },
        });
      }
    });
    // parsi eventit kalenteriin
    setEventsByDate(
      _.groupBy(parsedEvents, (e) =>
        CalendarUtils.getCalendarDateString(e.start)
      )
    );
  }, [currentDate]);

  const onDateChanged = (date) => {
    //console.warn("TimelineCalendarScreen onDateChanged: ", date, updateSource);
    // fetch and set data for date + week ahead
    setCurrentDate(date);
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const createNewEvent = (timeString, timeObject) => {
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, "0")}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, "0")}`;

    const newEvent = {
      id: "draft",
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: "New Event",
      color: "#ffffff",
    };

    if (timeObject.date) {
      if (eventsByDate[timeObject.date]) {
        eventsByDate[timeObject.date] = [
          ...eventsByDate[timeObject.date],
          newEvent,
        ];
        setEventsByDate(eventsByDate);
      } else {
        eventsByDate[timeObject.date] = [newEvent];
        setEventsByDate({ ...eventsByDate });
      }
    }
  };

  const approveNewEvent = (_timeString, timeObject) => {
    Alert.prompt("New Event", "Enter event title", [
      {
        text: "Cancel",
        onPress: () => {
          if (timeObject.date) {
            eventsByDate[timeObject.date] = _.filter(
              eventsByDate[timeObject.date],
              (e) => e.id !== "draft"
            );

            setEventsByDate(eventsByDate);
          }
        },
      },
      {
        text: "Create",
        onPress: (eventTitle) => {
          if (timeObject.date) {
            const draftEvent = _.find(eventsByDate[timeObject.date], {
              id: "draft",
            });
            if (draftEvent) {
              draftEvent.id = undefined;
              draftEvent.title = eventTitle ?? "New Event";
              draftEvent.color = colors.lightSecondary;
              eventsByDate[timeObject.date] = [
                ...eventsByDate[timeObject.date],
              ];

              setEventsByDate(eventsByDate);
            }
          }
        },
      },
    ]);
  };

  const timelineProps = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
    onBackgroundLongPressOut: approveNewEvent,
    scrollToFirst: true,
    //start: 0,
    //end: 24,
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: colors.offWhite,
        weekVerticalMargin: 0,
        "stylesheet.calendar.header": {
          week: { marginVertical: 0, marginTop: 0 },
        },
      }}
      todayButtonStyle={{
        backgroundColor: colors.darkPrimary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 20,
      }}
    >
      <WeekCalendar
        firstDay={1}
        markedDates={marked}
        leftArrowImageSource={{ uri: require("../assets/previous.png") }}
        rightArrowImageSource={{ uri: require("../assets/next.png") }}
        allowShadow={true}
        theme={{
          weekVerticalMargin: 0,
          "stylesheet.calendar.header": {
            week: { marginVertical: 0, marginTop: 0 },
          },
          selectedDayBackgroundColor: colors.darkSecondary,
          dotColor: colors.darkSecondary,
          todayTextColor: colors.darkSecondary,
        }}
      />
      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        showNowIndicator
        scrollToFirst
        initialTime={INITIAL_TIME}
      />
    </CalendarProvider>
  );
}
