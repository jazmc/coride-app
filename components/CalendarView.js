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
import {
  getDocById,
  getEventsByDateAndId,
  parseLessonTitle,
} from "../assets/HelperFunctions";
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
    new Date(new Date().setDate(today.getDate() + offset))
  );

export default function CalendarView({ currentStable }) {
  const db = getFirestore();

  const [marked, setMarked] = useState({});
  const [stableToListen, setStableToListen] = useState(currentStable);
  const [currentDate, setCurrentDate] = useState(getDate());
  const [parsedEvents, setParsedEvents] = useState([]);
  const [usedEventIds, setUsedEventIds] = useState([]);
  const [eventsByDate, setEventsByDate] = useState([]);
  const [newMark, setNewMark] = useState({});
  const [eventData, setEventData] = useState({});

  const getEventsFromDb = () => {
    // hae eventit firebasesta
    const getEvents = async () => {
      return await getEventsByDateAndId(db, stableToListen.id, currentDate);
    };
    // venaa hakua ja sitten käy jokainen event läpi
    getEvents().then((results) => {
      results.forEach(async (element) => {
        // opettajan tiedot
        const teacher = await getDocById(db, "users", element.data.teacher);
        // ratsastaja-ratsu -otsikko:
        const eventTitle = await parseLessonTitle(db, element.data.students);
        // jos event ei oo vielä kalenterissa:
        if (usedEventIds.includes(element.id) === false) {
          // luo merkille pvm
          setNewMark({
            date: moment
              .unix(element.data.startTime.seconds)
              .format("YYYY-MM-DD"),
          });
          // luo tapahtumalle tiedot
          setEventData({
            id: element.id,
            start: moment
              .unix(element.data.startTime.seconds)
              .format("YYYY-MM-DD HH:mm:ss"),
            end: moment
              .unix(element.data.endTime.seconds)
              .format("YYYY-MM-DD HH:mm:ss"),
            title: eventTitle.join(", "),
            summary:
              element.data.description +
              " (" +
              teacher.first_name +
              " " +
              teacher.last_name +
              ")",
          });
          // --> useEffectit hoitaa nämä kalenteriin
        }
      });
    });
  };

  useEffect(() => {
    // jos currentStable vaihtuu validiksi eikä esim. poistu
    if (Object.keys(currentStable).length > 0) {
      setCurrentDate(getDate());
      setParsedEvents([]);
      setUsedEventIds([]);
      setMarked({});
      setStableToListen(currentStable);
      //getEventsFromDb();
    }
  }, [currentStable]);

  useEffect(() => {
    getEventsFromDb();
  }, [currentDate, stableToListen]);

  useEffect(() => {
    // uusi täppä täppä-olion jatkeeksi
    setMarked({
      ...marked,
      [newMark.date]: { marked: true },
    });
  }, [newMark]);

  useEffect(() => {
    // lisätään id käytettyihin ettei tuu tuplia
    setUsedEventIds([...usedEventIds, eventData.id]);
    // uusi event parsittujen joukkoon kalenteriin
    if (parsedEvents.length > 0) {
      setParsedEvents([...parsedEvents, eventData]);
    } else {
      setParsedEvents([eventData]);
    }
  }, [eventData]);

  useEffect(() => {
    // parsi eventit kalenteriin
    setEventsByDate(
      _.groupBy(parsedEvents, (e) =>
        CalendarUtils.getCalendarDateString(e.start)
      )
    );
  }, [parsedEvents]);

  const onDateChanged = (date) => {
    //console.warn("TimelineCalendarScreen onDateChanged: ", date, updateSource);
    // fetch and set data for date + week ahead
    setCurrentDate(date);
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const createNewEvent = (timeString, timeObject) => {
    // TODO: selvitä onko käyttäjällä oikeuksia
    console.error("Ei oikeuksia kalenteritapahtumien luontiin");
    return;

    const hourString = `${(timeObject.hour + 1).toString().padStart(2, "0")}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, "0")}`;

    const newEvent = {
      id: "draft",
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: "New Event",
      color: colors.lightPrimary,
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
    //onBackgroundLongPressOut: approveNewEvent,
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

  const CreateTimelineList = (props) => {
    return (
      <TimelineList
        events={props.eventsByDate}
        timelineProps={timelineProps}
        showNowIndicator
        scrollToFirst
        initialTime={INITIAL_TIME}
        //onBackgroundLongPress={(e) => console.log(e)}
      />
    );
  };

  const CreateWeekCalendar = (props) => {
    return (
      <WeekCalendar
        firstDay={1}
        markedDates={props.marked}
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
    );
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
      <CreateWeekCalendar marked={marked} />
      <CreateTimelineList eventsByDate={eventsByDate} />
    </CalendarProvider>
  );
}
