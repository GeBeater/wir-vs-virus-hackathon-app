import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {useTranslation} from 'react-i18next';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    container: {
        width: 80,
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
    },
    faqItem: {
        marginBottom: theme.spacing(2)
    }
}));

export const Privacy = ({open, handleClose}) => {
    const {t} = useTranslation();

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth={'md'}>
            <DialogContent dividers>
                <b>Datenschutz</b>
            </DialogContent>
            <DialogContent dividers>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habent enim et bene longam et satis litigiosam disputationem. A villa enim, credo, et: Si ibi te esse scissem, ad te ipse venissem. Sed hoc sane concedamus. <a href="http://loripsum.net/" target="_blank">Peccata paria.</a> Atque hoc loco similitudines eas, quibus illi uti solent, dissimillimas proferebas. <i>Duo Reges: constructio interrete.</i> Amicitiam autem adhibendam esse censent, quia sit ex eo genere, quae prosunt. </p>

                <p>Tu vero, inquam, ducas licet, si sequetur; <mark>Primum Theophrasti, Strato, physicum se voluit;</mark> <mark>Hoc sic expositum dissimile est superiori.</mark> Tu enim ista lenius, hic Stoicorum more nos vexat. <i>Si enim ad populum me vocas, eum.</i> Hoc etsi multimodis reprehendi potest, tamen accipio, quod dant. <a href="http://loripsum.net/" target="_blank">Perge porro;</a> <a href="http://loripsum.net/" target="_blank">Idem iste, inquam, de voluptate quid sentit?</a> </p>

                <p>Qui autem esse poteris, nisi te amor ipse ceperit? <b>Si qua in iis corrigere voluit, deteriora fecit.</b> Cuius etiam illi hortuli propinqui non memoriam solum mihi afferunt, sed ipsum videntur in conspectu meo ponere. <a href="http://loripsum.net/" target="_blank">Quippe: habes enim a rhetoribus;</a> </p>

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    {t('close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
