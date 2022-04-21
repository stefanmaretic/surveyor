import { FormEvent, useState } from "react";
import {
  AppShell,
  Button,
  Divider,
  Grid,
  Header,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import { curry } from "ramda";
import { IFieldConfiguration } from "./types/IFieldConfiguration";
import { FieldConfiguration } from "./components/FieldConfiguration";
import { Preview } from "./components/Preview";
import produce from "immer";

const baseField: IFieldConfiguration = {
  type: "text",
  title: "",
  description: "",
};

function App() {
  const [fields, setFields] = useState<IFieldConfiguration[]>([baseField]);

  const handleChangeField = curry(
    (idx: number, prop: keyof IFieldConfiguration, value: string) => {
      setFields(
        produce((draft) => {
          draft[idx][prop] = value as any;
          if (
            prop === "type" &&
            (draft[idx]?.choices ?? []).length === 0 &&
            ["checkbox", "radio"].includes(value)
          ) {
            draft[idx].choices = ["Choice #1"];
          }
        })
      );
    }
  );

  const handleChangeChoice = curry(
    (i: number, j: number, evt: FormEvent<HTMLInputElement>) => {
      setFields(
        produce((draft) => {
          draft[i].choices![j] = evt.currentTarget.value;
        })
      );
    }
  );

  const handleAddField = () => {
    setFields([...fields, baseField]);
  };

  const handleAddChoice = curry((i: number) => {
    setFields(
      produce((draft) => {
        draft[i].choices!.push(`Choice ${draft[i].choices!.length + 1}`);
      })
    );
  });

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <></>
        </Header>
      }
    >
      <Grid gutter="xl">
        <Grid.Col span={6}>
          <Title
            order={2}
            sx={(theme) => ({
              color: theme.colors.gray[8],
            })}
          >
            Fields configuration
          </Title>
          <Space h="md" />
          <Stack>
            {fields.map((field, idx) => (
              <FieldConfiguration
                key={idx}
                field={field}
                onChange={handleChangeField(idx)}
                onChangeChoice={handleChangeChoice(idx)}
                onAddChoice={() => handleAddChoice(idx)}
              />
            ))}
          </Stack>
          <Space h="lg" />
          <Divider />
          <Space h="lg" />
          <Button onClick={handleAddField}>Add another field</Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title
            order={2}
            sx={(theme) => ({
              color: theme.colors.gray[8],
            })}
          >
            Preview
          </Title>
          <Space h="md" />
          <Preview fields={fields} />
        </Grid.Col>
      </Grid>
    </AppShell>
  );
}

export default App;
