import { ContentStatus, PrismaClient, TransparencyStatus, UserRole } from "@prisma/client";
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

async function seedFaqs() {
  const faqs = [
    {
      slug: "come-prenotare-un-servizio",
      question: "Come prenoto un servizio?",
      answer:
        "La via piu rapida e partire dalla pagina Prenota servizi, dove trovi il percorso operativo e i riferimenti per avviare la richiesta.\n\nSe non sai ancora quale servizio ti serve, parti prima da Servizi per capire l'area corretta e poi torna alla prenotazione.",
      category: "servizi-e-prenotazioni",
      sortOrder: 10,
      isFeatured: true,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "cosa-preparare-prima-di-contattare",
      question: "Cosa devo preparare prima di contattarvi?",
      answer:
        "Tieni a portata di mano il motivo della richiesta, il luogo di partenza e arrivo, un recapito telefonico e, se serve, eventuali indicazioni utili per l'accompagnamento.\n\nQuesto riduce passaggi inutili e aiuta lo sportello a indirizzarti subito al canale corretto.",
      category: "servizi-e-prenotazioni",
      sortOrder: 20,
      isFeatured: false,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "serve-prima-un-contatto-o-una-prenotazione",
      question: "Prima devo scrivere o posso prenotare subito?",
      answer:
        "Per i servizi programmati conviene passare dalla prenotazione. Se invece hai un dubbio sul tipo di prestazione o sul punto di accesso, usa prima i contatti territoriali.\n\nLa pagina Servizi e la pagina Sedi e contatti sono pensate proprio per ridurre i passaggi a vuoto.",
      category: "servizi-e-prenotazioni",
      sortOrder: 30,
      isFeatured: false,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "quale-sede-devo-usare",
      question: "Come capisco quale sede devo usare?",
      answer:
        "Usa la sede centrale per informazioni generali e i punti territoriali quando la tua richiesta riguarda una zona precisa del territorio servito.\n\nSe hai un dubbio, la segreteria resta il primo riferimento per l'orientamento.",
      category: "sedi-e-contatti",
      sortOrder: 40,
      isFeatured: true,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "quali-contatti-devo-usare",
      question: "A chi scrivo per un'informazione rapida?",
      answer:
        "Per informazioni generali usa i recapiti istituzionali. Per esigenze operative usa la pagina Servizi o il contatto della sede di riferimento.\n\nQuesto evita che una richiesta amministrativa finisca su un canale pensato per i servizi.",
      category: "sedi-e-contatti",
      sortOrder: 50,
      isFeatured: false,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "come-diventare-volontario",
      question: "Come posso diventare volontario?",
      answer:
        "Parti dalla pagina Volontariato e formazione, dove trovi il percorso di ingresso, il primo orientamento e le informazioni base per candidarti.\n\nDopo il primo contatto, il team ti indica l'area piu adatta e i passi successivi.",
      category: "volontariato-e-formazione",
      sortOrder: 60,
      isFeatured: true,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "serve-una-formazione-iniziale",
      question: "Serve una formazione prima di iniziare?",
      answer:
        "Si. Il percorso prevede orientamento e formazione iniziale, cosi da capire ruoli, responsabilita e attivita disponibili.\n\nLe informazioni aggiornate sui percorsi formativi sono raccolte nella sezione dedicata al volontariato.",
      category: "volontariato-e-formazione",
      sortOrder: 70,
      isFeatured: false,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "come-sostenere-con-donazione",
      question: "Come posso sostenere l'associazione?",
      answer:
        "Puoi contribuire con una donazione diretta, con il 5x1000 oppure seguendo le iniziative dedicate al sostegno delle attivita territoriali.\n\nLa pagina Donazioni raccoglie i percorsi piu semplici da usare per cittadini e aziende.",
      category: "donazioni-e-5x1000",
      sortOrder: 80,
      isFeatured: true,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "a-cosa-serve-il-5x1000",
      question: "A cosa serve il 5x1000?",
      answer:
        "Il 5x1000 aiuta a sostenere mezzi, attrezzature, formazione e attivita di prossimita senza costi aggiuntivi per il contribuente.\n\nSe vuoi capire come destinare il tuo contributo, consulta la pagina Donazioni.",
      category: "donazioni-e-5x1000",
      sortOrder: 90,
      isFeatured: false,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "emergenza-come-devo-usare-il-sito",
      question: "Posso usare il sito per un'emergenza?",
      answer:
        "No. Il sito e pensato per orientamento, informazione e prenotazioni, non per gestire situazioni urgenti in tempo reale.\n\nIn caso di emergenza usa il canale di soccorso appropriato e i numeri di emergenza del territorio.",
      category: "emergenze-e-sito",
      sortOrder: 100,
      isFeatured: false,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: "dove-trovo-news-e-eventi",
      question: "Dove trovo gli aggiornamenti e gli eventi?",
      answer:
        "Le novita editoriali, le campagne e gli appuntamenti della comunita sono raccolti nella pagina News & Eventi.\n\nE il posto giusto per seguire iniziative pubbliche e aggiornamenti di servizio.",
      category: "emergenze-e-sito",
      sortOrder: 110,
      isFeatured: false,
      status: ContentStatus.PUBLISHED,
    },
  ];

  for (const faq of faqs) {
    await prisma.faq.upsert({
      where: { slug: faq.slug },
      update: faq,
      create: faq,
    });
  }
}

