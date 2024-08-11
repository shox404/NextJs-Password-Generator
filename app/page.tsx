"use client";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Code,
  Slider,
  Switch,
} from "@nextui-org/react";

export default function Home() {
  const [password, setPassword] = useState<string>("");

  const [setting, setSetting] = useState<{
    length: number;
    upper: boolean;
    lower: boolean;
    number: boolean;
    symbol: boolean;
  }>({
    length: 10,
    upper: true,
    lower: true,
    number: true,
    symbol: false,
  });

  const abc: string = Array.from({ length: 26 }, (_, i) =>
    String.fromCodePoint(97 + i)
  ).join("");

  const parts: {
    upper: string;
    lower: string;
    number: string;
    symbol: string;
  } = {
    upper: abc.toUpperCase(),
    lower: abc.toLowerCase(),
    number: Array.from({ length: 10 }, (_, i) => i).join(""),
    symbol: "!@#$%^&*()_+-=[]{}|;:',./<>?`~",
  };

  const generate = () => {
    setPassword("");
    const characters = Object.entries(setting)
      .filter((i) => i.includes(true))
      .map(([key]) => parts[key as keyof typeof parts])
      .join("");
    for (let i = 0; i < setting.length; i++) {
      if (characters.length > 0) {
        setPassword(
          (p) => p + characters[Math.floor(Math.random() * characters.length)]
        );
      }
    }
  };

  const change = (key: string, value: any) =>
    setSetting((p) => ({ ...p, [key]: value }));

  return (
    <main className="flex justify-center items-center h-dvh">
      <Card className="w-96">
        <CardHeader>
          <h1 className="text-xl font-bold">Password Generator</h1>
        </CardHeader>
        <CardBody>
          <div className="p-2 bg-neutral-800 rounded-xl text-base text-center font-black">
            {password === "" ? "Click Generate" : password}
          </div>
          <div className="my-1">
            <p className="m-2">Length {setting.length}</p>
            <div className="p-3 my-2 bg-neutral-800 rounded-xl">
              <Slider
                color="warning"
                showSteps={true}
                step={2}
                minValue={4}
                maxValue={32}
                defaultValue={setting.length}
                onChange={(value: any) => change("length", value)}
              />
            </div>
          </div>
          <div>
            <p className="m-1">Settings</p>
            <div className="p-2 bg-neutral-800 rounded-xl flex justify-between items-center my-2">
              <b>Include Uppercase</b>
              <Switch
                size="sm"
                color="warning"
                defaultSelected={setting.upper}
                onClick={() => change("upper", !setting.upper)}
              />
            </div>
            <div className="p-2 bg-neutral-800 rounded-xl flex justify-between items-center my-2">
              <b>Include Lowercase</b>
              <Switch
                size="sm"
                color="warning"
                defaultSelected={setting.lower}
                onClick={() => change("lower", !setting.lower)}
              />
            </div>
            <div className="p-2 bg-neutral-800 rounded-xl flex justify-between items-center my-2">
              <b>Include Numbers</b>
              <Switch
                size="sm"
                color="warning"
                defaultSelected={setting.number}
                onClick={() => change("number", !setting.number)}
              />
            </div>
            <div className="p-2 bg-neutral-800 rounded-xl flex justify-between items-center my-2">
              <b>Include Symbols</b>
              <Switch
                size="sm"
                color="warning"
                defaultSelected={setting.symbol}
                onClick={() => change("symbol", !setting.symbol)}
              />
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button className="w-full" color="warning" onPress={generate}>
            Generate
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
