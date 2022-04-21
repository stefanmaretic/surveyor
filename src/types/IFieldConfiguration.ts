export interface IFieldConfiguration {
  type: "text" | "checkbox" | "radio" | "select";
  title: string;
  description?: string;
  choices?: string[];
}
