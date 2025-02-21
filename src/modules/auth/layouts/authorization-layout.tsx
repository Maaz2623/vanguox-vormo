export default async function AuthorizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen flex justify-center items-center">{children}</div>;
}
