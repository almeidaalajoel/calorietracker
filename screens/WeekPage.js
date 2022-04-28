import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaFrame, SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { getDate, getCalsColor, getProteinColor } from "../functions";
import {
  startOfWeek,
  add,
  sub,
  parseISO,
  format,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  endOfWeek,
  dayof,
} from "date-fns";
import { elementsThatOverlapOffsets } from "react-native/Libraries/Lists/VirtualizeUtils";

const WeekPage = ({ history }) => {
  const { height, width } = useSafeAreaFrame();
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState({});

  useEffect(() => {
    const newDate = getDate();
    setDate(newDate);
    setMonth(colorMonth(newDate));
  }, [history]);

  const colorMonth = (dateString) => {
    const tempMonth = {};
    const monthDate = parseISO(dateString);
    const numDays = getDaysInMonth(monthDate);
    const start = startOfMonth(monthDate);
    for (let i = 0; i < numDays; i++) {
      const dayOfTheMonth = format(add(start, { days: i }), "yyyy-MM-dd");
      if (history[dayOfTheMonth]) {
        tempMonth[dayOfTheMonth] = createDay(dayOfTheMonth);
      }
    }
    return tempMonth;
  };

  const createDay = (dayOfTheMonth) => {
    return {
      color: getCalsColor(history[dayOfTheMonth].cals),
      startingDay: isStart(dayOfTheMonth),
      endingDay: isEnd(dayOfTheMonth),
    };
  };

  const isStart = (dayOfTheMonth) => {
    const dateDayOfMonth = parseISO(dayOfTheMonth);
    const prevDay = format(sub(dateDayOfMonth, { days: 1 }), "yyyy-MM-dd");
    if (isFirstDayOfMonth(dateDayOfMonth)) return true;
    else if (
      !history[prevDay] ||
      getCalsColor(history[dayOfTheMonth].cals) !==
        getCalsColor(history[prevDay].cals)
    )
      return true;
    else return false;
  };

  const isEnd = (dayOfTheMonth) => {
    const dateDayOfMonth = parseISO(dayOfTheMonth);
    const nextDay = format(add(dateDayOfMonth, { days: 1 }), "yyyy-MM-dd");
    if (isLastDayOfMonth(dateDayOfMonth)) return true;
    else if (
      !history[nextDay] ||
      getCalsColor(history[dayOfTheMonth].cals) !==
        getCalsColor(history[nextDay].cals)
    )
      return true;
    else return false;
  };

  const week = {};
  let weeklyCals = 0;
  let weeklyProtein = 0;
  if (date) {
    const start = startOfWeek(parseISO(date));
    for (let i = 0; i < 7; i++) {
      const dayOfTheWeek = format(add(start, { days: i }), "yyyy-MM-dd");
      week[dayOfTheWeek] = {};
      if (history[dayOfTheWeek]) {
        weeklyCals += history[dayOfTheWeek].cals;
        weeklyProtein += history[dayOfTheWeek].protein;
      }
      week[dayOfTheWeek].goalCals = 2600 * (i + 1);
      week[dayOfTheWeek].goalProtein = 110 * (i + 1);
      week[dayOfTheWeek].cals = weeklyCals;
      week[dayOfTheWeek].protein = weeklyProtein;
    }
  }

  const styles = StyleSheet.create({
    top: {
      height: height / 4,
      paddingTop: 20,
      paddingHorizontal: 10,
      alignItems: "center",
    },
    separator: {
      height: 0.5,
      width: width - 100,
      backgroundColor: "grey",
      alignSelf: "center",
    },
    calsNumberText: {
      fontSize: 30,
      fontWeight: "bold",
      color: getCalsColor(history[date]?.cals),
    },
    proteinNumberText: {
      fontSize: 30,
      fontWeight: "bold",
      color: getProteinColor(history[date]?.protein),
    },
    goalText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "rgb(68, 173, 42)",
    },
    weekCalsText: {
      fontSize: 30,
      fontWeight: "bold",
      color: getCalsColor(week[date]?.cals / (week[date]?.goalCals / 2600)),
    },
    weekProteinText: {
      fontSize: 30,
      fontWeight: "bold",
      color: getProteinColor(
        week[date]?.protein / (week[date]?.goalProtein / 110)
      ),
    },
    smallText: {
      fontSize: 14,
      color: "black",
    },
    container: { flex: 1, paddingTop: 10 },
    day: { flex: 2 },
    week: { flex: 3 },
    textContainer: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      marginTop: 25,
    },
    text: { fontSize: 20, color: "black" },
    center: { marginTop: 70 },
    slash: { fontSize: 30, color: "black" },
    bottom: { flex: 1 },
  });
  return date ? (
    <SafeAreaView style={styles.container}>
      <Calendar
        markingType={"period"}
        markedDates={month}
        onDayPress={({ dateString }) => {
          setDate(dateString);
        }}
        theme={{ todayTextColor: "#00adf5" }}
        maxDate={getDate()}
        onMonthChange={({ dateString }) => {
          setMonth(colorMonth(dateString));
        }}
      />
      <View style={styles.bottom}>
        <View style={styles.day}>
          {history[date] ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {format(parseISO(date), "EEEE MM/dd")}
              </Text>
              <View style={styles.separator} />
              <Text style={styles.calsNumberText}>{history[date].cals}</Text>
              <Text style={styles.smallText}>calories</Text>
              <Text style={styles.proteinNumberText}>
                {history[date].protein}
              </Text>
              <Text style={styles.smallText}>protein</Text>
            </View>
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {format(parseISO(date), "EEEE MM/dd")}
              </Text>
              <View style={styles.separator} />
              <View style={styles.center}>
                <Text style={styles.smallText}>No submission</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.week}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              From {format(startOfWeek(parseISO(date)), "MM/dd")}-
              {format(parseISO(date), "MM/dd")}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.goalText}>
              <Text style={styles.weekCalsText}> {week[date].cals}</Text>
              <Text style={styles.slash}>/</Text>
              {week[date].goalCals}
            </Text>
            <Text style={styles.smallText}>calories</Text>
            <Text style={styles.goalText}>
              <Text style={styles.weekProteinText}>{week[date].protein}</Text>
              <Text style={styles.slash}>/</Text>
              {week[date].goalProtein}
            </Text>
            <Text style={styles.smallText}>protein</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  ) : null;
};

export default WeekPage;
