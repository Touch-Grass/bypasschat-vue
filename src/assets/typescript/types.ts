import { Ref } from "vue";

// Utility types
export type Booleanish = boolean | "true" | "false";
export type Numberish = number | string;
export type Stringish = number | string;

// Prop types
export type UserData = Record<string, string | null>;
export type ChatType = Record<string, string>[];
export type TypeModalData = Ref<Record<string, boolean>>;
export type MessageData = Ref<Record<string, string>>;
export type ModalDataType = Record<string, boolean>;
export type ChatsRef = Ref<Record<string, string>[]>;
