import { Paper, Typography } from "@mui/material";

export default function Home() {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, maxWidth: "md", mx: "auto", textAlign: "justify" }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ py: 2, textAlign: "left" }}
      >
        Gardenentials – Gestione intelligente e personale del giardino
      </Typography>
      <Typography variant="body1" sx={{ py: 1 }}>
        Gardenentials è un’app web pensata per chi ama il giardinaggio e
        desidera prendersi cura dei propri spazi verdi in modo semplice,
        ordinato e personale.
      </Typography>
      <Typography variant="body1" sx={{ py: 1 }}>
        Attraverso un’interfaccia intuitiva e funzionalità mirate, Gardenentials
        consente di gestire giardini e piante con grande dettaglio: dalla
        registrazione degli interventi come potature, concimazioni e
        trattamenti, fino alla creazione di schede tecniche generate tramite
        intelligenza artificiale.
      </Typography>
      <Typography variant="body1" sx={{ py: 1 }}>
        Ogni pianta può essere documentata con foto, annotazioni, misurazioni e
        uno storico completo delle attività svolte.
      </Typography>
      <Typography variant="body1" sx={{ py: 1 }}>
        La sezione meteo integrata aggiorna automaticamente le condizioni
        atmosferiche per ciascun giardino, mostrando previsioni, dati orari e
        allerte tradotte in italiano.
      </Typography>
      <Typography variant="body1" sx={{ py: 1 }}>
        Il diario fotografico permette di conservare momenti significativi
        legati alla crescita delle piante, mentre la sezione WikiGarden offre
        articoli tematici generati da AI e organizzati per categoria, con
        possibilità di ricerca e contributo.
      </Typography>
      <Typography variant="body1" sx={{ py: 1 }}>
        Il progetto è stato sviluppato interamente da me, con attenzione
        all’esperienza utente, alla modularità e all’integrazione con API
        gratuite.
      </Typography>
      <Typography variant="body1" sx={{ py: 1 }}>
        Ogni funzionalità è pensata per offrire uno strumento utile e piacevole
        a chi coltiva il proprio giardino con passione, senza fronzoli o
        distrazioni.
      </Typography>
      <Typography variant="body1" sx={{ py: 1 }}>
        Gardenentials nasce per chi ama il verde e desidera un compagno digitale
        discreto e affidabile. Un luogo dove ogni pianta ha la sua storia, ogni
        intervento trova spazio, e ogni giardino diventa un racconto personale.
      </Typography>
    </Paper>
  );
}
