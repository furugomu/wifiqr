import { QR } from "./qr";

type Props = {
  ssid: string;
  password: string;
};
export const Page = ({ ssid, password }: Props) => {
  return (
    <div>
      <h1 className="py-4 text-2xl font-bold text-center">
        Wi-Fi QR Generator
      </h1>
      <QR ssid={String(ssid || "")} password={String(password || "")} />
    </div>
  );
};
