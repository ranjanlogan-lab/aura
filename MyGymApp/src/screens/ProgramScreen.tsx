import React, { useState } from 'react';
import { View } from 'react-native';
import { List, Switch, Text, useTheme } from 'react-native-paper';
import { workoutProgram } from '../data/workoutProgram';

export default function ProgramScreen() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [weakPoint, setWeakPoint] = useState<Record<string, boolean>>({});

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <List.Section>
        <List.Subheader>7-Day Workout Plan</List.Subheader>
        {workoutProgram.days.map(day => {
          const isExpanded = expanded[day.dayIndex] ?? false;
          return (
            <List.Accordion
              key={day.dayIndex}
              title={day.dayName}
              expanded={isExpanded}
              onPress={() => setExpanded(prev => ({ ...prev, [day.dayIndex]: !isExpanded }))}
            >
              {day.exercises.map((ex, idx) => {
                const key = `${day.dayIndex}-${ex.name}-${idx}`;
                const isWeak = weakPoint[key] ?? false;
                return (
                  <List.Item
                    key={key}
                    title={`${ex.name} • ${ex.sets}x${ex.reps} • RPE ${ex.rpe} • Rest ${ex.restSeconds}s`}
                    right={() => (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Weak Point</Text>
                        <Switch value={isWeak} onValueChange={v => setWeakPoint(prev => ({ ...prev, [key]: v }))} />
                      </View>
                    )}
                  />
                );
              })}
            </List.Accordion>
          );
        })}
      </List.Section>
    </View>
  );
}