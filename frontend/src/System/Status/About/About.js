import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import FieldSet from 'Components/FieldSet';
import InlineMarkdown from 'Components/Markdown/InlineMarkdown';
import titleCase from 'Utilities/String/titleCase';
import translate from 'Utilities/String/translate';
import StartTime from './StartTime';
import styles from './About.css';

class About extends Component {

  //
  // Render

  render() {
    const {
      version,
      packageVersion,
      packageAuthor,
      isNetCore,
      isMono,
      isDocker,
      runtimeVersion,
      migrationVersion,
      appData,
      startupPath,
      mode,
      startTime,
      timeFormat,
      longDateFormat
    } = this.props;

    return (
      <FieldSet legend={translate('About')}>
        <DescriptionList className={styles.descriptionList}>
          <DescriptionListItem
            title={translate('Version')}
            data={version}
          />

          {
            packageVersion &&
              <DescriptionListItem
                title={translate('PackageVersion')}
                data={(packageAuthor ? <span> {packageVersion} {' by '} <InlineMarkdown data={packageAuthor} /> </span> : packageVersion)}
              />
          }

          {
            isMono &&
              <DescriptionListItem
                title={translate('MonoVersion')}
                data={runtimeVersion}
              />
          }

          {
            isNetCore &&
              <DescriptionListItem
                title={translate('NetCore')}
                data={'Yes'}
              />
          }

          {
            isDocker &&
              <DescriptionListItem
                title={translate('Docker')}
                data={'Yes'}
              />
          }

          <DescriptionListItem
            title={translate('DbMigration')}
            data={migrationVersion}
          />

          <DescriptionListItem
            title={translate('AppDataDirectory')}
            data={appData}
          />

          <DescriptionListItem
            title={translate('StartupDirectory')}
            data={startupPath}
          />

          <DescriptionListItem
            title={translate('Mode')}
            data={titleCase(mode)}
          />

          <DescriptionListItem
            title={translate('Uptime')}
            data={
              <StartTime
                startTime={startTime}
                timeFormat={timeFormat}
                longDateFormat={longDateFormat}
              />
            }
          />
        </DescriptionList>
      </FieldSet>
    );
  }

}

About.propTypes = {
  version: PropTypes.string.isRequired,
  packageVersion: PropTypes.string,
  packageAuthor: PropTypes.string,
  isNetCore: PropTypes.bool.isRequired,
  isMono: PropTypes.bool.isRequired,
  runtimeVersion: PropTypes.string.isRequired,
  isDocker: PropTypes.bool.isRequired,
  migrationVersion: PropTypes.number.isRequired,
  appData: PropTypes.string.isRequired,
  startupPath: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  longDateFormat: PropTypes.string.isRequired
};

export default About;
