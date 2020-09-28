import React, {
  CSSProperties,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import QRCode from "qrcode";
import Head from "next/head";
import {
  AppBar,
  Box,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

const title = "Wi-Fi QR";

type Props = {};
const Page: FC<Props> = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const value = useMemo(() => `WIFI:T:WPA;S:${ssid};P:${password};;`, [
    ssid,
    password,
  ]);
  const url = useMemo(() => {
    if (typeof location === "undefined") return "https://";
    return `${location.origin}/api/qr?v=${encodeURIComponent(value)}`;
  }, [value]);
  const canvas = useRef<HTMLCanvasElement>();
  useEffect(() => {
    QRCode.toCanvas(canvas.current, value);
  }, [value]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>

      <AppBar position="static">
        <Typography variant="h4" component="h1" align="center">
          {title}
        </Typography>
      </AppBar>
      <Container component="main" maxWidth="sm">
        {/* input */}
        <Box component="section" mt={2}>
          <div>
            <TextField
              fullWidth={true}
              label="SSID"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth={true}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Box>
        {/* output */}
        <Box component="section" mt={2}>
          <div style={{ textAlign: "center" }}>
            <canvas ref={canvas} />
          </div>
          <div>
            <TextField
              fullWidth={true}
              label="URL"
              variant="outlined"
              type="url"
              InputProps={{ readOnly: true }}
              value={url}
              onFocus={(e) => e.target.select()}
            />
          </div>
        </Box>
      </Container>
    </>
  );
};
export default Page;
