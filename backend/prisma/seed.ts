import { ContentStatus, PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../src/lib/auth/password";

const prisma = new PrismaClient();

async function seedAdminUser() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD?.trim();

  if (!email || !password) {
    return;
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: UserRole.ADMIN,
    },
    create: {
      email,
      passwordHash,
      role: UserRole.ADMIN,
    },
  });
}

async function seedPosts() {
  const posts = [
    {
      slug: "aggiornamento-servizi-territoriali",
      title: "Aggiornamento servizi territoriali",
      excerpt: "Nuova pianificazione settimanale dei servizi sul territorio.",
      content:
        "Sono state aggiornate le fasce operative dei servizi territoriali. Questa pagina e predisposta per mostrare contenuti reali gestiti da pannello.",
      category: "news",
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date("2026-03-01T09:00:00.000Z"),
      coverImage: null,
    },
    {
      slug: "incontro-volontari-protezione-civile",
      title: "Incontro volontari protezione civile",
      excerpt: "Sessione informativa per nuovi volontari e cittadini.",
      content:
        "Incontro introduttivo con panoramica attivita, ruoli e modalita di attivazione sul territorio. Testo di esempio per seed iniziale.",
      category: "eventi",
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date("2026-02-20T10:00:00.000Z"),
      coverImage: null,
    },
    {
      slug: "sportello-sociale-apertura",
      title: "Apertura sportello sociale",
      excerpt: "Nuovo punto di ascolto e orientamento ai servizi.",
      content:
        "Lo sportello sociale estende il supporto di prossimita con appuntamenti programmabili. Record seed in stato bozza.",
      category: "sociale",
      status: ContentStatus.DRAFT,
      publishedAt: null,
      coverImage: null,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
}

async function seedServices() {
  const services = [
    {
      slug: "trasporto-sanitario",
      title: "Trasporto sanitario",
      summary: "Trasferimenti programmati verso strutture sanitarie con supporto operativo dedicato.",
      description: "Trasferimenti programmati verso strutture sanitarie.",
      content:
        "Servizio dedicato a visite, dimissioni e trattamenti con pianificazione anticipata e coordinamento operativo.",
      category: "trasporto",
      prenotabile: true,
      icon: "ambulance",
    },
    {
      slug: "ambulatori-e-prevenzione",
      title: "Ambulatori e prevenzione",
      summary: "Prestazioni di base, prevenzione e campagne periodiche di controllo sul territorio.",
      description: "Prestazioni di base e iniziative di prevenzione.",
      content: "Attivita ambulatoriali e giornate periodiche dedicate a controllo e informazione sanitaria.",
      category: "sanitario",
      prenotabile: true,
      icon: "stethoscope",
    },
    {
      slug: "supporto-sociale",
      title: "Supporto sociale",
      summary: "Interventi di accompagnamento e prossimita per persone fragili e famiglie.",
      description: "Interventi di accompagnamento per persone fragili.",
      content: "Azioni coordinate con enti locali e rete territoriale per favorire accesso ai servizi.",
      category: "sociale",
      prenotabile: false,
      icon: "users",
    },
    {
      slug: "formazione-primo-soccorso",
      title: "Formazione primo soccorso",
      summary: "Corsi introduttivi e avanzati per cittadini, scuole, aziende e volontari.",
      description: "Corsi formativi per cittadini, scuole e aziende.",
      content: "Percorsi modulari con sessioni teoriche e pratiche, calibrati sul livello del gruppo partecipante.",
      category: "formazione",
      prenotabile: true,
      icon: "graduation-cap",
    },
    {
      slug: "supporto-protezione-civile",
      title: "Supporto protezione civile",
      summary: "Attivita operative in emergenze meteo, logistiche e territoriali.",
      description: "Interventi coordinati di protezione civile sul territorio.",
      content: "Squadre e mezzi attivabili in coordinamento con gli enti preposti per scenari di emergenza e supporto logistico.",
      category: "protezione-civile",
      prenotabile: false,
      icon: "shield",
    },
    {
      slug: "trasporto-sociale",
      title: "Trasporto sociale",
      summary: "Accompagnamento verso servizi essenziali e appuntamenti non sanitari.",
      description: "Trasporto di prossimita per persone con fragilita e bisogni di mobilita.",
      content: "Servizio programmabile orientato all'inclusione, con pianificazione settimanale e criteri di priorita.",
      category: "trasporto",
      prenotabile: true,
      icon: "route",
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
}

async function seedLocations() {
  const locations = [
    {
      slug: "sede-centrale",
      name: "Sede centrale",
      area: "Lucca centro",
      address: "Via principale 1, Lucca",
      phone: "+39 0583 000000",
      email: null,
      hours: "Lun-Sab 08:00-20:00",
      mapUrl: "https://maps.google.com/?q=Lucca",
      notes: "Punto di coordinamento servizi, centralino e accoglienza utenti.",
    },
    {
      slug: "sezione-nord",
      name: "Sezione Nord",
      area: "Area nord",
      address: "Via secondaria 25, Lucca",
      phone: "+39 0583 000101",
      email: null,
      hours: "Lun-Ven 09:00-18:00",
      mapUrl: "https://maps.google.com/?q=Lucca+nord",
      notes: "Supporto servizi sociali e attivita di prossimita.",
    },
    {
      slug: "sezione-est",
      name: "Sezione Est",
      area: "Area est",
      address: "Piazza civica 4, Capannori",
      phone: "+39 0583 000202",
      email: null,
      hours: "Lun-Sab 08:30-19:00",
      mapUrl: "https://maps.google.com/?q=Capannori",
      notes: "Punto operativo per trasporti programmati e orientamento.",
    },
    {
      slug: "sezione-valle",
      name: "Sezione Valle",
      area: "Media valle",
      address: "Via valle 12, Borgo a Mozzano",
      phone: "+39 0583 000303",
      email: null,
      hours: "Mar-Sab 09:00-17:30",
      mapUrl: "https://maps.google.com/?q=Borgo+a+Mozzano",
      notes: "Presidio locale per attivita con volontari e rete associativa.",
    },
  ];

  for (const location of locations) {
    await prisma.location.upsert({
      where: { slug: location.slug },
      update: location,
      create: location,
    });
  }
}

async function seedPages() {
  const pages = [
    {
      slug: "chi-siamo",
      title: "Chi siamo",
      content:
        "Pagina istituzionale con descrizione missione, organizzazione e aree operative. Contenuto seed sintetico.",
    },
    {
      slug: "protezione-civile",
      title: "Protezione civile",
      content:
        "Sezione dedicata alle attivita operative, moduli di intervento e coordinamento territoriale. Contenuto seed.",
    },
    {
      slug: "privacy",
      title: "Privacy",
      content:
        "Informativa privacy operativa da completare con i riferimenti ufficiali del titolare, le finalita del trattamento, le basi giuridiche, i tempi di conservazione e i diritti degli interessati prima della pubblicazione.",
    },
    {
      slug: "cookie-policy",
      title: "Cookie policy",
      content:
        "Cookie policy operativa da completare con l'elenco dei cookie tecnici e dei servizi terzi eventualmente utilizzati prima della pubblicazione.",
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    });
  }
}

async function main() {
  await seedAdminUser();
  await seedPosts();
  await seedServices();
  await seedLocations();
  await seedPages();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed", error);
    await prisma.$disconnect();
    process.exit(1);
  });
