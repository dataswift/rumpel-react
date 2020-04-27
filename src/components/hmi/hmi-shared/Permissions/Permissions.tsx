import React, { Component } from 'react';
import './Permissions.scss';
import { FormatMessage } from '../../../shared/FormatMessage/FormatMessage';
import { BundleStructure } from '@dataswift/hat-js/lib/interfaces/bundle.interface';

export class Permissions extends Component<IPermissionsProps> {
  static processPermissionRoles2(roles: Array<{ role: string; detail?: string }>): Array<JSX.Element> {
    return roles.map(role => {
      switch (role.role) {
        case 'namespaceread':
          return <FormatMessage id={`hatters.hmi.permissions.read`} values={{ name: role.detail }} />;
        case 'namespacewrite':
          return <FormatMessage id={`hatters.hmi.permissions.write`} values={{ name: role.detail }} />;
        case 'managefiles':
          return <FormatMessage id={`hatters.hmi.permissions.manageFiles`} values={{ name: role.detail }} />;
        case 'applicationmanage':
          return <FormatMessage id={`hatters.hmi.permissions.manageApplications`} values={{ name: role.detail }} />;
        case 'applicationlist':
          return <FormatMessage id={`hatters.hmi.permissions.listApplications`} />;
        case 'datadebit':
          return <FormatMessage id={`hatters.hmi.permissions.dataDebit`} values={{ 'data-debit': role.detail }} />;
        default:
          return <FormatMessage id={`hatters.hmi.permissions.unknown`} />;
      }
    });
  }

  render() {
    const permissionProps = this.props.permissions;
    const elements = Permissions.processPermissionRoles2(permissionProps.rolesGranted);

    return (
      <div>
        {elements && (
          <>
            <div className={'hmi-card-title'}>
              <FormatMessage id={`hatters.hmi.permissions.appAbleTo`} values={{ name: this.props.appName }} />
            </div>
            <ul className="instruction-list">
              {elements.map((value, index) => {
                return (
                  <li className="list-item" key={index}>
                    {value}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    );
  }
}

interface IPermissionsProps {
  appName: string;
  permissions: HatApplicationPermissions;
}

interface HatApplicationDataRequired {
  bundle: BundleStructure;
  startDate: string;
  endDate: string;
  rolling: boolean;
}

export interface HatApplicationPermissions {
  rolesGranted: { role: string; detail?: string }[];
  dataRequired?: HatApplicationDataRequired;
  dataRetrieved?: BundleStructure;
}
