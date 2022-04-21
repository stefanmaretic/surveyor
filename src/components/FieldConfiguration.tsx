import { Box, Button, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { FormEvent, PropsWithChildren } from "react";
import { IFieldConfiguration } from "../types/IFieldConfiguration";
import { BsPlus } from "react-icons/bs";

export type FieldConfigurationProps = {
  field: IFieldConfiguration;
  onChange: (prop: keyof IFieldConfiguration, value: string) => void;
  onChangeChoice: (idx: number) => (evt: FormEvent<HTMLInputElement>) => void;
  onAddChoice: () => void;
};

export const FieldConfiguration = ({
  field,
  onChange,
  onChangeChoice,
  onAddChoice,
}: PropsWithChildren<FieldConfigurationProps>) => {
  const handleChange =
    (prop: keyof IFieldConfiguration) =>
    (evt: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(prop, evt.currentTarget.value);
    };

  const handleSelectChange =
    (prop: keyof IFieldConfiguration) =>
    (value: string | null = "") => {
      onChange(prop, value || "");
    };

  return (
    <Stack
      sx={(theme) => ({
        ":not(:last-child)": {
          borderBottom: `1px solid ${theme.colors.gray[3]}`,
          paddingBottom: theme.spacing.xl,
        },
      })}
    >
      <Select
        label="Type"
        data={[
          { value: "text", label: "Text" },
          { value: "radio", label: "Radio group", choices: [""] },
          {
            value: "checkbox",
            label: "Checkbox(es)",
            choices: [""],
          },
        ]}
        value={field.type}
        onChange={handleSelectChange("type")}
      />
      <TextInput
        label="Title"
        value={field.title}
        onChange={handleChange("title")}
      />
      <Textarea
        label="Description (optional)"
        value={field.description}
        onChange={handleChange("description")}
      />
      <Stack>
        {field.choices?.map((choice, idx) => (
          <TextInput
            key={idx}
            label={`Choice #${idx + 1}`}
            value={choice}
            onChange={onChangeChoice(idx)}
          />
        ))}
        {!!field.choices && (
          <Box>
            <Button size="sm" variant="light" compact onClick={onAddChoice}>
              <BsPlus />
              Add another choice
            </Button>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
