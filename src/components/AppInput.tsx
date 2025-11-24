import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

type Props = {
  label?: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  error?: string;
  isRTL?: boolean;
  secureTextEntry?: boolean;
  rightIcon?: ReactNode;
customInputStyle?: object;
} & Pick<TextInputProps, 'keyboardType' | 'autoCapitalize'>;

const AppInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  editable = true,
  error,
  isRTL,
  secureTextEntry,
  rightIcon,
  keyboardType,
  autoCapitalize,
  customInputStyle
}: Props) => {
  return (
    <View style={styles.block}>
      {label ? (
        <Text style={[styles.label, isRTL && styles.rtlLabel]}>{label}</Text>
      ) : null}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            customInputStyle,
            !editable && styles.disabledInput,
            isRTL && styles.rtlInput,
          ]}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholder={placeholder || label}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />

        {rightIcon && (
          <View
            style={[
              styles.rightIconWrapper,
              isRTL && styles.rightIconWrapperRTL,
            ]}
          >
            {rightIcon}
          </View>
        )}
      </View>

      {error ? (
        <Text style={[styles.error, isRTL && styles.rtlError]}>{error}</Text>
      ) : null}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  block: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  rtlLabel: {
    writingDirection: 'rtl',
  },

  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#000',
  },

  rtlInput: {
    textAlign: 'right',
  },

  disabledInput: {
    backgroundColor: '#E5E7EB',
    color: '#6B7280',
  },

  rightIconWrapper: {
    position: 'absolute',
    right: 12,
    top: 9,
    padding: 4,
  },
  rightIconWrapperRTL: {
    right: 12,
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: '#DC2626',
  },
  rtlError: {
    textAlign: 'right',
  },
});
