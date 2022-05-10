import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getEventsByDateAndId,
  getDocById,
  parseLessonTitle,
} from "../assets/HelperFunctions";
import styles from "../assets/Styles";
import { getFirestore } from "firebase/firestore";
import moment from "moment";

export default function LessonTable({ currentStable }) {
  const db = getFirestore();

  const [lessons, setLessons] = useState([]);

  useEffect(async () => {
    const todaysLessons = await getEventsByDateAndId(
      db,
      currentStable.id,
      new Date(new Date().setHours(0, 0, 0, 0))
    );

    todaysLessons.forEach(async (element) => {
      const teacher = await getDocById(db, "users", element.data.teacher);
      const eventTitle = await parseLessonTitle(db, element.data.students);
      if (
        moment.unix(element.data.endTime.seconds).format("DD") ==
        new Date().getDate()
      ) {
        setLessons([
          ...lessons,
          {
            id: element.id,
            teacher: teacher.first_name + " " + teacher.last_name,
            start: moment.unix(element.data.startTime.seconds).format("HH:mm"),
            end: moment.unix(element.data.endTime.seconds).format("HH:mm"),
            title: eventTitle.join(", "),
            description: element.data.description,
          },
        ]);
      }
    });
  }, []);

  const Lessons = (props) => {
    return (
      <View>
        {props.lessons.map((lesson) => (
          <View key={lesson.id} style={styles.lesson}>
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>
              {lesson.start}&ndash;{lesson.end}
            </Text>
            <Text>{lesson.title}</Text>
            <Text style={{ fontStyle: "italic", flex: 2, textAlign: "right" }}>
              ({lesson.teacher})
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <>
      {lessons && lessons.length < 1 ? (
        <View style={styles.lesson}>
          <Text style={{ fontStyle: "italic" }}>Ei tunteja</Text>
        </View>
      ) : (
        <Lessons key={lessons} lessons={lessons} />
      )}
    </>
  );
}
