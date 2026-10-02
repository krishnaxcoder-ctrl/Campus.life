import { Fragment, type ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';

/**
 * Two-column grid built from flex rows, so it always fits the real container width
 * (window width is wrong on web where the scrollbar takes space).
 */
export function Grid2<T>({
  items,
  columnGap,
  rowGap,
  style,
  renderItem,
  keyOf,
}: {
  items: T[];
  columnGap: number;
  rowGap: number;
  style?: StyleProp<ViewStyle>;
  renderItem: (item: T, index: number) => ReactNode;
  keyOf: (item: T) => string;
}) {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
  return (
    <View style={style}>
      {rows.map((row, r) => (
        <View key={r} style={{ flexDirection: 'row', columnGap, marginTop: r ? rowGap : 0 }}>
          {row.map((item, c) => (
            <Fragment key={keyOf(item)}>{renderItem(item, r * 2 + c)}</Fragment>
          ))}
          {row.length === 1 && <View style={{ flex: 1 }} />}
        </View>
      ))}
    </View>
  );
}
