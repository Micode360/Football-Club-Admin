interface alignProperties {
  children: React.ReactNode;
  style?: string;
}

export default function DashboardLayout({ children, style }: alignProperties) {
  return <div className={`flex flex-col ${style}`}>{children}</div>;
}
