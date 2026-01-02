# iOS Deployment via Codemagic → TestFlight

## Förutsättningar

- ✅ Apple Developer Account ($99/år)
- ✅ GitHub-konto anslutet till Lovable
- ✅ Codemagic-konto (gratis att starta)

## Steg-för-steg guide

### 1. Exportera till GitHub
1. I Lovable: Klicka **GitHub** → **Connect to GitHub**
2. Auktorisera och skapa ett nytt repo

### 2. Lägg till iOS-plattformen lokalt
```bash
# Klona repot
git clone <YOUR_GITHUB_REPO_URL>
cd <PROJECT_NAME>

# Installera beroenden
npm install

# Lägg till iOS-plattformen
npx cap add ios

# Bygg och synka
npm run build
npx cap sync ios

# Pusha iOS-mappen till GitHub
git add .
git commit -m "Add iOS platform"
git push
```

### 3. Konfigurera Codemagic

1. Gå till [codemagic.io](https://codemagic.io) och logga in
2. Klicka **Add application** → Välj ditt GitHub-repo
3. Välj **Capacitor** som projekttyp
4. Codemagic hittar automatiskt `codemagic.yaml`

### 4. Skapa App Store Connect API-nyckel

1. Gå till [App Store Connect](https://appstoreconnect.apple.com)
2. **Users and Access** → **Integrations** → **App Store Connect API**
3. Klicka **Generate API Key**
   - Namn: `Codemagic`
   - Access: `Admin` eller `App Manager`
4. Ladda ner `.p8`-filen och spara:
   - **Issuer ID**
   - **Key ID**

### 5. Lägg till credentials i Codemagic

1. I Codemagic: **Teams** → **Integrations** → **App Store Connect**
2. Klicka **Add** och fyll i:
   - **Issuer ID**
   - **Key ID**
   - Ladda upp **.p8-filen**
3. Namnge integrationen: `CodeMagic` (måste matcha `codemagic.yaml`)

### 6. Konfigurera code signing

1. I samma **Integrations**-sektion, gå till **Code signing identities**
2. Codemagic kan automatiskt hantera certifikat via App Store Connect API
3. Alternativt: Ladda upp manuellt
   - Distribution Certificate (.p12)
   - Provisioning Profile (.mobileprovision)

### 7. Skapa appen i App Store Connect

1. Gå till [App Store Connect](https://appstoreconnect.apple.com) → **My Apps**
2. Klicka **+** → **New App**
3. Fyll i:
   - **Platform**: iOS
   - **Name**: Stugkoll
   - **Bundle ID**: `app.lovable.2150d111842e489ab3502a738d3e0e7d`
   - **SKU**: `stugkoll-1`

### 8. Trigga en build

1. I Codemagic: Klicka **Start new build**
2. Välj workflow: `ios-testflight`
3. Vänta ~15-20 minuter
4. När bygget är klart skickas appen automatiskt till TestFlight!

### 9. Bjud in testare

1. I App Store Connect → Din app → **TestFlight**
2. Lägg till testare via email
3. De får en inbjudan att ladda ner TestFlight-appen och din app

---

## Felsökning

### "No matching provisioning profile"
- Kontrollera att Bundle ID matchar i App Store Connect
- Verifiera att App Store Connect API har rätt behörigheter

### "Code signing error"
- Se till att Codemagic-integrationen heter exakt `CodeMagic`
- Kontrollera att certifikaten inte har gått ut

### Build timeout
- Öka `max_build_duration` i `codemagic.yaml`

---

## Nästa steg

- **Ändra appnamn?** Uppdatera `appName` i `capacitor.config.ts`
- **Byt Bundle ID?** Uppdatera i `capacitor.config.ts`, `codemagic.yaml`, och App Store Connect
- **Ta bort hot-reload för produktion?** Ta bort `server`-blocket i `capacitor.config.ts`
