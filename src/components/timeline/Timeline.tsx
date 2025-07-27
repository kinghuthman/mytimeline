import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TimelineItem } from "../../types/timeline";
import { generateDayPosts } from "../../utils/mockDayData";
import { generateMockTimelineData } from "../../utils/timelineData";

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

// Navigation levels enum for better type safety
enum TimelineLevel {
  YEAR = "year",
  MONTH = "month",
  DAY = "day",
}

const Timeline = ({ data }: TimelineObj) => {
  const [currentLevel, setCurrentLevel] = useState(TimelineLevel.YEAR);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showList, setShowList] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [timelineData] = useState<TimelineItem[]>(generateMockTimelineData());

  // Get current view data based on navigation level
  const currentViewData = useMemo(() => {
    switch (currentLevel) {
      case TimelineLevel.YEAR:
        return year;
      case TimelineLevel.MONTH:
        return [
          {
            id: 0,
            title: "January",
            description: "First month",
            date: new Date(selectedYear!, 0),
          },
          {
            id: 1,
            title: "February",
            description: "Second month",
            date: new Date(selectedYear!, 1),
          },
          {
            id: 2,
            title: "March",
            description: "Third month",
            date: new Date(selectedYear!, 2),
          },
          {
            id: 3,
            title: "April",
            description: "Fourth month",
            date: new Date(selectedYear!, 3),
          },
          {
            id: 4,
            title: "May",
            description: "Fifth month",
            date: new Date(selectedYear!, 4),
          },
          {
            id: 5,
            title: "June",
            description: "Sixth month",
            date: new Date(selectedYear!, 5),
          },
          {
            id: 6,
            title: "July",
            description: "Seventh month",
            date: new Date(selectedYear!, 6),
          },
          {
            id: 7,
            title: "August",
            description: "Eighth month",
            date: new Date(selectedYear!, 7),
          },
          {
            id: 8,
            title: "September",
            description: "Ninth month",
            date: new Date(selectedYear!, 8),
          },
          {
            id: 9,
            title: "October",
            description: "Tenth month",
            date: new Date(selectedYear!, 9),
          },
          {
            id: 10,
            title: "November",
            description: "Eleventh month",
            date: new Date(selectedYear!, 10),
          },
          {
            id: 11,
            title: "December",
            description: "Twelfth month",
            date: new Date(selectedYear!, 11),
          },
        ];
      case TimelineLevel.DAY:
        const daysInMonth = new Date(
          parseInt(selectedYear!.toString()),
          selectedMonth! + 1,
          0
        ).getDate();

        return Array.from({ length: daysInMonth }, (_, i) => ({
          id: i + 1,
          title: `Day ${i + 1}`,
          description: `${i + 1}/${selectedMonth! + 1}/${selectedYear}`,
          date: new Date(selectedYear!, selectedMonth!, i + 1),
        }));
      default:
        return year;
    }
  }, [currentLevel, selectedYear, selectedMonth]);

  // Get posts for the selected timeline item
  const getTimelinePosts = useMemo(() => {
    if (!currentViewData[activeIndex]) return [];

    switch (currentLevel) {
      case TimelineLevel.YEAR:
        const selectedYear = parseInt(currentViewData[activeIndex].title);
        const posts = [];
        // Generate posts for each month of the selected year
        for (let month = 0; month < 12; month++) {
          const post = generateDayPosts(new Date(selectedYear, month), 1)[0];
          if (post)
            posts.push({
              ...post,
              formattedDate: new Date(selectedYear, month).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                }
              ),
            });
        }
        return posts;

      case TimelineLevel.MONTH:
        return generateDayPosts(currentViewData[activeIndex].date, 31).map(
          (post) => ({
            ...post,
            formattedDate: new Date(post.timestamp).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            ),
          })
        );

      case TimelineLevel.DAY:
        return generateDayPosts(currentViewData[activeIndex].date, 5).map(
          (post) => ({
            ...post,
            formattedDate: new Date(post.timestamp).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
          })
        );

      default:
        return [];
    }
  }, [currentLevel, currentViewData, activeIndex]);

  const handleItemClick = useCallback(
    (item: TimelineData & { date?: Date }, index: number) => {
      const now = Date.now();
      const isDoubleClick = now - lastClickTime < 300;

      if (isDoubleClick) {
        switch (currentLevel) {
          case TimelineLevel.YEAR:
            setCurrentLevel(TimelineLevel.MONTH);
            setSelectedYear(parseInt(item.title));
            break;
          case TimelineLevel.MONTH:
            setCurrentLevel(TimelineLevel.DAY);
            setSelectedMonth(item.id);
            break;
        }
      } else {
        setActiveIndex(index);
        setShowList(index === activeIndex ? !showList : true);
      }

      setLastClickTime(now);
    },
    [currentLevel, lastClickTime, activeIndex]
  );

  const handleBack = useCallback(() => {
    switch (currentLevel) {
      case TimelineLevel.MONTH:
        setCurrentLevel(TimelineLevel.YEAR);
        setSelectedYear(null);
        break;
      case TimelineLevel.DAY:
        setCurrentLevel(TimelineLevel.MONTH);
        setSelectedMonth(null);
        break;
    }
    setActiveIndex(0);
    setShowList(false);
  }, [currentLevel]);

  // todo: add button for (posts, images, todos, will generate different screen)
  // todo: filter (posts, images, todos, under timeline horizontal scroll above vertical content)
  return (
    <View style={{ height: "100%", marginTop: 20 }}>
      {currentLevel !== TimelineLevel.YEAR && (
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.backText}>
            Back to {currentLevel === TimelineLevel.DAY ? "Months" : "Years"}
          </Text>
        </Pressable>
      )}

      <ScrollView horizontal style={styles.timelineScroll}>
        <View style={styles.container}>
          {currentViewData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                handleItemClick(item, index);
              }}
              style={[
                styles.timelineItem,
                index === activeIndex && styles.activeItem,
              ]}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {showList && (
        <ScrollView style={styles.listContainer}>
          {getTimelinePosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{post.formattedDate}</Text>
              </View>
              <Text style={styles.postText}>{post.content}</Text>
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
    flexDirection: "row",
    alignItems: "center",
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  timelineScroll: {
    maxHeight: 120,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  timelineItem: {
    padding: 16,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeItem: {
    borderColor: "#007AFF",
    borderWidth: 2,
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
