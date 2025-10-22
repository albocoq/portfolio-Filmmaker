import ContactTemplate from "@/components/ContactTemplate";

export default function ContactPage() {
  return (
    <main className="h-[calc(100vh-175px)] flex flex-col items-center justify-center gap-15 pt-20">
      <ContactTemplate
        title="send an email"
        description="sachafilms1@gmail.com"
        index={1}
      />
      <ContactTemplate title="drop by" description="Málaga, Spain" index={2} />
      <ContactTemplate
        title="Phone us"
        description="+34 640 32 25 57"
        index={3}
      />
    </main>
  );
}
