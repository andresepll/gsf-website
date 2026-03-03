"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "en" | "es";

type Translations = typeof en;

const en = {
  nav: {
    project: "Project",
    sustainability: "Sustainability",
    contact: "Contact Us",
  },
  hero: {
    badge: "467MW Combined Cycle — Under Construction",
    headline1: "Efficient energy",
    headlineAccent: "powering",
    headline2: "the Dominican Republic",
    subtitle:
      "GSF-1 is a high-efficiency combined cycle plant delivering reliable, sustainable, and competitive power to the national grid — strengthening energy security for generations to come.",
    cta: "Contact Us",
    ctaSecondary: "Explore the Project",
    stat1value: "467",
    stat1unit: "MW",
    stat1label: "Net Capacity",
    stat2value: "64%",
    stat2label: "Thermal Efficiency",
    stat3value: "+$700M",
    stat3label: "Investment",
    turbineBadgeLabel: "GE Vernova",
    turbineBadgeValue: "7HA.02",
  },
  project: {
    tag: "The Project",
    title1: "World-class technology,",
    title2: "built for the future",
    subtitle:
      "The first power plant in the Caribbean and Central America to feature the GE Vernova 7HA.02 turbine — setting a new regional standard in efficiency and performance.",
    specConfig: "Configuration",
    specConfigVal: "Multi-shaft 1x1 Combined Cycle",
    specGas: "Gas Turbine",
    specGasVal: "GE Vernova 7HA.02",
    specSteam: "Steam Turbine",
    specSteamVal: "GE STF-A650",
    specPPA: "PPA Contract",
    specPPAVal: "400 MW",
    specNet: "Net Installed Capacity",
    specNetVal: "467 MW",
    specEfficiency: "Thermal Efficiency",
    specEfficiencyVal: "6,378 BTU/kWh (HHV)",
    locationTitle: "Strategic Location",
    locationValue: "Punta Caucedo, Boca Chica, Dominican Republic",
    locationGas: "Natural gas supplied via ENADOM storage & regasification",
    timelineTag: "Timeline",
    timelineTitle: "Project Milestones",
    tl1year: "2024",
    tl1quarter: "April",
    tl1title: "Notice to Proceed",
    tl1desc:
      "Formal start of the EPC contract, contractor mobilization, and beginning of major civil works.",
    tl2year: "2025",
    tl2quarter: "Jul — Dec",
    tl2title: "Major Equipment Arrival",
    tl2desc:
      "Reception of the GE Vernova 7HA.02 gas turbine, steam turbine, generators, and HRSG modules on site.",
    tl3year: "2026",
    tl3quarter: "November",
    tl3title: "First Fire & Commissioning",
    tl3desc:
      "Initial ignition of the gas turbine, functional testing, performance validation, and reliability run.",
    tl4year: "2027",
    tl4quarter: "May",
    tl4title: "Commercial Operation",
    tl4desc:
      "Official declaration of commercial operation, delivering 400 MW under PPA contract.",
    constructionTag: "Construction Progress",
    constructionTitle: "Current Images",
    constructionSubtitle:
      "Aerial views of the GSF-1 construction site showing the latest progress.",
    constructionDate: "March 2, 2026",
    impactTag: "Impact",
    impactTitle: "Strategic infrastructure for sustainable development",
    impactSubtitle:
      "Generadora San Felipe strengthens the Dominican Republic's energy security while driving economic competitiveness.",
    impact1title: "Energy Security",
    impact1desc:
      "Firm, dispatchable capacity available 24/7 — reducing structural energy deficit risk and providing critical backup for renewable integration.",
    impact2title: "Competitiveness",
    impact2desc:
      "Highly efficient generation that reduces the marginal cost of the electric system, contributing to tariff stability and economic predictability.",
    impact3title: "Local Development",
    impact3desc:
      "Multiplier effect on employment, productive linkages, and local development during both the construction and operational phases.",
  },
  sustainability: {
    tag: "Sustainability",
    title1: "Built under the highest",
    titleAccent: "environmental standards",
    subtitle:
      "Aligned with the country's energy transition and sustainable development goals, GSF-1 sets new benchmarks in efficient power generation.",
    envTitle: "Environmental Performance",
    env1title: "Lower Emissions per MWh",
    env1desc:
      "Significantly reduced emissions per megawatt-hour generated, thanks to high-efficiency combined cycle technology.",
    env2title: "Reduced Carbon Footprint",
    env2desc:
      "Measurably lower carbon footprint compared to conventional thermal generation technologies.",
    env3title: "Optimized Fuel Consumption",
    env3desc:
      "Maximized energy output with minimal environmental impact through best-in-class thermal efficiency.",
    env4title: "Regulatory Compliance",
    env4desc:
      "Strict adherence to national and international environmental standards and regulations.",
    transTitle: "Responsible Energy Transition",
    trans1title: "Natural Gas Transition",
    trans1desc:
      "Using natural gas as a transition fuel, contributing to a cleaner and more diversified energy matrix.",
    trans2title: "Renewable Enabler",
    trans2desc:
      "Facilitating greater renewable penetration by providing flexibility and stability to the electrical grid.",
    trans3title: "Future-Ready Infrastructure",
    trans3desc:
      "Infrastructure designed for future technological improvements, including potential integration with decarbonization solutions.",
    socialTitle: "Social Commitment & Local Development",
    socialDesc:
      "Direct and indirect job creation during construction and operations. Support for local suppliers and productive linkages, with transparent and responsible governance focused on long-term sustainability.",
    reportsTitle: "Sustainability Reports",
    report1: "Environmental Impact Study",
    report2: "Climate Change Assessment",
    report3: "Human Rights Evaluation",
    report4: "GHG Emissions Report",
    complaintsTitle: "Complaints & Grievance Mechanism",
    complaintsDesc:
      "We maintain a transparent and accessible channel for all complaints, grievances, and reports.",
    complaintsBtn: "Submit a Report",
  },
  locations: {
    tag: "Our Locations",
    title: "Where to Find Us",
    corporateLabel: "Corporate Office",
    corporateAddress: "Av. Gustavo Mejia Ricart #102, Suite 701\nPiantini, Sto. Dgo., Rep. Dom.",
    gsf1Label: "GSF-1",
    gsf1Address: "Calle Aurora Núm. 1, paraje Punta Caucedo\nAndrés Boca Chica, Sto. Dgo., Rep. Dom.",
    openMaps: "Open in Google Maps",
  },
  footer: {
    company: "Generadora San Felipe Limited Partnership",
    navTitle: "Navigation",
    resourcesTitle: "Resources",
    complaints: "Complaints & Grievances",
    epc: "EPC Contractor — TSK",
    contactTitle: "Contact",
    copyright: "All rights reserved.",
    sponsoredBy: "Sponsored by",
  },
  complaints: {
    back: "Back to Home",
    title: "Complaints & Grievance Mechanism",
    subtitle:
      "We are committed to maintaining a transparent and accessible channel for all complaints, grievances, and reports related to our operations.",
    typeLabel: "Type of Report",
    typeComplaint: "Complaint",
    typeGrievance: "Grievance",
    typeReport: "General Report",
    anonymous: "Submit anonymously",
    nameLabel: "Full Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    phoneLabel: "Phone (optional)",
    phonePlaceholder: "(809) 000-0000",
    subjectLabel: "Subject",
    subjectPlaceholder: "Brief summary of your report",
    descLabel: "Description",
    descPlaceholder:
      "Please provide as much detail as possible about the complaint, grievance, or report.",
    submit: "Submit Report",
    cancel: "Cancel",
    successTitle: "Report Submitted",
    successDesc:
      "Thank you for your submission. Our team will review your report and respond according to our grievance management procedures.",
    returnHome: "Return Home",
    submitAnother: "Submit Another",
  },
};

