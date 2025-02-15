import React from 'react';
import Icon from 'Components/Icon';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import { icons, kinds } from 'Helpers/Props';
import {
  GrabbedHistoryData,
  HistoryData,
  HistoryEventType,
  MovieFileDeletedHistory,
} from 'typings/History';
import translate from 'Utilities/String/translate';
import styles from './HistoryEventTypeCell.css';

function getIconName(eventType: HistoryEventType, data: HistoryData) {
  switch (eventType) {
    case 'grabbed':
      return icons.DOWNLOADING;
    case 'movieFolderImported':
      return icons.DRIVE;
    case 'downloadFolderImported':
      return icons.DOWNLOADED;
    case 'downloadFailed':
      return icons.DOWNLOADING;
    case 'movieFileDeleted':
      return (data as MovieFileDeletedHistory).reason === 'MissingFromDisk'
        ? icons.FILE_MISSING
        : icons.DELETE;
    case 'movieFileRenamed':
      return icons.ORGANIZE;
    case 'downloadIgnored':
      return icons.IGNORE;
    default:
      return icons.UNKNOWN;
  }
}

function getIconKind(eventType: HistoryEventType) {
  switch (eventType) {
    case 'downloadFailed':
      return kinds.DANGER;
    default:
      return kinds.DEFAULT;
  }
}

function getTooltip(eventType: HistoryEventType, data: HistoryData) {
  switch (eventType) {
    case 'grabbed':
      return translate('MovieGrabbedTooltip', {
        indexer: (data as GrabbedHistoryData).indexer,
        downloadClient: (data as GrabbedHistoryData).downloadClient,
      });
    case 'movieFolderImported':
      return translate('MovieFolderImportedTooltip');
    case 'downloadFolderImported':
      return translate('MovieImportedTooltip');
    case 'downloadFailed':
      return translate('DownloadFailedMovieTooltip');
    case 'movieFileDeleted':
      return (data as MovieFileDeletedHistory).reason === 'MissingFromDisk'
        ? translate('MovieFileMissingTooltip')
        : translate('MovieFileDeletedTooltip');
    case 'movieFileRenamed':
      return translate('MovieFileRenamedTooltip');
    case 'downloadIgnored':
      return translate('DownloadIgnoredMovieTooltip');
    default:
      return translate('UnknownEventTooltip');
  }
}

interface HistoryEventTypeCellProps {
  eventType: HistoryEventType;
  data: HistoryData;
}

function HistoryEventTypeCell({ eventType, data }: HistoryEventTypeCellProps) {
  const iconName = getIconName(eventType, data);
  const iconKind = getIconKind(eventType);
  const tooltip = getTooltip(eventType, data);

  return (
    <TableRowCell className={styles.cell} title={tooltip}>
      <Icon name={iconName} kind={iconKind} />
    </TableRowCell>
  );
}

export default HistoryEventTypeCell;
