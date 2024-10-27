"use client";

import QRCode from "qrcode";
import { Input } from "@/components/ui/input";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MdShare } from "react-icons/md";

type Props = { ssid: string; password: string };
export const QR = ({ ssid: defaultSsid, password: defaultPassword }: Props) => {
  const [ssid, setSsid] = useState(defaultSsid);
  const [password, setPassword] = useState(defaultPassword);

  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const value = `WIFI:T:WPA;S:${ssid};P:${password};;`;
    QRCode.toCanvas(canvas.current, value);
  }, [ssid, password]);

  return (
    <main className="container max-w-[32rem] mx-auto px-4">
      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <Field label="SSID">
            <Input
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.currentTarget.value)}
            />
          </Field>
          <Field label="Password">
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Field>
        </section>

        <section className="flex justify-center">
          <canvas ref={canvas} />
        </section>

        <Share ssid={ssid} password={password} />
      </div>
    </main>
  );
};

type FieldProps = {
  label: string;
  children: React.ReactNode;
};
const Field = ({ label, children }: FieldProps) => {
  return (
    <label className="flex items-baseline">
      <span className="flex-1 basis-24">{label}</span>
      {children}
    </label>
  );
};

const buildUrl = (ssid: string, password: string) => {
  const base =
    typeof location === "undefined" ? "https://example.com" : location.href;
  const url = new URL(base);
  url.pathname = [ssid, password].map(encodeURIComponent).join("/");
  return url.toString();
};

const copy = (s: string) => {
  return navigator.clipboard.writeText(s);
};
const Share = ({ ssid, password }: Props) => {
  const url = buildUrl(ssid, password);
  const { toast } = useToast();
  const handleCopy = () => {
    copy(url);
    toast({ description: "Copied!" });
  };
  const disabled = !ssid || !password;
  return (
    <section>
      <div className="flex justify-between gap-2">
        <Input
          type="text"
          name="url"
          value={url}
          readOnly
          className="w-full"
          disabled={disabled}
          aria-label="Share URL"
        />
        <Button onClick={handleCopy} disabled={disabled}>
          <MdShare className="w-6 h-6" />
          Copy
        </Button>
      </div>
    </section>
  );
};