const es: Translations = {
  nav: {
    project: "Proyecto",
    sustainability: "Sostenibilidad",
    contact: "Contáctenos",
  },
  hero: {
    badge: "467MW Ciclo Combinado — En Construcción",
    headline1: "Energía eficiente que",
    headlineAccent: "impulsa",
    headline2: "la República Dominicana",
    subtitle:
      "GSF-1 es una central de ciclo combinado de alta eficiencia que aporta energía confiable, sostenible y competitiva al Sistema Eléctrico Nacional — fortaleciendo la seguridad energética para las generaciones venideras.",
    cta: "Contáctenos",
    ctaSecondary: "Explorar el Proyecto",
    stat1value: "467",
    stat1unit: "MW",
    stat1label: "Capacidad Neta",
    stat2value: "64%",
    stat2label: "Eficiencia Térmica",
    stat3value: "+$700M",
    stat3label: "Inversión",
    turbineBadgeLabel: "GE Vernova",
    turbineBadgeValue: "7HA.02",
  },
  project: {
    tag: "El Proyecto",
    title1: "Tecnología de clase mundial,",
    title2: "construida para el futuro",
    subtitle:
      "La primera central en el Caribe y Centroamérica en incorporar la turbina GE Vernova 7HA.02 — estableciendo un nuevo estándar regional en eficiencia y rendimiento.",
    specConfig: "Configuración",
    specConfigVal: "Ciclo Combinado Multi-shaft 1x1",
    specGas: "Turbina de Gas",
    specGasVal: "GE Vernova 7HA.02",
    specSteam: "Turbina de Vapor",
    specSteamVal: "GE STF-A650",
    specPPA: "Contrato PPA",
    specPPAVal: "400 MW",
    specNet: "Capacidad Neta Instalada",
    specNetVal: "467 MW",
    specEfficiency: "Eficiencia Térmica",
    specEfficiencyVal: "6,378 BTU/kWh (HHV)",
    locationTitle: "Ubicación Estratégica",
    locationValue: "Punta Caucedo, Boca Chica, República Dominicana",
    locationGas:
      "Abastecimiento de gas natural a través de almacenamiento y regasificación de ENADOM",
    timelineTag: "Cronograma",
    timelineTitle: "Hitos del Proyecto",
    tl1year: "2024",
    tl1quarter: "Abril",
    tl1title: "Aviso de Inicio",
    tl1desc:
      "Inicio formal del contrato EPC, movilización de contratistas y comienzo de obras civiles mayores.",
    tl2year: "2025",
    tl2quarter: "Jul — Dic",
    tl2title: "Llegada de Equipos Mayores",
    tl2desc:
      "Recepción de la turbina de gas GE Vernova 7HA.02, turbina de vapor, generadores y módulos del HRSG en sitio.",
    tl3year: "2026",
    tl3quarter: "Noviembre",
    tl3title: "Primer Fuego y Comisionamiento",
    tl3desc:
      "Encendido inicial de la turbina de gas, pruebas funcionales, validación de desempeño y prueba de confiabilidad.",
    tl4year: "2027",
    tl4quarter: "Mayo",
    tl4title: "Operación Comercial",
    tl4desc:
      "Declaratoria oficial de operación comercial, entregando 400 MW bajo contrato PPA.",
    constructionTag: "Avance de Construcción",
    constructionTitle: "Imágenes Actuales",
    constructionSubtitle:
      "Vistas aéreas del sitio de construcción de GSF-1 mostrando el avance más reciente.",
    constructionDate: "2 de marzo de 2026",
    impactTag: "Impacto",
    impactTitle:
      "Infraestructura estratégica para el desarrollo sostenible",
    impactSubtitle:
      "Generadora San Felipe fortalece la seguridad energética de la República Dominicana e impulsa la competitividad económica.",
    impact1title: "Seguridad Energética",
    impact1desc:
      "Capacidad firme y despachable 24/7 — reduciendo el riesgo estructural de déficit energético y proporcionando respaldo crítico para la integración de renovables.",
    impact2title: "Competitividad",
    impact2desc:
      "Generación altamente eficiente que reduce el costo marginal del sistema eléctrico, contribuyendo a la estabilidad tarifaria y previsibilidad económica.",
    impact3title: "Desarrollo Local",
    impact3desc:
      "Efecto multiplicador en empleo, encadenamientos productivos y desarrollo local durante las fases de construcción y operación.",
  },
  sustainability: {
    tag: "Sostenibilidad",
    title1: "Construida bajo los más altos",
    titleAccent: "estándares ambientales",
    subtitle:
      "Alineada con los objetivos de transición energética y desarrollo sostenible del país, GSF-1 establece nuevos referentes en generación eficiente.",
    envTitle: "Desempeño Ambiental",
    env1title: "Menores Emisiones por MWh",
    env1desc:
      "Emisiones significativamente menores por megavatio-hora generado, gracias a tecnología de ciclo combinado de alta eficiencia.",
    env2title: "Huella de Carbono Reducida",
    env2desc:
      "Huella de carbono mediblemente menor en comparación con tecnologías convencionales de generación térmica.",
    env3title: "Consumo de Combustible Optimizado",
    env3desc:
      "Máxima producción energética con mínimo impacto ambiental mediante eficiencia térmica de primera clase.",
    env4title: "Cumplimiento Regulatorio",
    env4desc:
      "Cumplimiento estricto de normativas ambientales nacionales e internacionales.",
    transTitle: "Transición Energética Responsable",
    trans1title: "Transición a Gas Natural",
    trans1desc:
      "Uso de gas natural como combustible de transición, contribuyendo a una matriz más limpia y diversificada.",
    trans2title: "Facilitador de Renovables",
    trans2desc:
      "Facilitando mayor penetración renovable al aportar flexibilidad y estabilidad a la red eléctrica.",
    trans3title: "Infraestructura Preparada para el Futuro",
    trans3desc:
      "Infraestructura diseñada para futuras mejoras tecnológicas, incluyendo potencial integración con soluciones de descarbonización.",
    socialTitle: "Compromiso Social y Desarrollo Local",
    socialDesc:
      "Generación de empleo directo e indirecto durante construcción y operación. Impulso a proveedores y encadenamientos productivos locales, con gobernanza transparente y responsable enfocada en la sostenibilidad a largo plazo.",
    reportsTitle: "Reportes de Sostenibilidad",
    report1: "Estudio de Impacto Ambiental",
    report2: "Evaluación de Cambio Climático",
    report3: "Evaluación de Derechos Humanos",
    report4: "Reporte de Emisiones GEI",
    complaintsTitle: "Canal de Quejas y Denuncias",
    complaintsDesc:
      "Mantenemos un canal transparente y accesible para todas las quejas, reclamos y denuncias.",
    complaintsBtn: "Enviar un Reporte",
  },
  locations: {
    tag: "Ubicaciones",
    title: "Dónde Encontrarnos",
    corporateLabel: "Oficina Corporativa",
    corporateAddress: "Av. Gustavo Mejia Ricart #102, Suite 701\nPiantini, Sto. Dgo., Rep. Dom.",
    gsf1Label: "GSF-1",
    gsf1Address: "Calle Aurora Núm. 1, paraje Punta Caucedo\nAndrés Boca Chica, Sto. Dgo., Rep. Dom.",
    openMaps: "Abrir en Google Maps",
  },
  footer: {
    company: "Generadora San Felipe Limited Partnership",
    navTitle: "Navegación",
    resourcesTitle: "Recursos",
    complaints: "Quejas y Denuncias",
    epc: "Contratista EPC — TSK",
    contactTitle: "Contacto",
    copyright: "Todos los derechos reservados.",
    sponsoredBy: "Patrocinado por",
  },
  complaints: {
    back: "Volver al Inicio",
    title: "Canal de Quejas y Denuncias",
    subtitle:
      "Estamos comprometidos a mantener un canal transparente y accesible para todas las quejas, reclamos y denuncias relacionadas con nuestras operaciones.",
    typeLabel: "Tipo de Reporte",
    typeComplaint: "Queja",
    typeGrievance: "Reclamo",
    typeReport: "Reporte General",
    anonymous: "Enviar de forma anónima",
    nameLabel: "Nombre Completo",
    namePlaceholder: "Su nombre",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "su@correo.com",
    phoneLabel: "Teléfono (opcional)",
    phonePlaceholder: "(809) 000-0000",
    subjectLabel: "Asunto",
    subjectPlaceholder: "Breve resumen de su reporte",
    descLabel: "Descripción",
    descPlaceholder:
      "Por favor proporcione el mayor detalle posible sobre la queja, reclamo o denuncia.",
    submit: "Enviar Reporte",
    cancel: "Cancelar",
    successTitle: "Reporte Enviado",
    successDesc:
      "Gracias por su envío. Nuestro equipo revisará su reporte y responderá según nuestros procedimientos de gestión de quejas.",
    returnHome: "Volver al Inicio",
    submitAnother: "Enviar Otro",
  },
};

const translations = { en, es };

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const I18nContext = createContext<I18nContextType>({
  locale: "es",
  setLocale: () => {},
  t: es,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");
  const t = translations[locale];

  const handleSetLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
