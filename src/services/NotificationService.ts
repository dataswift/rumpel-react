type NotificationResponse = {
  title: string;
  link?: string;
  description?: string[];
};

export const fetchNotification = async (): Promise<NotificationResponse | undefined> => {
  const response = await fetch('https://raw.githubusercontent.com/dataswift/windows/main/latest.json');
  if (response.ok) {
    const text = await response.text();
    return JSON.parse(text);
  }
};
