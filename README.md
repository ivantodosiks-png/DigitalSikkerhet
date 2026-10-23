# Digital Sikkerhet

En komplett lokal læringsplattform på norsk bokmål, bygget med React, TypeScript og Vite. Ingen database, backend, eksterne API-er eller ekte autentisering.

## Kjør lokalt

Node.js 22.12+ eller en nyere støttet LTS-versjon anbefales. Prosjektet er utviklet med Node.js 24.

```sh
npm ci
npm run dev
```

Åpne adressen Vite viser, normalt http://localhost:5173. Bruk samme adresse og port når du kommer tilbake: nettleserlagringen er knyttet til nettstedets origin.

Velg **Logg inn → Prøv med demoprofil**, eller opprett en egen lokal demoprofil med oppdiktede opplysninger.

```sh
npm run typecheck
npm run build
npm run preview
npm run test:domain
npm test
```

Nettlesertestene bruker installert Google Chrome via Playwright og starter forhåndsvisning av produksjonsbygget på port 4173. Kjør npm run build før npm test. Produksjonsvisningen unngår at utviklingsserverens automatiske omlasting avbryter testnavigasjon. Domenetestene krever ingen nettleser. Produksjonsfilene legges i `dist/`. Ved eventuell statisk hosting må ukjente stier omskrives til `index.html` for React Router.

## Funksjoner

- Forside, registrering, innlogging, oversikt, kurskatalog, kursleser, quiz, profil, innstillinger og 404-side.
- Tre moduler, ni fullstendige leksjoner og 18 quizspørsmål med forklaringer.
- Lokal passordøvelse, tre phishing-situasjoner og tre personvernvalg.
- Statistikk, aktivitet siste sju dager, læringsrekke, XP, nivåer og fem merker.
- Mørkt og lyst tema, redusert bevegelse, lokale læringsvarsler og mobilnavigasjon.
- Profilredigering, utlogging, nullstilling av fremgang og sletting av alle demodata med bekreftelse.
- Lokale skrifter og illustrasjoner laget med CSS og Lucide. Ingen bilde- eller fonttjeneste er nødvendig under bruk.

## Demokontoer og lagring

**Dette er ikke et sikkert kontosystem.** Passordfeltene demonstrerer validering, men passord blir aldri sendt til autentiseringssimulatoren, kontrollert, lagret eller hashet. En eksisterende lokal profil kan åpnes med e-postadressen og et vilkårlig demopassord på minst åtte tegn. Ikke bruk virkelige passord eller sensitive opplysninger. Andre som bruker samme nettleser, kan åpne demoprofilene.

Versjonert tilstand ligger i `localStorage` under `digital-sikkerhet:v1`, og valideres med Zod ved innlesing. Ugyldige eller ukjente versjoner gir en ny tom tilstand og et synlig varsel. Hvis lagring ikke er tilgjengelig, kan appen brukes i minnet og varsler om at fremgangen ikke blir bevart.

«Husk demoøkten» lagrer profil-ID i `localStorage`. Uten dette valget brukes `sessionStorage` til økten, mens profil og fremgang fortsatt lagres lokalt. Ingen autentiseringstoken lagres. Fremgangen er separat per profil; visningspreferanser gjelder nettleseren. Data synkroniseres ikke mellom enheter og slettes sammen med nettleserdata.

XP, nivåer, merker og prosenter rekonstrueres fra lagrede fullføringer og quizsvar. De lagres ikke som en separat, motstridende sannhet:

- En unik fullført leksjon gir **30 XP**.
- Første beståtte quiz i hver modul gir **100 XP**.
- Gjentatte fullføringer eller beståtte forsøk gir ikke flere XP.
- Maksimalt **570 XP** er tilgjengelig. Et nytt nivå starter for hver 150 XP.
- En quiz er bestått ved minst **70 %**. Med seks spørsmål trengs fem riktige.
- Kursmerket krever alle tre leksjoner **og** bestått quiz.
- Avbrutte quizer lagres ikke som resultater. Alle seks spørsmål må besvares og forsøket leveres.
- Læringsrekken teller påfølgende lokale kalenderdager med fullførte leksjoner eller quizer, fra i dag eller i går.

