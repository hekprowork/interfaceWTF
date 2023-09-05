import { writable } from "svelte/store";

export const subjectHighlight = writable({});

export const dateHighlight = writable(0);

export const worksSort = writable(new Map());