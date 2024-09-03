import { useState } from 'react';
import { toast } from 'react-toastify';

type File = {
    name: string;
    size: number;
    type: string;
    // Add any other properties you need
};

type ResponseMessage = {
    type: string;
    message: string;
    isVisible: boolean;
};

const useFileUpload = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [responseMessage, setResponseMessage] = useState<ResponseMessage>({
        type: '',
        message: '',
        isVisible: false,
    });
    const [isChatEnabled, setChatEnabled] = useState<boolean>(false);
    const notifyError = (message: string) => toast.error(message);

    const handleChange = (fileOrFiles: any) => {
        if (Object.keys(fileOrFiles).length>0) {
            setFiles((prevFiles) => [...prevFiles, ...fileOrFiles]);
        }
        else {
            setFiles([fileOrFiles])
        }
    };

    const onDrop = (fileOrFiles: File | File[]) => {
        console.log("drop", fileOrFiles);
    };

    const onSelect = (fileOrFiles: File | File[]) => {
        setChatEnabled(false);
    };
    const onTypeError = (err: number = 1) => {
        notifyError(`${err}` || "File type is not supported.")

    }

    const onSizeError = (err: number = 1) => console.log(err);

    const handleDeletedFiles = (index: number) => {
        const arr = [...files];
        arr.splice(index, 1);
        setFiles(arr);
    };

    return {
        files,
        setFiles,
        responseMessage,
        isChatEnabled,
        setChatEnabled,
        handleChange,
        onDrop,
        onSelect,
        onTypeError,
        onSizeError,
        handleDeletedFiles,
    };
};

export default useFileUpload;