Passordøvelsen bruker bare komponentminne. Eksempler slettes når leksjonen forlates. Måleren er en forenklet illustrasjon, ikke en vurdering av reell passordsikkerhet.

## Arkitektur

| Mappe | Ansvar |
| --- | --- |
| `src/app` | Ruter, tema, sideoverganger og varsler |
| `src/pages` | Sidene i brukerreisen |
| `src/components` | Layout, shadcn/ui-mønstre med Radix, kurs, øvelser og quiz |
| `src/types` | Domenetyper |
| `src/data` | Kursinnhold, spørsmål og kriterier for merker |
| `src/services/auth.ts` | Passordfri simulering av demoprofiler |
| `src/services/persistence.ts` | `DataRepository`, versjonering og validering av nettleserlagring |
| `src/services/progress.ts` | Rene beregninger av quizresultater, fremgang, XP og aktivitet |
| `src/stores` | Zustand-handlinger og kobling mellom tjenestene og grensesnittet |
| `src/styles` | Tailwind CSS 4, designtokens og responsive stiler |
| `tests` | Domenetester og Playwright-tester av brukerreisen |

Supabase er **ikke installert eller koblet til**. Ved en senere integrasjon kan lagringsadapteren og autentiseringssimulatoren erstattes, og store-handlingene gjøres asynkrone med reelle laste- og feiltilstander. Kursinnhold, visningskomponenter og de rene progresjonsberegningene kan beholdes. Ekte autentisering, tilgangskontroll og servervalidering må da implementeres; lokal demo gir ingen sikkerhetsgrense mot endring av nettleserdata.

`components.json` konfigurerer shadcn/ui med Tailwind 4 og `@/`-alias. Button bruker CVA og Radix Slot; dialog og profilmeny bruker Radix for tastaturhåndtering og fokus. React Hook Form og Zod håndterer skjemaer. Motion, Sonner og Recharts er integrert i appen.

## Innholdskilder

Innholdet er skrevet for ungdom og viser oppdiktede situasjoner. Kursene lenker til videre lesing:

- [Nettvett: Sterke passord](https://nettvett.no/passord/)
- [Nettvett: Hva er phishing?](https://nettvett.no/phishing/)
- [Du bestemmer: Personvern](https://www.dubestemmer.no/larer/ungdom/personvern/?epslanguage=no)

## Avgrensninger

Dette er en ferdig lokal demo, ikke en publisert tjeneste. Ingen e-postbekreftelse, passordgjenoppretting, skysynkronisering, pushvarsler eller serverbasert vern mot manipulering er implementert. Disse funksjonene tilhører en fremtidig backend-integrasjon. Nettlesertestene dekker Chrome; Safari og Firefox er ikke kontrollert automatisk.

## Utført kontroll

- `npm run typecheck`: fullført uten TypeScript-feil.
- `npm run build`: produksjonsbygg fullført; Vite gir kun en anbefaling om oppdeling av den største JavaScript-pakken.
- `npm run test:domain`: 4 tester bestått.
- `npm test`: 13 tester bestått, inkludert to axe-kontroller av mørkt og lyst tema.
- Brukerreisen gjennom alle ni leksjoner og tre quizer, gjentatte quizforsøk, isolerte profiler, utlogging og gjenopptakelse er testet.
- Feilformatert og utilgjengelig lagring, bekreftet sletting, preferanser og mobilmeny med tastatur er testet.
- Ingen horisontal overflyt ved 390, 768 og 1440 piksler på de kontrollerte sidene. Ingen JavaScript-feil eller console.error i navigasjonstesten.

Automatiske tilgjengelighetstester er et supplement til manuell kontroll, ikke en garanti for full WCAG-samsvar.
