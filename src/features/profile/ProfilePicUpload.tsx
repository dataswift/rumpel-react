import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProfileDefaultAvatar from "../../components/Svgs/ProfileDefaultAvatar";
import { FileMetadataReq } from "@dataswift/hat-js/lib/interfaces/file.interface";
import { HatClientService } from "../../services/HatClientService";
import { fileReader } from "../../utils/fileReader";

export interface IFile extends File {
    preview: string;
    uploading: boolean;
    uploadSuccess: boolean;
    uploadFailed: boolean;
    pending: boolean;
}

type Props = {
    enabled?: boolean;
    currentImageSrc?: string;
    onLogoUploaded: Function;
}

export const ProfilePicUpload: React.FC<Props> = ({ currentImageSrc, enabled, onLogoUploaded }) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  
  const onDrop = useCallback((acceptedFiles : File[]) => {
    setUploading(true);
    setUploadFailed(false);

    setFiles(
      acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          uploading: false,
          uploadSuccess: false,
          uploadFailed: false,
          pending: true,
        })
      )
    );

    async function upload(file: File) {
      try {
        const fileMetadata: FileMetadataReq = {
          name: file.name,
          source: 'rumpel'
        };
        const fileByteArray = await fileReader(file);
        const resUpload = await HatClientService
          .getInstance()
          .uploadFile(fileMetadata, fileByteArray as ArrayBuffer, 'image/png');

        if (resUpload.parsedBody?.fileId) {
          await HatClientService
            .getInstance()
            .markFilesAsPublic(resUpload.parsedBody.fileId);

          const contentUrl = HatClientService
            .getInstance()
            .generateFileContentUrl(resUpload.parsedBody.fileId);

          setUploading(false);

          onLogoUploaded(contentUrl);
        }
      } catch (error) {
        setUploading(false);
        setUploadFailed(true);
      }
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      upload(acceptedFiles[0]);
    }
  }, [onLogoUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    disabled: !enabled,
    noDrag: true,
    noDragEventsBubbling: true,
    onDrop
  });

  const logo = files.map((file: IFile) => (
    <div key={file.name} className={'upload-logo-placeholder'}>
      <div className={'upload-logo-state'}>
        {uploading && (
          <i className={'material-icons logo-uploading'}>cloud_upload</i>
        )}
        {!uploading && uploadFailed && (
          <i className={'material-icons upload-failed'}>error_outline</i>
        )}
        {!uploading && !uploadFailed && (
          <i className={'material-icons upload-success'}>done</i>
        )}
      </div>
      <img className={'upload-logo-image-preview'} alt={'Screenshot preview'} src={file.preview} />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="upload-logo-container">
      <div {...getRootProps({ className: 'upload-logo-dropzone' })}>
        <input {...getInputProps()} />
        {(files && files.length > 0)
          ? <div>{logo}</div>
          : currentImageSrc
            ? (
              <div className={'upload-logo-placeholder'}>
                <img className={'upload-logo-image-preview'} alt={'Profile avatar'} src={currentImageSrc} />
              </div>
            )
            : <ProfileDefaultAvatar />
        }
      </div>
    </section>
  );
};
