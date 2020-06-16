import React, { Component } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import { HmiPermissions } from "./HmiPermissions";
import { FormatMessage } from "../messages/FormatMessage";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: '#1f1f1f',
      letterSpacing: '0.5px',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: '1.8rem',
    },
    paper: {
      borderRadius: '11px'
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
  const { children, classes } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <div>{children}</div>
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

class HmiPermissionDialog extends Component<IPermissionDialog> {
  handleClose = () => {
    this.props.switchDialog(false);
  };

  render() {
    const app = this.props.app;
    const dependencyApps = this.props.dependencyApps;

    return (
      <>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.props.open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <FormatMessage id={'hatters.hmi.permissions.dialog.title'} />
          </DialogTitle>
          <DialogContent dividers className={'hmi-permissions-dialog-content'}>
            {dependencyApps &&
              dependencyApps.map(depApp => {
                return (
                  <HmiPermissions
                    key={depApp.application.id}
                    appName={depApp.application.info.name}
                    permissions={depApp.application.permissions}
                  />
                );
              })}
            <HmiPermissions permissions={app.application.permissions} appName={app.application.info.name} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}
              style={{ fontSize: '1.4rem',
                color: 'white',
                backgroundColor: '#6297B1',
                borderRadius: '11px',
                width: '14rem',
                height: '4.8rem',
                margin: '1.5rem auto'
              }}
              color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

interface IPermissionDialog {
  open: boolean;
  app: HatApplication;
  dependencyApps?: HatApplication[];
  switchDialog: any;
}

export default HmiPermissionDialog;
