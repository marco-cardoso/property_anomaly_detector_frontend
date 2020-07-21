import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root  : {
        backgroundColor : '#0d0e0f',
        color: 'white',
        height : "100%",
        width : '100%',
        position : 'absolute',
        paddingRight: 5,
        paddingLeft: 5
    },
}));

export {useStyles};
