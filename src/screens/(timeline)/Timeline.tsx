import { useAppDispatch, useAppSelector } from "@/src/redux-toolkit/hooks";
import { useGetFriendsQuery } from "@/src/redux-toolkit/services/friends";
import { addName } from "@/src/redux-toolkit/slices/authSlice";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type TimelineObj = {
  data: TimelineData[];
};

export type TimelineData = {
  id: number;
  title: string;
  description: string;
};

const year = [
  { id: 0, title: "2023", description: "Current year" },
  { id: 1, title: "2022", description: "Last Year" },
  { id: 2, title: "2021", description: "2 years ago..." },
];

const Timeline = ({ data }: TimelineObj) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showList, setShowList] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.5);
  const dispatch = useAppDispatch();
  const storeData = useAppSelector((state) => state.timelineApi);
  const { data: timelineData, error } = useGetFriendsQuery({});
  console.log({ storeData, timelineData, error });

  let timeLineDates = zoomLevel > 0.7 ? data : year;

  useEffect(() => {
    // Set the initial active index to the first item
    setActiveIndex(4);
  }, []);

  const march = [
    {
      id: 0,
      title: `${data[activeIndex].title} 1st`,
      description: "laurem ipsum",
    },
    {
      id: 1,
      title: `${data[activeIndex].title} 2nd`,
      description: "ipsum laurem ipsum",
    },
    {
      id: 2,
      title: `${data[activeIndex].title} 3rd`,
      description: "hear ye hear ye",
    },
  ];

  // todo: add button for (posts, images, todos, will generate different screen)
  // todo: filter (posts, images, todos, under timeline horizontal scroll above vertical content)
  return (
    <View style={{ height: "100%" }}>
      <ScrollView horizontal style={{ maxHeight: "10%" }}>
        <ReactNativeZoomableView
          maxZoom={1.0}
          minZoom={0.2}
          zoomStep={0.25}
          initialZoom={0.25}
          movementSensibility={0.5}
          bindToBorders={true}
          onTransform={(e) => {
            // console.log(e, 'hey');
            setZoomLevel(e.zoomLevel);
          }}
          // onZoomAfter={e => {

          // }}
          style={{
            padding: 10,
            // backgroundColor: 'white',
          }}
        >
          <View style={styles.container}>
            {timeLineDates.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  dispatch(addName("bob"));
                  if (index !== activeIndex) {
                    return [setShowList(true), setActiveIndex(index)];
                  } else {
                    setShowList(!showList);
                  }
                }}
              >
                <View key={item.id} style={styles.item}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  {index === activeIndex && (
                    <View style={styles.activeIndicator} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ReactNativeZoomableView>
      </ScrollView>
      {showList && (
        <ScrollView style={styles.listContainer}>
          {march.map((date, index) => (
            <View
              style={{
                // maxHeight: '90%',
                marginBottom: 10,
                flexDirection: "column",
                borderRadius: 10,
                backgroundColor: "#fff",
                borderColor: "#fff",
                borderBottomWidth: 5,
                height: 400,
                shadowColor: "#f00",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
              key={date.id}
            >
              <Text style={styles.title}>{date?.title}</Text>
              <Text style={styles.description}>{date?.description}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // marginTop: 20,
    maxHeight: "100%",
    height: 100,
  },
  listContainer: {
    flex: 1,
    maxHeight: "85%",
    // height: '80%',
    maxWidth: "100%",
    minWidth: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  item: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  activeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "#f00",
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});

export default Timeline;
