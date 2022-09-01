import { Avatar, Button, Space, Upload } from 'antd';

export const AvatarInput = ({
  value,
  onChange,
  action,
}: {
  action: string;
  value?: string;
  onChange?: (val: string) => void;
}) => {
  return (
    <Space direction="vertical" align="start">
      <div>
        <Avatar size={100} src={value}></Avatar>
      </div>
      <div>
        <Upload
          maxCount={1}
          accept="image/*"
          action={action}
          name="file"
          onChange={(info) => {
            // if (info.file.status !== 'uploading') {
            //   console.log(info.file, info.fileList);
            // }
            if (info.file.status === 'done') {
              onChange?.(info.file.response[0]);
            }
          }}
        >
          <Button>上传头像</Button>
        </Upload>
      </div>
    </Space>
  );
};
