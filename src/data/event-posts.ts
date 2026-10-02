// Posts written on the Upload screen. They only live for the session (there is no backend for posts).
import { useSyncExternalStore } from 'react';

import { EVENT_POSTS, type Post } from '@/data/cl';

let added: Record<string, Post[]> = {};
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function addEventPost(eventId: string, post: Post) {
  added = { ...added, [eventId]: [post, ...(added[eventId] ?? [])] };
  listeners.forEach((l) => l());
}

/** Newest first: this session's posts, then the ones from the screenshots. */
export function useEventPosts(eventId: string) {
  const snapshot = () => added[eventId];
  const mine = useSyncExternalStore(subscribe, snapshot, snapshot);
  return [...(mine ?? []), ...(EVENT_POSTS[eventId] ?? [])];
}
