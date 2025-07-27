import { TimelineItem, TimelineLevel } from "../types/timeline";

export const ZOOM_LEVELS: Record<TimelineLevel, { min: number; max: number }> =
  {
    year: { min: 0, max: 0.4 },
    month: { min: 0.4, max: 0.7 },
    day: { min: 0.7, max: 1 },
  };

export function generateMockTimelineData(): TimelineItem[] {
  const currentYear = new Date().getFullYear();
  const years: TimelineItem[] = [];

  // Generate 3 years of data
  for (let y = 0; y < 3; y++) {
    const year = currentYear - y;
    const months: TimelineItem[] = [];

    // Generate months for each year
    for (let m = 0; m < 12; m++) {
      const days: TimelineItem[] = [];
      const daysInMonth = new Date(year, m + 1, 0).getDate();

      // Generate days for each month
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, m, d);
        days.push({
          id: d,
          title: `${date.toLocaleDateString("en-US", { day: "numeric" })}`,
          description: `${d} posts available`,
          date,
          children: [], // Could contain posts for that day
        });
      }

      months.push({
        id: m,
        title: new Date(year, m).toLocaleDateString("en-US", { month: "long" }),
        description: `${days.length} days`,
        date: new Date(year, m),
        children: days,
      });
    }

    years.push({
      id: year,
      title: year.toString(),
      description: `${months.length} months`,
      date: new Date(year, 0),
      children: months,
    });
  }

  return years;
}

export function getTimelineDataForZoomLevel(
  zoomLevel: number,
  allData: TimelineItem[]
): TimelineItem[] {
  if (zoomLevel <= ZOOM_LEVELS.year.max) {
    return allData;
  } else if (zoomLevel <= ZOOM_LEVELS.month.max) {
    return (
      allData.find((year) => year.id === new Date().getFullYear())?.children ||
      []
    );
  } else {
    const currentMonth = new Date().getMonth();
    return (
      allData
        .find((year) => year.id === new Date().getFullYear())
        ?.children?.find((month) => month.id === currentMonth)?.children || []
    );
  }
}
