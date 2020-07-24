import { makeStyles } from '@material-ui/core/styles';
import colors from '../../colors';


const useStyles = makeStyles(theme => ({
    root  : {
        backgroundColor : colors['primary_color'],
        color: 'white',
        height : "100%",
        width : '100%',
        position : 'absolute',
        paddingRight: 5,
        paddingLeft: 5
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 10,
        color: '#fff',
      },
}));

export {useStyles};
