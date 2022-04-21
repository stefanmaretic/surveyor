import { Checkbox, Group, Radio, Stack, Text, TextInput } from "@mantine/core";
import { PropsWithChildren } from "react";
import { IFieldConfiguration } from "../types/IFieldConfiguration";

type PreviewProps = {
  fields: IFieldConfiguration[];
};

const ChoiceLabel = ({ children }: PropsWithChildren<{}>) => (
  <Text
    size="sm"
    weight={500}
    sx={(theme) => ({
      color: theme.colors.gray[8],
    })}
  >
    {children}
  </Text>
);

type MatchInputProps = {
  type: IFieldConfiguration["type"];
  label: string;
  choices?: string[];
};

const MatchInput = ({ type, ...props }: PropsWithChildren<MatchInputProps>) => {
  const { choices = [], label } = props;
  switch (type) {
    case "checkbox":
      return (
        <Stack>
          <ChoiceLabel>{label}</ChoiceLabel>
          <Group>
            {choices?.map((choice) => (
              <Checkbox key={choice} {...props} label={choice} />
            ))}
          </Group>
        </Stack>
      );
    case "radio":
      return (
        <Stack>
          <ChoiceLabel>{label}</ChoiceLabel>
          <Group>
            {choices?.map((choice) => (
              <Radio key={choice} value={choice} {...props} label={choice} />
            ))}
          </Group>
        </Stack>
      );
    case "text":
    default:
      return <TextInput {...props} />;
  }
};

export const Preview = ({ fields = [] }: PropsWithChildren<PreviewProps>) => {
  return (
    <Stack spacing="lg">
      {fields.map((field, idx) => (
        <Stack key={idx} spacing="xs">
          <MatchInput
            label={field.title || `Question #${idx + 1}`}
            type={field.type}
            choices={field.choices}
          />
          <Text size="xs" color="dimmed">
            {field.description}
          </Text>
        </Stack>
      ))}
    </Stack>
  );
};
