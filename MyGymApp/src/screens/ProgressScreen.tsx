import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { getConsistency, getPersonalRecords, getWeeklyVolume } from '../db/sqlite';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart, ResponsiveContainer, ComposedChart } from 'recharts';

function getThisWeekRange(): { start: string; end: string } {
  const now = new Date();
  const day = now.getDay();
  const start = new Date(now);
  start.setDate(now.getDate() - day);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const toISO = (d: Date) => d.toISOString().slice(0, 10);
  return { start: toISO(start), end: toISO(end) };
}

export default function ProgressScreen() {
  const theme = useTheme();
  const [volumeData, setVolumeData] = useState<Array<{ date: string; volume: number }>>([]);
  const [prs, setPrs] = useState<Array<{ exercise: string; maxWeight: number }>>([]);
  const [consistency, setConsistency] = useState<Array<{ date: string; complete: number }>>([]);

  useEffect(() => {
    const { start, end } = getThisWeekRange();
    getWeeklyVolume(start, end).then(setVolumeData).catch(() => setVolumeData([]));
    getPersonalRecords().then(setPrs).catch(() => setPrs([]));
    getConsistency().then(setConsistency).catch(() => setConsistency([]));
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>
      <Text variant="titleLarge" style={{ marginBottom: 8 }}>Progress</Text>

      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Weekly Volume" subtitle="Sum of reps × weight per day" />
        <Card.Content style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#6200ee" />
              <Line type="monotone" dataKey="volume" stroke="#03dac6" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Personal Records" subtitle="Heaviest weight per exercise" />
        <Card.Content style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={prs}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="exercise" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="maxWeight" fill="#6200ee" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Consistency" subtitle="Days trained" />
        <Card.Content style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consistency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="complete" fill="#03dac6" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}