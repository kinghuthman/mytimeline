import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TimelineItem as TimelineItemType } from "../../types/timeline";

interface TimelineItemProps {
  item: TimelineItemType;
  isActive: boolean;
  onPress: () => void;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  isActive,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.item, isActive && styles.activeItem]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {isActive && <View style={styles.activeIndicator} />}
    </View>
  </TouchableOpacity>
);
