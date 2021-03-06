import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useTranslation} from 'react-i18next';
import {spacing} from "../theme/theme";

const useStyles = makeStyles(theme => ({
    imprintContent: {
        fontSize: '0.75em',
        lineHeight: 1.5
    },
    disableOverflow: {
        overflow: 'hidden',
        padding: spacing.l
    }
}));

export const Privacy = ({open, handleClose}) => {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth={'md'}>
            <DialogContent dividers className={classes.disableOverflow}>
                <b>Datenschutzerklärung</b>
            </DialogContent>
            <DialogContent dividers className={classes.imprintContent}>
                <h2>1. Datenschutz auf einen Blick</h2>
                <h3>Allgemeine Hinweise</h3> <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
                Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind
                alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema
                Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
                <h3>Datenerfassung auf dieser Website</h3> <p><strong>Wer ist verantwortlich für die Datenerfassung auf
                dieser Website?</strong></p> <p>Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p> <p><strong>Wie
                erfassen wir Ihre Daten?</strong></p> <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
                mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
                <p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                    IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder
                    Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website
                    betreten.</p> <p><strong>Wofür nutzen wir Ihre Daten?</strong></p> <p>Ein Teil der Daten wird
                erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur
                Analyse Ihres Nutzerverhaltens verwendet werden.</p> <p><strong>Welche Rechte haben Sie bezüglich Ihrer
                Daten?</strong></p> <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger
                und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die
                Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung
                erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie
                das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
                <p>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im
                    Impressum angegebenen Adresse an uns wenden.</p>
                <h3>Analyse-Tools und Tools von Drittanbietern</h3> <p>Beim Besuch dieser Website kann Ihr
                Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten
                Analyseprogrammen.</p> <p>Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der
                folgenden Datenschutzerklärung.</p>
                <h2>2. Hosting und Content Delivery Networks (CDN)</h2>
                <h3>Externes Hosting</h3> <p>Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die
                personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters
                gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
                Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website
                generiert werden, handeln.</p> <p>Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung
                gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse
                einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen
                professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).</p> <p>Unser Hoster wird Ihre Daten nur insoweit
                verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in
                Bezug auf diese Daten befolgen.</p>
                <p><strong>Abschluss eines Vertrages über Auftragsverarbeitung</strong></p> <p>Um die
                datenschutzkonforme Verarbeitung zu gewährleisten, haben wir einen Vertrag über Auftragsverarbeitung mit
                unserem Hoster geschlossen.</p>
                <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
                <h3>Datenschutz</h3> <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr
                ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p> <p>Wenn Sie diese Website benutzen,
                werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie
                persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir
                erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p> <p>Wir
                weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)
                Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
                nicht möglich.</p>
                <h3>Hinweis zur verantwortlichen Stelle</h3> <p>Die verantwortliche Stelle für die Datenverarbeitung auf
                dieser Website ist:</p> <p>Verantwortliche Stelle für die Erhebung, Verarbeitung und Nutzung Deiner
                personenbezogenen Daten im Sinne des Bundesdatenschutzgesetzes (BDSG) und der Datenschutz
                Grundverordnung (DSGVO) ist die Social Impact gGmbH, Schiffbauergasse 7, 14467 Potsdam, vertreten durch
                die Geschäftsführer Norbert Kunz, Jörg Fürstenberger oder Gabriela Spangenberg.<br/>
                <br/>
                Die Kontaktdaten unseres Datenschutz­beauftragten:<br/>
                <br/>
                Der Datenschutzbeauftragte der Social Impact gGmbH ist per Mail unter
                datenschutzbeauftragter@datenschutzexperte.de und per Telefon unter +49 89 2500 392 22<br/>
                zu erreichen.<br/>
                <br/>
                PROLIANCE GmbH / www.datenschutzexperte.de<br/>
                Datenschutzbeauftragter<br/>
                Leopoldstr. 21<br/>
                80802 München</p>

                <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit
                    anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen,
                    E-Mail-Adressen o. Ä.) entscheidet.</p>
                <h3>Gesetzlich vorgeschriebener Datenschutzbeauftragter</h3> <p>Wir haben für unser Unternehmen einen
                Datenschutzbeauftragten bestellt.</p>
                <p>Verantwortliche Stelle für die Erhebung, Verarbeitung und Nutzung Deiner personenbezogenen Daten im
                    Sinne des Bundesdatenschutzgesetzes (BDSG) und der Datenschutz Grundverordnung (DSGVO) ist die
                    Social Impact gGmbH, Schiffbauergasse 7, 14467 Potsdam, vertreten durch die Geschäftsführer Norbert
                    Kunz, Jörg Fürstenberger oder Gabriela Spangenberg.<br/>
                    <br/>
                    Die Kontaktdaten unseres Datenschutz­beauftragten:<br/>
                    <br/>
                    Der Datenschutzbeauftragte der Social Impact gGmbH ist per Mail unter
                    datenschutzbeauftragter@datenschutzexperte.de und per Telefon unter +49 89 2500 392 22<br/>
                    zu erreichen.<br/>
                    <br/>
                    PROLIANCE GmbH / www.datenschutzexperte.de<br/>
                    Datenschutzbeauftragter<br/>
                    Leopoldstr. 21<br/>
                    80802 München</p>

                <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3> <p>Viele Datenverarbeitungsvorgänge sind nur
                mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit
                widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum
                Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>
                <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21
                    DSGVO)</h3> <p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO
                ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN,
                GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF
                DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG
                BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE
                BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE
                SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN
                ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON
                RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p> <p>WERDEN IHRE PERSONENBEZOGENEN DATEN
                VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE
                VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES
                GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
                WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG
                VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p>
                <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3> <p>Im Falle von Verstößen gegen die DSGVO
                steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat
                ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das
                Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher
                Rechtsbehelfe.</p>
                <h3>Recht auf Datenübertragbarkeit</h3> <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
                Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten
                in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung
                der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar
                ist.</p>
                <h3>SSL- bzw. TLS-Verschlüsselung</h3> <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als
                Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
                daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol
                in Ihrer Browserzeile.</p> <p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten,
                die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
                <h3>Verschlüsselter Zahlungsverkehr auf dieser Website</h3> <p>Besteht nach dem Abschluss eines
                kostenpflichtigen Vertrags eine Verpflichtung, uns Ihre Zahlungsdaten (z. B. Kontonummer bei
                Einzugsermächtigung) zu übermitteln, werden diese Daten zur Zahlungsabwicklung benötigt.</p> <p>Der
                Zahlungsverkehr über die gängigen Zahlungsmittel (Visa/MasterCard, Lastschriftverfahren) erfolgt
                ausschließlich über eine verschlüsselte SSL- bzw. TLS-Verbindung. Eine verschlüsselte Verbindung
                erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem
                Schloss-Symbol in Ihrer Browserzeile.</p> <p>Bei verschlüsselter Kommunikation können Ihre
                Zahlungsdaten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
                <h3>Auskunft, Löschung und Berichtigung</h3> <p>Sie haben im Rahmen der geltenden gesetzlichen
                Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
                Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf
                Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene
                Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>
                <h3>Recht auf Einschränkung der Verarbeitung</h3> <p>Sie haben das Recht, die Einschränkung der
                Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der im
                Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in
                folgenden Fällen:</p>
                <ul>
                    <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
                        benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das
                        Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                    </li>
                    <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie
                        statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
                    </li>
                    <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung,
                        Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der
                        Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                    </li>
                    <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung
                        zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen
                        Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer
                        personenbezogenen Daten zu verlangen.
                    </li>
                </ul>
                <p>Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von
                    ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder
                    Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder
                    juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union
                    oder eines Mitgliedstaats verarbeitet werden.</p>
                <h2>4. Datenerfassung auf dieser Website</h2>
                <h3>Cookies</h3> <p>Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine
                Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die
                Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät
                gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies
                bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung
                durch Ihren Webbrowser erfolgt.</p> <p>Teilweise können auch Cookies von Drittunternehmen auf Ihrem
                Endgerät gespeichert werden, wenn Sie unsere Seite betreten (Third-Party-Cookies). Diese ermöglichen uns
                oder Ihnen die Nutzung bestimmter Dienstleistungen des Drittunternehmens (z.B. Cookies zur Abwicklung
                von Zahlungsdienstleistungen).</p> <p>Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind
                technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z.B. die
                Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies dienen dazu, das Nutzerverhalten
                auszuwerten oder Werbung anzuzeigen.</p> <p>Cookies, die zur Durchführung des elektronischen
                Kommunikationsvorgangs (notwendige Cookies) oder zur Bereitstellung bestimmter, von Ihnen erwünschter
                Funktionen (funktionale Cookies, z. B. für die Warenkorbfunktion) oder zur Optimierung der Webseite
                (z.B. Cookies zur Messung des Webpublikums) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1
                lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat
                ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten
                Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies abgefragt wurde,
                erfolgt die Speicherung der betreffenden Cookies ausschließlich auf Grundlage dieser Einwilligung (Art.
                6 Abs. 1 lit. a DSGVO); die Einwilligung ist jederzeit widerrufbar.</p> <p>Sie können Ihren Browser so
                einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall
                erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische
                Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die
                Funktionalität dieser Website eingeschränkt sein.</p> <p>Soweit Cookies von Drittunternehmen oder zu
                Analysezwecken eingesetzt werden, werden wir Sie hierüber im Rahmen dieser Datenschutzerklärung
                gesondert informieren und ggf. eine Einwilligung abfragen.</p>
                <h3>Server-Log-Dateien</h3> <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in
                so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
                <ul>
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                </ul>
                <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p> <p>Die
                Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat
                ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website
                – hierzu müssen die Server-Log-Files erfasst werden.</p>
                <h3>Registrierung auf dieser Website</h3> <p>Sie können sich auf dieser Website registrieren, um
                zusätzliche Funktionen auf der Seite zu nutzen. Die dazu eingegebenen Daten verwenden wir nur zum Zwecke
                der Nutzung des jeweiligen Angebotes oder Dienstes, für den Sie sich registriert haben. Die bei der
                Registrierung abgefragten Pflichtangaben müssen vollständig angegeben werden. Anderenfalls werden wir
                die Registrierung ablehnen.</p> <p>Für wichtige Änderungen etwa beim Angebotsumfang oder bei technisch
                notwendigen Änderungen nutzen wir die bei der Registrierung angegebene E-Mail-Adresse, um Sie auf diesem
                Wege zu informieren.</p> <p>Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt zum
                Zwecke der Durchführung des durch die Registrierung begründeten Nutzungsverhältnisses und ggf. zur
                Anbahnung weiterer Verträge (Art. 6 Abs. 1 lit. b DSGVO).</p> <p>Die bei der Registrierung erfassten
                Daten werden von uns gespeichert, solange Sie auf dieser Website registriert sind und werden
                anschließend gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt.</p>
                <h2>5. Soziale Medien</h2>
                <h3>Facebook Plugins (Like & Share-Button)</h3> <p>Auf dieser Website sind Plugins des sozialen
                Netzwerks Facebook integriert. Anbieter dieses Dienstes ist die Facebook Ireland Limited, 4 Grand Canal
                Square, Dublin 2, Irland. Die erfassten Daten werden nach Aussage von Facebook jedoch auch in die USA
                und in andere Drittländer übertragen.</p> <p>Die Facebook Plugins erkennen Sie an dem Facebook-Logo oder
                dem „Like-Button“ („Gefällt mir“) auf dieser Website. Eine Übersicht über die Facebook Plugins finden
                Sie hier: <a href="https://developers.facebook.com/docs/plugins/?locale=de_DE" target="_blank"
                             rel="noopener noreferrer">https://developers.facebook.com/docs/plugins/?locale=de_DE</a>.
            </p> <p>Wenn Sie diese Website besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser
                und dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer
                IP-Adresse diese Website besucht haben. Wenn Sie den Facebook „Like-Button“ anklicken während Sie in
                Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte dieser Website auf Ihrem Facebook-Profil
                verlinken. Dadurch kann Facebook den Besuch dieser Website Ihrem Benutzerkonto zuordnen. Wir weisen
                darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie
                deren Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der
                Datenschutzerklärung von Facebook unter: <a href="https://de-de.facebook.com/privacy/explanation"
                                                            target="_blank"
                                                            rel="noopener noreferrer">https://de-de.facebook.com/privacy/explanation</a>.
            </p> <p>Wenn Sie nicht wünschen, dass Facebook den Besuch dieser Website Ihrem Facebook-Nutzerkonto zuordnen
                kann, loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.</p> <p>Die Verwendung der Facebook
                Plugins erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes
                Interesse an einer möglichst umfangreichen Sichtbarkeit in den Sozialen Medien. Sofern eine
                entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von
                Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.</p>
                <h3>Twitter Plugin</h3> <p>Auf dieser Website sind Funktionen des Dienstes Twitter eingebunden. Diese
                Funktionen werden angeboten durch die Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA
                94103, USA. Durch das Benutzen von Twitter und der Funktion „Re-Tweet“ werden die von Ihnen besuchten
                Websites mit Ihrem Twitter-Account verknüpft und anderen Nutzern bekannt gegeben. Dabei werden auch
                Daten an Twitter übertragen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom
                Inhalt der übermittelten Daten sowie deren Nutzung durch Twitter erhalten. Weitere Informationen hierzu
                finden Sie in der Datenschutzerklärung von Twitter unter: <a href="https://twitter.com/de/privacy"
                                                                             target="_blank"
                                                                             rel="noopener noreferrer">https://twitter.com/de/privacy</a>.
            </p> <p>Die Verwendung des Twitter-Plugins erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
                Websitebetreiber hat ein berechtigtes Interesse an einer möglichst umfangreichen Sichtbarkeit in den
                Sozialen Medien. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
                ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit
                widerrufbar.</p> <p>Ihre Datenschutzeinstellungen bei Twitter können Sie in den Konto-Einstellungen
                unter <a href="https://twitter.com/account/settings" target="_blank"
                         rel="noopener noreferrer">https://twitter.com/account/settings</a> ändern.</p>
                <h3>Instagram Plugin</h3> <p>Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden.
                Diese Funktionen werden angeboten durch die Instagram Inc., 1601 Willow Road, Menlo Park, CA 94025, USA
                integriert.</p> <p>Wenn Sie in Ihrem Instagram-Account eingeloggt sind, können Sie durch Anklicken des
                Instagram-Buttons die Inhalte dieser Website mit Ihrem Instagram-Profil verlinken. Dadurch kann
                Instagram den Besuch dieser Website Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als
                Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch
                Instagram erhalten.</p> <p>Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1
                lit. f DSGVO. Der Webseitenbetreiber hat ein berechtigtes Interesse an einer möglichst umfangreichen
                Sichtbarkeit in den Sozialen Medien. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die
                Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit
                widerrufbar.</p> <p>Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von
                Instagram: <a href="https://instagram.com/about/legal/privacy/" target="_blank"
                              rel="noopener noreferrer">https://instagram.com/about/legal/privacy/</a>.</p>
                <h2>6. Plugins und Tools</h2>
                <h3>Google Web Fonts</h3> <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so
                genannte Web Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine
                Verbindung zu Servern von Google findet dabei nicht statt.</p> <p>Weitere Informationen zu Google Web
                Fonts finden Sie unter <a href="https://developers.google.com/fonts/faq" target="_blank"
                                          rel="noopener noreferrer">https://developers.google.com/fonts/faq</a> und in
                der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy?hl=de" target="_blank"
                                                        rel="noopener noreferrer">https://policies.google.com/privacy?hl=de</a>.
            </p>
                <h3>Google Maps</h3> <p>Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die
                Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.</p> <p>Zur Nutzung der
                Funktionen von Google Maps ist es notwendig, Ihre IP Adresse zu speichern. Diese Informationen werden in
                der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser
                Seite hat keinen Einfluss auf diese Datenübertragung.</p> <p>Die Nutzung von Google Maps erfolgt im
                Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit
                der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6
                Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die
                Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit
                widerrufbar.</p> <p>Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung
                von Google: <a href="https://policies.google.com/privacy?hl=de" target="_blank"
                               rel="noopener noreferrer">https://policies.google.com/privacy?hl=de</a>.</p>
                <h2>7. eCommerce und Zahlungsanbieter</h2>
                <h3>Verarbeiten von Daten (Kunden- und Vertragsdaten)</h3> <p>Wir erheben, verarbeiten und nutzen
                personenbezogene Daten nur, soweit sie für die Begründung, inhaltliche Ausgestaltung oder Änderung des
                Rechtsverhältnisses erforderlich sind (Bestandsdaten). Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit.
                b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen
                gestattet. Personenbezogene Daten über die Inanspruchnahme dieser Website (Nutzungsdaten) erheben,
                verarbeiten und nutzen wir nur, soweit dies erforderlich ist, um dem Nutzer die Inanspruchnahme des
                Dienstes zu ermöglichen oder abzurechnen.</p> <p>Die erhobenen Kundendaten werden nach Abschluss des
                Auftrags oder Beendigung der Geschäftsbeziehung gelöscht. Gesetzliche Aufbewahrungsfristen bleiben
                unberührt.</p>
                <h3>Datenübermittlung bei Vertragsschluss für Dienstleistungen und digitale Inhalte</h3> <p>Wir
                übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen der Vertragsabwicklung
                notwendig ist, etwa an das mit der Zahlungsabwicklung beauftragte Kreditinstitut.</p> <p>Eine
                weitergehende Übermittlung der Daten erfolgt nicht bzw. nur dann, wenn Sie der Übermittlung ausdrücklich
                zugestimmt haben. Eine Weitergabe Ihrer Daten an Dritte ohne ausdrückliche Einwilligung, etwa zu Zwecken
                der Werbung, erfolgt nicht.</p> <p>Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO,
                der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen
                gestattet.</p>
                <h3>PayPal</h3> <p>Auf dieser Website bieten wir u.a. die Bezahlung via PayPal an. Anbieter dieses
                Zahlungsdienstes ist die PayPal (Europe) S.à.r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449
                Luxembourg (im Folgenden „PayPal“).</p> <p>Wenn Sie die Bezahlung via PayPal auswählen, werden die von
                Ihnen eingegebenen Zahlungsdaten an PayPal übermittelt.</p> <p>Die Übermittlung Ihrer Daten an PayPal
                erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) und Art. 6 Abs. 1 lit. b DSGVO
                (Verarbeitung zur Erfüllung eines Vertrags). Sie haben die Möglichkeit, Ihre Einwilligung zur
                Datenverarbeitung jederzeit zu widerrufen. Ein Widerruf wirkt sich auf die Wirksamkeit von in der
                Vergangenheit liegenden Datenverarbeitungsvorgängen nicht aus.</p>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    {t('close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
