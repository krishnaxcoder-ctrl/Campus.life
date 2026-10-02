import { forwardRef } from 'react';
import { Text, TextInput, type TextInputProps, type TextProps } from 'react-native';

// Sizes are copied from the screenshots, which already include the phone's font scale,
// so scaling is disabled to keep the text exactly the measured size.
export function T(props: TextProps) {
  return <Text allowFontScaling={false} {...props} />;
}

export const TInput = forwardRef<TextInput, TextInputProps>(function TInput(props, ref) {
  return <TextInput ref={ref} allowFontScaling={false} underlineColorAndroid="transparent" {...props} />;
});
