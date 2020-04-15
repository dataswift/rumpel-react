import React, { Component } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { FormatMessage } from '../FormatMessage/FormatMessage';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { Permissions } from '../../hmi/hmi-shared/Permissions/Permissions';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: '#4a556b',
      letterSpacing: '0.4px',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <div>{children}</div>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          {/*<CloseIcon />*/}
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
}))(MuiDialogActions);

class PermissionDialog extends Component<IPermissionDialog> {
  handleClose = () => {
    this.props.switchDialog(false);
  };

  render() {
    const app = this.props.app;
    const dependencyApps = this.props.dependencyApps;

    return (
      <div>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.props.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <FormatMessage id={'hatters.hmi.permissions.dialog.title'} />
          </DialogTitle>
          <DialogContent dividers>
            {dependencyApps &&
              dependencyApps.map((depApp) => {
                return (
                  <Permissions
                    key={depApp.application.id}
                    appName={depApp.application.info.name}
                    permissions={depApp.application.permissions}
                  />
                );
              })}
            <Permissions permissions={app.application.permissions} appName={app.application.info.name} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={{ fontSize: '1.4rem' }} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

interface IPermissionDialog {
  open: boolean;
  app: HatApplication;
  dependencyApps?: HatApplication[];
  switchDialog: any;
}

export default PermissionDialog;
