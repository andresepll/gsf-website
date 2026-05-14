import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  referenceId: string;
  name?: string;
  subject: string;
  locale: "es" | "en";
};

const COPY = {
  es: {
    htmlLang: "es",
    preview: (ref: string) =>
      `Confirmación de su reporte ${ref} — Generadora San Felipe`,
    greeting: (name?: string) => `Hola${name ? ` ${name}` : ""},`,
    title: "Reporte recibido",
    intro:
      "Hemos recibido su reporte y un miembro de nuestro equipo lo revisará según los procedimientos de gestión de quejas y denuncias de Generadora San Felipe.",
    refLabel: "Código de referencia",
    refNote:
      "Guarde este código. Lo va a necesitar para hacer seguimiento de su reporte o si nos contacta por otro canal.",
    subjectLabel: "Asunto registrado",
    timelineTitle: "Plazos esperados",
    timeline1: "Acuse de recibo: ahora mismo (este correo).",
    timeline2: "Asignación a responsable: hasta 5 días hábiles.",
    timeline3:
      "Respuesta sustantiva: hasta 30 días hábiles, según la complejidad del caso.",
    contactTitle: "¿Más información?",
    contactBody:
      "Si tiene preguntas o información adicional, responda directamente a este correo. Su respuesta será dirigida al equipo de cumplimiento.",
    signOff: "Atentamente,",
    signOffName: "Equipo de Cumplimiento",
    signOffCompany: "Generadora San Felipe Limited Partnership",
  },
  en: {
    htmlLang: "en",
    preview: (ref: string) =>
      `Confirmation of your report ${ref} — Generadora San Felipe`,
    greeting: (name?: string) => `Hello${name ? ` ${name}` : ""},`,
    title: "Report received",
    intro:
      "We have received your report and a member of our team will review it according to the complaints and grievance management procedures of Generadora San Felipe.",
    refLabel: "Reference code",
    refNote:
      "Save this code. You will need it to follow up on your report or if you contact us through another channel.",
    subjectLabel: "Registered subject",
    timelineTitle: "Expected timelines",
    timeline1: "Acknowledgment: right now (this email).",
    timeline2: "Assignment to a case officer: within 5 business days.",
    timeline3:
      "Substantive response: within 30 business days, depending on the complexity of the case.",
    contactTitle: "Need to add information?",
    contactBody:
      "If you have questions or additional information, reply directly to this email. Your reply will be routed to the compliance team.",
    signOff: "Sincerely,",
    signOffName: "Compliance Team",
    signOffCompany: "Generadora San Felipe Limited Partnership",
  },
} as const;

export default function UserAcknowledgement({
  referenceId,
  name,
  subject,
  locale,
}: Props) {
  const c = COPY[locale];
  return (
    <Html lang={c.htmlLang}>
      <Head />
      <Preview>{c.preview(referenceId)}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>Generadora San Felipe</Heading>

          <Text style={greeting}>{c.greeting(name)}</Text>
          <Heading as="h2" style={h2}>
            {c.title}
          </Heading>
          <Text style={paragraph}>{c.intro}</Text>

          <Section style={refSection}>
            <Text style={refLabel}>{c.refLabel}</Text>
            <Text style={refValue}>{referenceId}</Text>
            <Text style={refNote}>{c.refNote}</Text>
          </Section>

          <Text style={subjectLabel}>{c.subjectLabel}</Text>
          <Text style={subjectValue}>{subject}</Text>

          <Hr style={hr} />

          <Heading as="h3" style={h3}>
            {c.timelineTitle}
          </Heading>
          <Text style={listItem}>• {c.timeline1}</Text>
          <Text style={listItem}>• {c.timeline2}</Text>
          <Text style={listItem}>• {c.timeline3}</Text>

          <Hr style={hr} />

          <Heading as="h3" style={h3}>
            {c.contactTitle}
          </Heading>
          <Text style={paragraph}>{c.contactBody}</Text>

          <Text style={signOff}>{c.signOff}</Text>
          <Text style={signOffName}>{c.signOffName}</Text>
          <Text style={signOffCompany}>{c.signOffCompany}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f3f4f6",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  padding: "32px 0",
};
const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 32px",
  maxWidth: "600px",
  borderRadius: "12px",
};
const h1 = {
  color: "#003865",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 24px",
  borderBottom: "2px solid #009B3A",
  paddingBottom: "16px",
};
const h2 = {
  color: "#003865",
  fontSize: "20px",
  fontWeight: "700",
  margin: "8px 0 16px",
};
const h3 = {
  color: "#003865",
  fontSize: "15px",
  fontWeight: "600",
  margin: "0 0 12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};
const greeting = {
  color: "#111827",
  fontSize: "15px",
  margin: "0 0 8px",
};
const paragraph = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};
const refSection = {
  backgroundColor: "#e6eef5",
  padding: "20px",
  borderRadius: "8px",
  margin: "24px 0",
  textAlign: "center" as const,
};
const refLabel = {
  color: "#3778ab",
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  margin: "0 0 8px",
};
const refValue = {
  color: "#003865",
  fontSize: "22px",
  fontWeight: "700",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
  margin: "0 0 8px",
};
const refNote = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "0",
};
const subjectLabel = {
  color: "#6b7280",
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  margin: "16px 0 4px",
};
const subjectValue = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 24px",
};
const listItem = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 6px",
};
const signOff = {
  color: "#374151",
  fontSize: "14px",
  margin: "32px 0 4px",
};
const signOffName = {
  color: "#003865",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};
const signOffCompany = {
  color: "#6b7280",
  fontSize: "13px",
  margin: "2px 0 0",
};
const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};
