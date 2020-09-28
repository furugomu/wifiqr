import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import Head from "next/head";

type Props = {};
const Page: FC<Props> = () => {
  const [ssid, setSsid] = useState("ssid");
  const [password, setPassword] = useState("pass");
  const value = useMemo(() => `WIFI:T:WPA;S:${ssid};P:${password};;`, [
    ssid,
    password,
  ]);
  const url = useMemo(() => {
    if (typeof location === "undefined") return "";
    return `${location.origin}/api/qr?v=${encodeURIComponent(value)}`;
  }, [value]);
  const canvas = useRef<HTMLCanvasElement>();
  useEffect(() => {
    QRCode.toCanvas(canvas.current, value);
  }, [value]);

  return (
    <>
      <Head>
        <title>wifi qr</title>
        <meta name="viewport" content="width=device-width" />
      </Head>

      <div>
        <p>
          <label>
            SSID:{" "}
            <input
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Password:{" "}
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </p>
        <section>
          <div>
            <canvas ref={canvas} />
          </div>
          <div>
            <input
              type="url"
              readOnly
              value={url}
              onFocus={(e) => e.target.select()}
            />
          </div>
        </section>
      </div>
    </>
  );
};
export default Page;
