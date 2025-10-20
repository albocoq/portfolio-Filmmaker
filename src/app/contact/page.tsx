import ContactTemplate from "@/components/ContactTemplate";

export default function ContactPage() {
  return (
    <main className="h-[calc(100vh-175px)] flex flex-col items-center justify-center gap-15 pt-20">
      <ContactTemplate
        title="send an email"
        description="sacha@apexfilms.com"
      />
      <ContactTemplate title="drop by" description="Málaga, Spain" />
      <ContactTemplate title="Phone us" description="+34 666 666 666" />
    </main>
  );
}
