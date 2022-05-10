# CoRide app :horse_racing:
Haaga-Helia ammattikorkeakoulun Mobiiliohjelmointikurssin lopputyö, kevät 2022. Työkaluina React Native & Expo (+ Google Firebase).
> Jasmin Lumme [@jazmc](https://github.com/jazmc)

### Alusta & käynnistä sovellus
```pwsh
$ npm install
$ npm start
```

## Käyttöohjeet
#### :bust_in_silhouette: Rekisteröityminen
- Luo käyttäjätili (sähköposti ja salasana). Annathan oikean, toimivan sähköpostiosoitteen, sillä sovellus pyytää sinua vahvistamaan sen rekisteröitymisen jälkeen.
- Jos et saanut tilin vahvistamiseen liittyvää sähköpostia, tarkista ensin roskapostikansio ja sitten tarvittaessa pyydä uusi linkki sovelluksen painikkeesta.
#### 	:unlock: Kirjautuminen
- Kun olet vahvistanut käyttäjätilisi sähköpostiin saamastasi linkistä, voit kirjautua sisään käyttäen sähköpostiosoitetta ja salasanaa.
- Jos unohdat salasanasi, voit palauttaa sen antamalla tiliisi liitetyn sähköpostiosoitteen.
#### 	:handshake: Liity tallille
- Jos käyttäjätiliäsi ei ole liitetty yhdellekään tallille, näet etusivulla kentän talliavainta varten. Voit käyttää alapuolella olevia demoavaimia kuvitteellisille talleille liittymiseen.
- Lisäksi voit aina liittyä uudelle tallille sivupalkin tallilistauksesta, joka aukeaa oikean yläkulman ikonia painamalla.
- **Demo-talliavaimet**: 
  - :key: _Demo Stables_: 
    - `1A2B-3C4D-5E6F`
  - :key: _Toka Riding_: 
    - `9F8E-7D6C-5B4A`

#### 	:house: Tallien hallinnointi
- Voit vaihtaa nykyistä tallia sivupalkista. Muut tallit, joille olet liittynyt, näkyvät osittain läpinäkyvänä listauksessa.
- Voit vaihtaa suosikkitallia painamalla tallia pitkään, tai näpäyttämällä tallin nimen vieressä olevaa sydänkuvaketta.
  - Suosikiksi valittu talli aukeaa automaattisesti nykyiseksi talliksi, kun sovellus avataan.

#### :hammer_and_wrench: Tilin toiminnot
- Voit vaihtaa kutsumanimeä ja sukunimeä profiilivalikosta.
- Uloskirjautuminen tapahtuu profiilivalikon nappia painamalla.
- Voit vaihtaa salasanaa painamalla "Tilin hallinta"-nappia profiilisivulla, ja tämän jälkeen "Lähetä salasanan vaihtolinkki" jolloin saat sähköpostiisi linkin salasanan vaihtoa varten.
