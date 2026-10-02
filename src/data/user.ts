// Per-user data loaded from Supabase: the profile (name, member ID) and the volunteering journey.
import { useCallback, useEffect, useState } from 'react';

import { getMemberId, supabase } from '@/lib/supabase';

export type Profile = { name: string; memberId: string };

export type CheckIn = { checkIn: string; checkOut: string; duration: string; location: string };
export type JourneyItem = { id: string; title: string; total: string; checkIns: CheckIn[] };
export type Journey = { totalHours: string; items: JourneyItem[] };

async function fetchProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('name, member_id')
    .eq('member_id', getMemberId())
    .maybeSingle();
  if (error) throw error;
  return data && { name: data.name, memberId: data.member_id };
}

async function fetchJourney(): Promise<Journey> {
  const { data, error } = await supabase
    .from('profiles')
    .select('journey_activities(id, title, journey_check_ins(check_in_at, check_out_at, location))')
    .eq('member_id', getMemberId())
    .maybeSingle();
  if (error) throw error;

  let totalMs = 0;
  const activities = (data?.journey_activities ?? []).map((a) => {
    const rows = a.journey_check_ins
      .map((c) => ({
        in: Date.parse(c.check_in_at),
        out: c.check_out_at ? Date.parse(c.check_out_at) : null,
        location: c.location,
      }))
      .sort((x, y) => y.in - x.in);

    let ms = 0;
    const checkIns = rows.map((c) => {
      // A check-in that isn't checked out yet doesn't count towards the hours.
      const spent = c.out === null ? null : c.out - c.in;
      ms += spent ?? 0;
      return {
        checkIn: formatTime(c.in),
        checkOut: c.out === null ? 'Not checked out' : formatTime(c.out),
        duration: spent === null ? '—' : formatDuration(spent),
        location: c.location,
      };
    });
    totalMs += ms;

    const item = { id: String(a.id), title: a.title, total: formatDuration(ms), checkIns };
    return { item, latest: rows[0]?.in ?? 0 };
  });

  return {
    totalHours: formatHours(totalMs),
    // Most recently checked-in activity first.
    items: activities.sort((x, y) => y.latest - x.latest).map((a) => a.item),
  };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pad = (n: number) => String(n).padStart(2, '0');
const minutes = (ms: number) => Math.floor(ms / 60_000);

/** `02 Oct 2026, 13:22`, in the device's time zone. */
function formatTime(ms: number) {
  const d = new Date(ms);
  return `${pad(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** `0h 01m` */
function formatDuration(ms: number) {
  const m = minutes(ms);
  return `${Math.floor(m / 60)}h ${pad(m % 60)}m`;
}

/** `0:30` */
function formatHours(ms: number) {
  const m = minutes(ms);
  return `${Math.floor(m / 60)}:${pad(m % 60)}`;
}

// Last loaded value per query, so screens opened later render it straight away while it refreshes.
const cache = new Map<() => Promise<unknown>, unknown>();

function useRemote<T>(load: () => Promise<T>) {
  const [data, setData] = useState(() => cache.get(load) as T | undefined);
  const [error, setError] = useState<unknown>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let live = true;
    load().then(
      (value) => {
        cache.set(load, value);
        if (!live) return;
        setData(value);
        setError(null);
      },
      (e: unknown) => {
        if (live) setError(e);
      },
    );
    return () => {
      live = false;
    };
  }, [load, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);
  return { data, error, reload };
}

/** `null` when there is no `profiles` row for EXPO_PUBLIC_MEMBER_ID. */
export const useProfile = () => useRemote(fetchProfile);
export const useJourney = () => useRemote(fetchJourney);
