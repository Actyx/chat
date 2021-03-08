import { MouseEvent, FormEvent, ChangeEvent } from 'react';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>;

export type FormEventElement = FormEvent<HTMLFormElement>;

export type MouseEventButton = MouseEvent<HTMLButtonElement>;

export type MouseEventDiv = MouseEvent<HTMLDivElement>;
