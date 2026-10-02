import { useState } from 'react';
import { Image, type ImageSourcePropType, type ImageStyle, type StyleProp, View, type ViewStyle } from 'react-native';

/**
 * Image that fills its container's width and keeps the source aspect ratio.
 * Width is measured, so it renders identically on native and web.
 */
export function FitImage({
  source,
  ratio,
  style,
  imageStyle,
}: {
  source: ImageSourcePropType;
  /** width / height of the source image */
  ratio: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}) {
  const [w, setW] = useState(0);
  return (
    <View style={style} onLayout={(e) => setW(e.nativeEvent.layout.width)}>
      <View style={{ height: w ? w / ratio : 0 }}>
        {w > 0 && <Image source={source} style={[{ width: w, height: w / ratio }, imageStyle]} />}
      </View>
    </View>
  );
}
