import React, { useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button, Card, TextInput, HelperText, Dialog, Portal, useTheme } from 'react-native-paper';
import { workoutProgram } from '../data/workoutProgram';
import { Exercise } from '../types/workout';
import { logSet, markSessionComplete, saveDayNote } from '../db/sqlite';

function getTodayDayIndex(): number {
  const d = new Date();
  return d.getDay(); // 0..6
}

function formatDate(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export default function TodayScreen() {
  const theme = useTheme();
  const todayIndex = useMemo(() => getTodayDayIndex(), []);
  const today = workoutProgram.days[todayIndex];
  const [weights, setWeights] = useState<Record<string, string>>({});
  const [note, setNote] = useState('');
  const [timerVisible, setTimerVisible] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const onMarkSet = async (exercise: Exercise, setNumber: number) => {
    const key = `${exercise.name}-set-${setNumber}`;
    const weightStr = weights[key];
    const weight = weightStr ? parseFloat(weightStr) : undefined;
    await logSet(formatDate(), exercise.name, setNumber, exercise.reps, weight);
  };

  const onStartRest = (seconds: number) => {
    setTimerSeconds(seconds);
    setTimerVisible(true);
  };

  const onSaveSession = async () => {
    await markSessionComplete(formatDate(), todayIndex);
    if (note.trim()) {
      await saveDayNote(formatDate(), note.trim());
    }
  };

  const renderExercise = ({ item }: { item: Exercise }) => {
    return (
      <Card style={{ marginBottom: 12 }}>
        <Card.Title title={item.name} subtitle={`Sets ${item.sets} • Reps ${item.reps} • RPE ${item.rpe} • Rest ${item.restSeconds}s`} />
        <Card.Content>
          {Array.from({ length: item.sets }, (_, i) => i + 1).map(setNum => {
            const key = `${item.name}-set-${setNum}`;
            const val = weights[key] ?? '';
            return (
              <View key={key} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                <Text variant="labelLarge">Set {setNum}</Text>
                <TextInput
                  mode="outlined"
                  style={{ flex: 1 }}
                  keyboardType="numeric"
                  value={val}
                  placeholder="Weight (kg)"
                  onChangeText={t => setWeights(prev => ({ ...prev, [key]: t }))}
                />
                <Button mode="contained" onPress={() => onMarkSet(item, setNum)}>Mark Set Complete</Button>
              </View>
            );
          })}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Button onPress={() => onStartRest(item.restSeconds)}>Start Rest Timer</Button>
            {item.notes ? <HelperText type="info">{item.notes}</HelperText> : null}
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>
      <Text variant="titleLarge" style={{ marginBottom: 8 }}>{today.dayName}</Text>
      <FlatList
        data={today.exercises}
        keyExtractor={e => e.name}
        renderItem={renderExercise}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <Text variant="titleMedium" style={{ marginTop: 8 }}>Notes of the Day</Text>
      <TextInput
        mode="outlined"
        multiline
        value={note}
        placeholder="How did the session feel?"
        onChangeText={setNote}
        style={{ marginBottom: 12 }}
      />
      <Button mode="contained" onPress={onSaveSession}>Save Session</Button>

      <Portal>
        <RestTimer visible={timerVisible} seconds={timerSeconds} onDismiss={() => setTimerVisible(false)} />
      </Portal>
    </View>
  );
}

function RestTimer({ visible, seconds, onDismiss }: { visible: boolean; seconds: number; onDismiss: () => void }) {
  const [remaining, setRemaining] = useState(seconds);

  React.useEffect(() => {
    setRemaining(seconds);
  }, [seconds, visible]);

  React.useEffect(() => {
    if (!visible) return;
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining(r => r - 1), 1000);
    return () => clearInterval(id);
  }, [visible, remaining]);

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Rest</Dialog.Title>
      <Dialog.Content>
        <Text variant="displaySmall">{Math.max(0, remaining)}s</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss} disabled={remaining > 0}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );
}