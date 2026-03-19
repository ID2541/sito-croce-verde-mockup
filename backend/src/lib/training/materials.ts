export type TrainingMaterial = {
  id: string;
  filename: string;
  mimeType: string;
  content: string;
};

const trainingMaterials: TrainingMaterial[] = [
  {
    id: "mat-psb-01",
    filename: "primo-soccorso-lezione-1.txt",
    mimeType: "text/plain",
    content: `Formazione Croce Verde - Primo Soccorso Base - Lezione 1

Argomenti:
- Catena del soccorso
- Sicurezza scena
- Chiamata 112`,
  },
  {
    id: "mat-psb-02",
    filename: "primo-soccorso-lezione-2.txt",
    mimeType: "text/plain",
    content: `Formazione Croce Verde - Primo Soccorso Base - Lezione 2

Argomenti:
- Valutazione primaria ABCDE
- Posizione laterale di sicurezza
- Supporto in attesa dei soccorsi`,
  },
  {
    id: "mat-blsd-01",
    filename: "blsd-lezione-1.txt",
    mimeType: "text/plain",
    content: `Formazione Croce Verde - BLSD - Lezione 1

Argomenti:
- Riconoscimento arresto cardiaco
- Compressioni toraciche
- Uso DAE`,
  },
  {
    id: "mat-blsd-02",
    filename: "blsd-lezione-2.txt",
    mimeType: "text/plain",
    content: `Formazione Croce Verde - BLSD - Lezione 2

Argomenti:
- Sequenze complete BLSD
- Simulazioni scenari
- Debriefing operativo`,
  },
  {
    id: "mat-log-01",
    filename: "logistica-lezione-1.txt",
    mimeType: "text/plain",
    content: `Formazione Croce Verde - Logistica - Lezione 1

Argomenti:
- Check pre-servizio
- Materiale bordo mezzo
- Verifica DPI`,
  },
  {
    id: "mat-log-02",
    filename: "logistica-lezione-2.txt",
    mimeType: "text/plain",
    content: `Formazione Croce Verde - Logistica - Lezione 2

Argomenti:
- Comunicazioni radio
- Procedure centrale operativa
- Passaggio consegne`,
  },
];

export function getTrainingMaterialById(id: string): TrainingMaterial | undefined {
  return trainingMaterials.find((material) => material.id === id);
}
