import { useAppDispatch, useAppSelector } from "@/src/redux-toolkit/hooks";
import { useGetFriendsQuery } from "@/src/redux-toolkit/services/friends";
import { addName } from "@/src/redux-toolkit/slices/authSlice";

import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TimelineItem } from "../../types/timeline";
import { generateDayPosts } from "../../utils/mockDayData";
import {
  generateMockTimelineData,
  getTimelineDataForZoomLevel,
} from "../../utils/timelineData";

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
  const [timelineData] = useState<TimelineItem[]>(generateMockTimelineData());

  // Get current view data based on zoom level
  const currentViewData = useMemo(
    () => getTimelineDataForZoomLevel(zoomLevel, timelineData),
    [zoomLevel, timelineData]
  );

  // Detect zoom level changes for analytics or optimization
  useEffect(() => {
    const currentLevel =
      zoomLevel <= 0.4 ? "year" : zoomLevel <= 0.7 ? "month" : "day";
    console.log(`Timeline zoom level changed to: ${currentLevel}`);
  }, [zoomLevel]);

  const dispatch = useAppDispatch();
  const storeData = useAppSelector((state) => state.timelineApi);
  const { data: timelineApiData, error } = useGetFriendsQuery({});
  console.log({ storeData, timelineApiData, error });

  let timeLineDates = zoomLevel > 0.7 ? data : year;

  useEffect(() => {
    // Set the initial active index to the first item
    setActiveIndex(4);
  }, []);

  const getDayPosts = useMemo(() => {
    if (!currentViewData[activeIndex]) return [];

    const selectedDate = new Date(currentViewData[activeIndex].date);
    return generateDayPosts(selectedDate, Math.floor(Math.random() * 5) + 1);
  }, [currentViewData, activeIndex]);

  // todo: add button for (posts, images, todos, will generate different screen)
  // todo: filter (posts, images, todos, under timeline horizontal scroll above vertical content)
  return (
    <View style={{ height: "100%", marginTop: 20 }}>
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
            {currentViewData.map((item, index) => (
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
          {getDayPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{post.formattedDate}</Text>
                </View>
              </View>
              <View style={styles.postContent}>
                <Text style={styles.postText}>{post.content}</Text>
              </View>
              <View style={styles.postFooter}>
                <Text style={styles.stats}>
                  {post.likes} likes • {post.comments} comments
                </Text>
              </View>
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
    padding: 10,
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
  postCard: {
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dateContainer: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  postContent: {
    marginVertical: 8,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
  },
  postFooter: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  stats: {
    color: "#666",
    fontSize: 14,
  },
});

export default Timeline;
