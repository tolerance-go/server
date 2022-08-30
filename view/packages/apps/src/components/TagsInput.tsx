import { PlusOutlined } from '@ant-design/icons';
import { Input, InputRef, Tag, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './TagsInput.less';

const TagsInput = (props: {
  value?: string[];
  onChange?: (next: string[] | undefined) => void;
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = props.value?.filter((tag) => tag !== removedTag);
    props.onChange?.(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (
      inputValue &&
      (props.value ? props.value.indexOf(inputValue) === -1 : true)
    ) {
      const next = [...(props.value ?? []), inputValue];
      props.onChange?.(next);
    }

    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...(props.value ?? [])];
    newTags[editInputIndex] = editInputValue;
    setEditInputIndex(-1);
    setInputValue('');
  };

  return (
    <>
      {props.value?.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> 新标签
        </Tag>
      )}
    </>
  );
};

export default TagsInput;
