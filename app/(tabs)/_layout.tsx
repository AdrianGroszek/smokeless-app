import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/hooks/useTheme';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabsLayout() {
  const { colors, isDark } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor:
            Platform.OS === 'ios' ? 'transparent' : `${colors.surface}FA`,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={isDark ? 80 : 0}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: isDark
                  ? `${colors.surface}B3`
                  : `${colors.surface}FA`,
              }}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='progress'
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='pie-chart' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
