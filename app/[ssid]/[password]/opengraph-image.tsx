/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import QRCode from "qrcode";

export const runtime = "edge";

type Props = {
  params: { ssid: string; password: string };
};
export default async function Image({ params }: Props) {
  const { ssid, password } = await params;
  const value = `WIFI:T:WPA;S:${ssid};P:${password};;`;
  const rawSvg = await QRCode.toString(value);
  // const dataUri = "data:image/svg+xml;base64," + btoa(rawSvg);
  const dataUri = "data:image/svg+xml;utf8," + rawSvg;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#eee",
          color: "#133",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "1em",
        }}
      >
        {/* text */}
        <div
          style={{ display: "flex", flexDirection: "column", fontSize: "2rem" }}
        >
          <dl
            style={{
              display: "flex",
              flexDirection: "column",

              lineHeight: "1.25em",
            }}
          >
            <dt>SSID</dt>
            <dd
              style={{
                paddingLeft: "0.5em",
                marginBottom: "1em",
                fontSize: "3rem",
              }}
            >
              {ssid}
            </dd>
            <dt>Password</dt>
            <dd style={{ paddingLeft: "0.5em", fontSize: "3rem" }}>
              {password}
            </dd>
          </dl>
        </div>

        {/* QR */}
        <p
          style={{
            backgroundColor: "#999",
          }}
        >
          <img src={dataUri} alt="QR code" width={512} height={512} />
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
