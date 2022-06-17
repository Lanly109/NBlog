import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import TagProps from '../type/TagProp';
import './MyTagStyle.less';

const App: React.FC<TagProps> = (tagProps) => {
    const { getTag, initTag } = tagProps;
    const [tag, setTag] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);
    const [loading, setLoading] = React.useState(true);
    const colorArr = ["magenta", "green", "cyan", "red", "blue", "orange", "geekblue", "volcano", "gold", "lime",];

    React.useEffect(() => {
        if (loading && initTag[0]!== '') {
            console.log("init tag")
            console.log(initTag)
            setTag(tag? initTag : ['默认标签']);
            setLoading(false);
        }
    }, [initTag]);

    React.useEffect(() => {
        if (!loading) {
            getTag({ tag: tag });
        }
    }, [tag]);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);

    const handleClose = (removedTag: string) => {
        const newTag = tag.filter(tag => tag !== removedTag);
        console.log(newTag);
        setTag(newTag);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tag.indexOf(inputValue) === -1) {
            setTag([...tag, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
        const newTag = [...tag];
        newTag[editInputIndex] = editInputValue;
        setTag(newTag);
        setEditInputIndex(-1);
        setInputValue('');
    };

    return (
        <>
            {tag.map((tag, index) => {
                const selecedColor = colorArr[index % colorArr.length];
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
                        closable={index !== 0}
                        onClose={() => handleClose(tag)}
                        color={selecedColor}
                    >
                        <span
                            onDoubleClick={e => {
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
                    <PlusOutlined />
                </Tag>
            )}
        </>
    );
};

export default App;