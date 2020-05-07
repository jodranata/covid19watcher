import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';

const CustomTooltip = withStyles({
  tooltip: {
    maxWidth: '250px',
    fontSize: '0.8rem',
    whiteSpace: 'pre-line',
  },
})(Tooltip);

export default CustomTooltip;