async function seedTransparency() {
  const categories = [
    {
      slug: "documenti-istituzionali",
      title: "Documenti istituzionali",
      description: "Statuto, atto costitutivo e documentazione fondativa dell'associazione.",
      sortOrder: 10,
    },
    {
      slug: "governance",
      title: "Governance",
      description: "Organi sociali, incarichi e struttura di governo dell'ente.",
      sortOrder: 20,
    },
    {
      slug: "runts",
      title: "RUNTS",
      description: "Dati identificativi e riferimenti di iscrizione al Registro Unico.",
      sortOrder: 30,
    },
    {
      slug: "bilanci-rendiconti",
      title: "Bilanci e rendiconti",
      description: "Bilanci, rendiconti per cassa e documenti economico-finanziari.",
      sortOrder: 40,
    },
    {
      slug: "bilancio-sociale",
      title: "Bilancio sociale",
      description: "Rendicontazione sociale e impatto delle attivita associative.",
      sortOrder: 50,
    },
    {
      slug: "contributi-pubblici",
      title: "Contributi pubblici e liberalita",
      description: "Contributi pubblici, erogazioni liberali e 5x1000.",
      sortOrder: 60,
    },
    {
      slug: "regolamenti",
      title: "Regolamenti",
      description: "Regolamenti interni e documentazione di funzionamento.",
      sortOrder: 70,
    },
    {
      slug: "documentazione-istituzionale",
      title: "Documentazione istituzionale",
      description: "Ulteriore documentazione istituzionale e materiali informativi ufficiali.",
      sortOrder: 80,
    },
  ];

  for (const category of categories) {
    await prisma.transparencyCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const categoryBySlug = new Map(
    (
      await prisma.transparencyCategory.findMany({
        select: {
          id: true,
          slug: true,
        },
      })
    ).map((category) => [category.slug, category.id]),
  );

  const items = [
    {
      slug: "statuto-vigente",
      title: "Statuto vigente",
      summary: "Versione vigente dello statuto associativo.",
      content:
        "Documento dimostrativo per la sezione Trasparenza. Sostituire con il file ufficiale approvato dall'ente.",
      categorySlug: "documenti-istituzionali",
      referenceYear: 2025,
      referenceDate: new Date("2025-05-20T00:00:00.000Z"),
      status: TransparencyStatus.PUBLISHED,
      publishedAt: new Date("2026-03-21T08:30:00.000Z"),
      featured: true,
      documentFormat: "TXT",
      document: {
        label: "Scarica statuto vigente",
        fileName: "statuto-vigente.txt",
        publicUrl: "/documents/transparency/statuto-vigente.txt",
        mimeType: "text/plain",
      },
    },
    {
      slug: "atto-costitutivo",
      title: "Atto costitutivo",
      summary: "Atto costitutivo dell'associazione.",
      content:
        "Documento dimostrativo per la sezione Trasparenza. Sostituire con l'atto costitutivo ufficiale.",
      categorySlug: "documenti-istituzionali",
      referenceYear: 1986,
      referenceDate: new Date("1986-04-12T00:00:00.000Z"),
      status: TransparencyStatus.PUBLISHED,
      publishedAt: new Date("2026-03-21T08:35:00.000Z"),
      featured: false,
      documentFormat: "TXT",
      document: {
        label: "Scarica atto costitutivo",
        fileName: "atto-costitutivo.txt",
        publicUrl: "/documents/transparency/atto-costitutivo.txt",
        mimeType: "text/plain",
      },
    },
    {
      slug: "organi-sociali-2026",
      title: "Organi sociali 2026",
      summary: "Composizione aggiornata degli organi sociali e dei principali incarichi.",
      content: "Elenco dimostrativo delle cariche associative aggiornate all'anno di riferimento.",
      categorySlug: "governance",
      referenceYear: 2026,
      referenceDate: new Date("2026-01-15T00:00:00.000Z"),
      status: TransparencyStatus.PUBLISHED,
      publishedAt: new Date("2026-03-21T08:40:00.000Z"),
      featured: true,
      documentFormat: "TXT",
      document: {
        label: "Scarica organi sociali 2026",
        fileName: "organi-sociali-2026.txt",
        publicUrl: "/documents/transparency/organi-sociali-2026.txt",
        mimeType: "text/plain",
      },
    },
    {
      slug: "dati-runts",
      title: "Dati RUNTS",
      summary: "Riferimenti di iscrizione e dati identificativi essenziali.",
      content: "Scheda dimostrativa dei dati pubblicati nella sezione RUNTS.",
      categorySlug: "runts",
      referenceYear: 2026,
      referenceDate: new Date("2026-02-01T00:00:00.000Z"),
      status: TransparencyStatus.PUBLISHED,
      publishedAt: new Date("2026-03-21T08:45:00.000Z"),
      featured: false,
      documentFormat: "TXT",
      document: {
        label: "Scarica scheda RUNTS",
        fileName: "dati-runts.txt",
        publicUrl: "/documents/transparency/dati-runts.txt",
        mimeType: "text/plain",
      },
    },
    {
      slug: "bilancio-2025",
      title: "Bilancio d'esercizio 2025",
      summary: "Bilancio d'esercizio con note introduttive e riferimenti di approvazione.",
      content: "Documento dimostrativo per la consultazione del bilancio annuale.",
      categorySlug: "bilanci-rendiconti",
      referenceYear: 2025,
      referenceDate: new Date("2025-12-31T00:00:00.000Z"),
      status: TransparencyStatus.PUBLISHED,
      publishedAt: new Date("2026-03-21T08:50:00.000Z"),
      featured: true,
      documentFormat: "TXT",
      document: {
        label: "Scarica bilancio 2025",
        fileName: "bilancio-2025.txt",
        publicUrl: "/documents/transparency/bilancio-2025.txt",
        mimeType: "text/plain",
      },
    },
    {
      slug: "bilancio-sociale-2025",
      title: "Bilancio sociale 2025",
      summary: "Sintesi dell'impatto sociale e delle principali attivita svolte.",
      content: "Documento dimostrativo per il bilancio sociale.",
      categorySlug: "bilancio-sociale",
      referenceYear: 2025,
      referenceDate: new Date("2025-12-31T00:00:00.000Z"),
      status: TransparencyStatus.PUBLISHED,
      publishedAt: new Date("2026-03-21T08:55:00.000Z"),
      featured: false,
      documentFormat: "TXT",
      document: {
        label: "Scarica bilancio sociale 2025",
        fileName: "bilancio-sociale-2025.txt",
        publicUrl: "/documents/transparency/bilancio-sociale-2025.txt",
        mimeType: "text/plain",
      },
    },
    {
      slug: "contributi-pubblici-2025",
      title: "Contributi pubblici e liberalita 2025",
      summary: "Quadro riepilogativo dei contributi pubblici e delle principali liberalita ricevute.",
      content: "Scheda dimostrativa per contributi pubblici, liberalita e 5x1000.",
      categorySlug: "contributi-pubblici",
      referenceYear: 2025,
      referenceDate: new Date("2025-12-31T00:00:00.000Z"),
      status: TransparencyStatus.PUBLISHED,
      publishedAt: new Date("2026-03-21T09:00:00.000Z"),
      featured: false,
      documentFormat: "TXT",
      document: {
        label: "Scarica contributi pubblici 2025",
        fileName: "contributi-pubblici-2025.txt",
        publicUrl: "/documents/transparency/contributi-pubblici-2025.txt",
        mimeType: "text/plain",
      },
    },
    {
      slug: "regolamento-volontari",
      title: "Regolamento volontari",
      summary: "Regole organizzative e linee di comportamento per l'attivita volontaria.",
      content: "Documento dimostrativo del regolamento interno dedicato ai volontari.",
      categorySlug: "regolamenti",
      referenceYear: 2026,
      referenceDate: new Date("2026-01-10T00:00:00.000Z"),
      status: TransparencyStatus.PUBLISHED,
      publishedAt: new Date("2026-03-21T09:05:00.000Z"),
      featured: false,
      documentFormat: "TXT",
      document: {
        label: "Scarica regolamento volontari",
        fileName: "regolamento-volontari.txt",
        publicUrl: "/documents/transparency/regolamento-volontari.txt",
        mimeType: "text/plain",
      },
    },
    {
      slug: "carta-documentazione-istituzionale",
      title: "Carta della documentazione istituzionale",
      summary: "Nota introduttiva ai documenti pubblicati e alle modalita di aggiornamento.",
      content: "Documento dimostrativo di accompagnamento alla sezione Trasparenza.",
      categorySlug: "documentazione-istituzionale",
      referenceYear: 2026,
      referenceDate: new Date("2026-03-01T00:00:00.000Z"),
      status: TransparencyStatus.PUBLISHED,
      publishedAt: new Date("2026-03-21T09:10:00.000Z"),
      featured: false,
      documentFormat: "TXT",
      document: {
        label: "Scarica nota introduttiva",
        fileName: "carta-documentazione-istituzionale.txt",
        publicUrl: "/documents/transparency/carta-documentazione-istituzionale.txt",
        mimeType: "text/plain",
      },
    },
  ];

  for (const item of items) {
    const categoryId = categoryBySlug.get(item.categorySlug);

    if (!categoryId) {
      throw new Error(`Missing transparency category for slug: ${item.categorySlug}`);
    }

    const { document, categorySlug, ...itemData } = item;

    const createdItem = await prisma.transparencyItem.upsert({
      where: { slug: item.slug },
      update: {
        ...itemData,
        categoryId,
      },
      create: {
        ...itemData,
        categoryId,
      },
    });

    await prisma.transparencyDocument.upsert({
      where: { publicUrl: document.publicUrl },
      update: {
        ...document,
        itemId: createdItem.id,
        isPrimary: true,
      },
      create: {
        ...document,
        itemId: createdItem.id,
        isPrimary: true,
      },
    });
  }
}

async function main() {
  await seedAdminUser();
  await seedPosts();
  await seedServices();
  await seedLocations();
  await seedPages();
  await seedFaqs();
  await seedTransparency();
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
