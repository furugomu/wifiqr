import { Page } from "@/components/page";

type Props = {
  params: Promise<{ ssid: string; password: string }>;
};
export default async function Home({ params }: Props) {
  const { ssid, password } = await params;

  return <Page ssid={ssid || ""} password={password || ""} />;
}

export const generateMetadata = async ({ params }: Props) => {
  const { ssid } = await params;
  return {
    title: `Wi-Fi QR [${ssid}]`,
    description: `QR code for Wi-Fi network "${ssid}"`,
  };
};
