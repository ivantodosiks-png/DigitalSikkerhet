import type { Course } from '../types'

export const courses: Course[] = [
  {
    id: 'passord', title: 'Sterke passord og kontosikkerhet', shortTitle: 'Passord og kontosikkerhet',
    description: 'Gi kontoene dine en sterkere lås. Lær om gode passord, passordfraser og et ekstra lag med sikkerhet.',
    category: 'DITT DIGITALE FORSVAR', color: 'violet', minutes: 15,
    objectives: ['Lage lange, unike passord', 'Forstå passordfraser og passordbehandlere', 'Bruke tofaktorautentisering'],
    source: { title: 'Nettvett: Sterke passord', url: 'https://nettvett.no/passord/' },
    lessons: [
      {
        id: 'passord-1', title: 'En bedre nøkkel til nettlivet', minutes: 4,
        intro: 'Spillkontoen, bildene og meldingene dine har noe til felles: De er verdt å beskytte. Passordet er en av nøklene som holder andre ute.',
        sections: [
          { title: 'Én konto, én nøkkel', text: 'Hvis du bruker samme passord overalt, kan én datalekkasje åpne flere kontoer. Bruk et eget passord for hver tjeneste. E-posten er spesielt viktig: Den kan ofte brukes til å tilbakestille passordene dine andre steder.' },
          { title: 'Lengde slår forutsigbarhet', text: 'Et langt passord som er vanskelig å gjette, er et godt utgangspunkt. Sikt mot minst 16 tegn. Unngå navn, fødselsår, tastaturmønstre og vanlige uttrykk. «Sommer2026!» er fortsatt forutsigbart, selv med stor bokstav og utropstegn.' },
          { title: 'Når bør du bytte?', text: 'Bytt hvis passordet er avslørt, du har delt det, eller du mistenker at noen har brukt kontoen. Bytt også andre steder der du har gjenbrukt det. Et godt og unikt passord trenger ikke stadig byttes bare for å få en ny dato.' },
        ],
        takeaway: 'Et langt, unikt og uforutsigbart passord beskytter bedre enn et kort passord med pynt.',
      },
      {
        id: 'passord-2', title: 'Fra passord til passordfrase', minutes: 5,
        intro: 'Et passord må ikke se ut som tastaturkrøll. Flere tilfeldig valgte ord kan gi både lengde og en god huskeregel.',
        sections: [
          { title: 'Ord som ikke hører sammen', text: 'En passordfrase kan bestå av fem tilfeldig valgte ord, som «komet vaffel elg fløyel anker». Dette er bare et offentlig eksempel – ikke bruk det som ditt passord. Unngå sangtekster, kjente sitater og opplysninger fra profilen din.' },
          { title: 'La en passordbehandler hjelpe', text: 'En passordbehandler lager og lagrer ulike passord for deg. Du beskytter den med et sterkt hovedpassord og helst tofaktor. Ta vare på gjenopprettingsinformasjonen på et trygt sted. Ikke del hovedpassordet med venner.' },
        ],
        takeaway: 'Bruk en egen frase eller et generert passord for hver konto. Eksempler fra kurs er aldri hemmelige.',
        exercise: 'password',
      },
      {
        id: 'passord-3', title: 'Et ekstra lag med sikkerhet', minutes: 6,
        intro: 'Hva om noen likevel får tak i passordet? Tofaktorautentisering gjør at passordet alene ikke er nok.',
        sections: [
          { title: 'To forskjellige bevis', text: 'Du kombinerer noe du vet, som et passord, med noe du har, som en autentiseringsapp eller sikkerhetsnøkkel. To passord er ikke to forskjellige faktorer. Slå på tofaktor i sikkerhetsinnstillingene, særlig for e-post og sosiale medier.' },
          { title: 'Ikke godkjenn det du ikke startet', text: 'En uventet innloggingsforespørsel skal ikke godkjennes. Engangskoder kan også stjeles gjennom phishing. Sikkerhetsnøkler og riktig implementerte passnøkler beskytter bedre mot slike falske innloggingssider. SMS er ofte bedre enn bare passord, men har svakheter.' },
          { title: 'Planlegg for en mistet mobil', text: 'Lagre gjenopprettingskoder på et trygt sted, separat fra mobilen. Kodene er hemmelige. Undersøk hvordan tjenesten lar deg gjenopprette tilgang før mobilen blir borte. Logg ut enheter du ikke kjenner igjen.' },
        ],
        takeaway: 'Aktiver tofaktor, beskytt gjenopprettingskodene og avvis innlogginger du ikke selv har startet.',
      },
    ],
  },
  {
    id: 'phishing', title: 'Svindel og phishing', shortTitle: 'Svindel og phishing',
    description: 'Ikke la deg lure av en god forkledning. Lær å oppdage falske meldinger, mistenkelige lenker og digitale feller.',
    category: 'SE GJENNOM SVINDELEN', color: 'blue', minutes: 18,
    objectives: ['Oppdage forsøk på manipulering', 'Undersøke meldinger og nettadresser', 'Vite hva du gjør hvis du blir lurt'],
    source: { title: 'Nettvett: Hva er phishing?', url: 'https://nettvett.no/phishing/' },
    lessons: [
      {
        id: 'phishing-1', title: 'Når en melding har en skjult agenda', minutes: 5,
        intro: '«Kontoen din stenges om ti minutter!» Svindlere vil at du skal handle før du rekker å tenke.',
        sections: [
          { title: 'Hva er phishing?', text: 'Phishing er forsøk på å lure deg til å gi fra deg informasjon, betale eller installere noe. Avsenderen kan utgi seg for å være en bedrift, en skole eller en venn. Det kan skje på e-post, SMS, i spill og på sosiale medier.' },
          { title: 'Følelsene er verktøyet', text: 'Tidspress, frykt og fristende premier brukes for å senke garden din. Også hyggelige og feilfrie meldinger kan være svindel. Et kjent profilbilde eller navn beviser ikke hvem som står bak: Kontoen kan være overtatt.' },
          { title: 'Stopp og sjekk en annen vei', text: 'Får du en uventet forespørsel om penger eller koder? Ta en pause. Kontakt personen gjennom en kanal du allerede kjenner, eller åpne tjenestens app selv. Ikke bruk telefonnummeret som følger med en mistenkelig melding.' },
        ],
        takeaway: 'Tidspress er en grunn til å stoppe opp, ikke til å skynde seg.',
      },
      {
        id: 'phishing-2', title: 'Finn sporene i meldingen', minutes: 7,
        intro: 'Du trenger ikke være teknologiekspert for å undersøke en melding. Se på avsender, adresse og hva du blir bedt om.',
        sections: [
          { title: 'Se forbi visningsnavnet', text: 'Navnet «Kundeservice» kan hvem som helst bruke. Undersøk hele e-postadressen og nettadressen. Et ekstra ord eller en liten staveforskjell kan gjøre adressen til en helt annen. At meldingen inneholder navnet ditt, gjør den heller ikke automatisk ekte.' },
          { title: 'Hengelåsen er ingen garanti', text: 'HTTPS krypterer forbindelsen til nettstedet, men sier ikke at eieren er ærlig. En falsk nettside kan også ha HTTPS. Ikke åpne en lenke for å undersøke om den er trygg; gå heller direkte til den kjente tjenesten.' },
          { title: 'SMS og QR-koder', text: 'En SMS om en pakke kan be deg betale en liten avgift og deretter stjele kortinformasjon. QR-koder er også lenker og må vurderes på samme måte. Sjekk leveringen i appen du vanligvis bruker.' },
        ],
        takeaway: 'Kontroller handlingen gjennom en kjent app eller en adresse du kjenner fra før.',
        exercise: 'phishing',
      },
      {
        id: 'phishing-3', title: 'Hva om du allerede har klikket?', minutes: 6,
        intro: 'Alle kan bli lurt. Det viktigste er å reagere og be om hjelp, ikke å skjule det.',
        sections: [
          { title: 'Et klikk er ikke det samme som et tap', text: 'Lukk den mistenkelige siden. Hvis du bare åpnet en lenke, betyr det ikke automatisk at kontoen er overtatt. Ikke last ned noe eller gi fra deg mer informasjon. Oppdater nettleser og enhet. Søk hjelp hvis du installerte noe eller merker uvanlig aktivitet.' },
          { title: 'Sikre det som er berørt', text: 'Skrev du inn et passord? Gå til den ekte tjenesten, bytt passord, logg ut ukjente økter og slå på tofaktor. Bytt også der passordet er gjenbrukt. Har du delt kortinformasjon eller betalt, kontakt banken raskt via en kjent kanal.' },
          { title: 'Be om hjelp og dokumenter', text: 'Ta vare på meldinger og skjermbilder som dokumentasjon. Fortell en voksen du stoler på. Rapporter kontoen eller meldingen i tjenesten. Ved svindel kan politiet kontaktes. På en skoleenhet bør skolens IT-ansvarlige få beskjed.' },
        ],
        takeaway: 'Stopp kontakten, sikre kontoene og be om hjelp. Du trenger ikke ordne alt alene.',
      },
    ],
  },
  {
    id: 'personvern', title: 'Personvern og digitalt fotavtrykk', shortTitle: 'Personvern og digitale spor',
    description: 'Ta kontroll over det du deler. Forstå dine digitale spor og gjør personvern til en del av hverdagen.',
    category: 'DINE DATA. DINE VALG.', color: 'mint', minutes: 15,
    objectives: ['Kjenne igjen personopplysninger', 'Forstå aktive og passive digitale spor', 'Ta bevisste valg om deling og innstillinger'],
    source: { title: 'Du bestemmer: Personvern', url: 'https://www.dubestemmer.no/larer/ungdom/personvern/?epslanguage=no' },
    lessons: [
      {
        id: 'personvern-1', title: 'Det handler om deg', minutes: 4,
        intro: 'Personvern handler om muligheten til å ha et privatliv og innflytelse over opplysninger om deg. Det gjelder selv om du ikke har noe å skjule.',
        sections: [
          { title: 'Mer enn navn og adresse', text: 'Bilder, posisjon, telefonnummer, IP-adresse og opplysninger om hva du liker, kan være personopplysninger. Flere små opplysninger kan sammen avsløre mye. Helseopplysninger og andre særlig private forhold fortjener ekstra omtanke.' },
          { title: 'Hvem trenger å vite?', text: 'Spør hvorfor en app ber om tilgang. En kartapp trenger kanskje posisjonen mens du bruker den. En enkel lommelykt trenger vanligvis ikke kontaktlisten din. Gi bare tilgang som er nødvendig, og gå gjennom gamle tillatelser.' },
          { title: 'Beskytt de viktigste opplysningene', text: 'Ikke legg ut passord, engangskoder, identitetsdokumenter eller betalingsopplysninger. Tenk også før du deler skole, timeplan eller hvor du er alene. Du kan si nei til spørsmål som føles for private.' },
        ],
        takeaway: 'Du trenger ikke dele alt bare fordi et skjema eller en person spør.',
      },
      {
        id: 'personvern-2', title: 'Sporene du legger igjen', minutes: 5,
        intro: 'Et bilde du legger ut er et synlig spor. Nettstedene du besøker kan også registrere aktivitet uten at du skriver et innlegg.',
        sections: [
          { title: 'Aktive og passive spor', text: 'Aktive spor er ting du selv deler, som kommentarer og bilder. Passive spor oppstår gjennom bruk, som tekniske logger og registrering av klikk. Slike opplysninger kan brukes til statistikk, anbefalinger og tilpasset reklame.' },
          { title: 'Deling kan leve videre', text: 'Et innlegg kan kopieres eller tas skjermbilde av. Selv en privat gruppe gir ikke full kontroll over videre deling. Før du publiserer, tenk på hvem som kan se innholdet nå og hvordan det kan oppfattes senere.' },
          { title: 'Andre har også grenser', text: 'Spør før du deler bilder av venner. Respekter et nei, og ta ned innhold hvis noen ber deg om det. Hvis et uønsket bilde av deg spres, be om fjerning, bruk rapporteringsfunksjonen og få hjelp av en voksen du stoler på.' },
        ],
        takeaway: 'Tenk på både ditt eget og andres digitale fotavtrykk før du trykker «del».',
        exercise: 'privacy',
      },
      {
        id: 'personvern-3', title: 'En liten personvernsjekk', minutes: 6,
        intro: 'Noen få bevisste innstillinger kan gi deg bedre oversikt. Bruk denne sjekklisten neste gang du åpner en sosial app.',
        sections: [
          { title: 'Velg publikum', text: 'Se hvem som kan se innlegg, kontakte deg og tagge deg. Vurder privat profil og godkjenning av tagger. Gå gjennom følgerlisten. Privat profil begrenser tilgangen, men hindrer ikke mottakere i å kopiere innhold.' },
          { title: 'Del posisjon med omtanke', text: 'Slå av kontinuerlig posisjonsdeling hvis du ikke trenger den. Del eventuelt med noen få du stoler på og i et begrenset tidsrom. Et bilde kan også avsløre et sted gjennom bakgrunn, skilt eller metadata.' },
          { title: 'Rydd litt og ofte', text: 'Fjern apper du ikke bruker, kontroller kameratilgang og mikrofon, og se gjennom gamle innlegg. Velg bort unødvendig sporing der du kan. Privat nettlesermodus gjør deg ikke anonym for tjenester eller nettverket du bruker.' },
        ],
        takeaway: 'Personvern er en vane: velg publikum, begrens tilganger og ta en sjekk med jevne mellomrom.',
      },
    ],
  },
]
