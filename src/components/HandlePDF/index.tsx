import React, {useEffect, useState} from "react";
import {pdfjs} from "react-pdf";
import {UploadProps, message, Card, Button, Spin} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import {PDFDocument} from "pdf-lib";
import {handlePDF} from "../../api/instance.ts";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const HandlePDF: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [newFilePath, setNewFilePath] = useState("")
    const [finished, setFinished] = useState(false)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        if (file) {
            message.success(`${fileName} 上传成功`).then();
            setUpdating(true)

            modifyPDF(file); // 调用 modifyPDF 函数并传递文件作为参数
        }
    }, [file]);

    const modifyPDF = async (pdfFile: File) => {
        try {
            const pdfBuffer = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBuffer, {ignoreEncryption: true})

            const modifiedPdfBytes = await pdfDoc.save();
            const bytes = Array.from(modifiedPdfBytes)

            handlePDF({
                pdfBytes: bytes
            }).then((res) => {
                setNewFilePath(res.data)
                setFinished(true)
                setUpdating(false)
                message.success("PDF处理完成")
            })

        } catch (error) {
            console.error('修改PDF文本颜色时出错:', error);
        }
    };

    const handleFileLinkClick = () => {
        if (newFilePath) {
            window.open ( "http://localhost:3000/public/pdf_highlighted.pdf")
        }
    };


    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        beforeUpload(file: File) {
            setFile(file);
            setFileName(file.name);
            return false;
        },
        onRemove() {
            setFile(null);
            setFileName("");
        },
    };

    return (
        <div>
            {file && finished && !updating? (
                <Card
                    title={<p>成功处理后的PDF</p>}
                    extra={<a onClick={()=>{
                        setFile(null);
                        setFileName("");
                        setNewFilePath("")
                        setFinished(false)
                    }}>清除</a>}
                >
                    <Button onClick={handleFileLinkClick}>{fileName}</Button>
                </Card>
            ) : updating ?
                <Spin />:
                (
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                        <p className="ant-upload-hint">
                            支持单个文件上传。严禁上传公司数据或其他被禁止的文件。
                        </p>
                    </Dragger>
                ) }
        </div>
    );
};

export default HandlePDF;
