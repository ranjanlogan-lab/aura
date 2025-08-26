import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, HelperText } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { db } from '../db/sqlite';

async function exportData(): Promise<string> {
  const workout_logs = await db.getAllAsync('SELECT * FROM workout_logs;', []);
  const workout_sessions = await db.getAllAsync('SELECT * FROM workout_sessions;', []);
  const day_notes = await db.getAllAsync('SELECT * FROM day_notes;', []);

  const dump = { workout_logs, workout_sessions, day_notes };
  const content = JSON.stringify(dump, null, 2);
  const fileUri = FileSystem.documentDirectory + `mygymapp-backup-${Date.now()}.json`;
  await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
  return fileUri;
}

async function importData(): Promise<void> {
  const result = await DocumentPicker.getDocumentAsync({ type: 'application/json', multiple: false });
  if (result.canceled || !result.assets?.length) return;
  const file = result.assets[0];
  const content = await FileSystem.readAsStringAsync(file.uri, { encoding: FileSystem.EncodingType.UTF8 });
  const parsed = JSON.parse(content);

  await db.withTransactionAsync(async () => {
    if (Array.isArray(parsed.workout_logs)) {
      for (const r of parsed.workout_logs) {
        await db.runAsync(
          `INSERT OR REPLACE INTO workout_logs (date, exercise, setNumber, reps, weight) VALUES (?, ?, ?, ?, ?);`,
          [r.date, r.exercise, r.setNumber, r.reps, r.weight ?? null]
        );
      }
    }
    if (Array.isArray(parsed.workout_sessions)) {
      for (const r of parsed.workout_sessions) {
        await db.runAsync(
          `INSERT OR REPLACE INTO workout_sessions (date, dayIndex, complete) VALUES (?, ?, ?);`,
          [r.date, r.dayIndex, r.complete ? 1 : 0]
        );
      }
    }
    if (Array.isArray(parsed.day_notes)) {
      for (const r of parsed.day_notes) {
        await db.runAsync(
          `INSERT OR REPLACE INTO day_notes (date, note) VALUES (?, ?);`,
          [r.date, r.note ?? null]
        );
      }
    }
  });
}

export default function SettingsScreen() {
  const [lastExportPath, setLastExportPath] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const onExport = async () => {
    try {
      const path = await exportData();
      setLastExportPath(path);
      setMessage('Exported backup to local storage.');
    } catch (e) {
      setMessage('Export failed.');
    }
  };

  const onImport = async () => {
    try {
      await importData();
      setMessage('Import completed.');
    } catch (e) {
      setMessage('Import failed.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Card>
        <Card.Title title="Backup & Restore" />
        <Card.Content>
          <Button mode="contained" onPress={onExport} style={{ marginBottom: 8 }}>Export Backup (JSON)</Button>
          <Button mode="outlined" onPress={onImport}>Import Backup (JSON)</Button>
          {lastExportPath ? <HelperText type="info">Saved to: {lastExportPath}</HelperText> : null}
          {message ? <HelperText type="info">{message}</HelperText> : null}
        </Card.Content>
      </Card>
    </View>
  );
}