import { useState, useRef, useCallback } from "react";
import { useField, useFormikContext } from "formik";
import { Upload, X, Grid3X3, Rows, GripVertical } from "lucide-react";
import { upload_to_s3 } from "@/lib/api/endpoints/s3";

type LayoutMode = "full" | "grid";

export default function ImageDropZone({
    name,
    multiple = false,
    maxFiles = 1,
    accept = "image/*",
    defaultLayout = "grid",
    uploadPrefix,
}: {
    name: string;
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    defaultLayout?: LayoutMode;
    uploadPrefix?: string;
}) {
    const [field, meta, helpers] = useField<string | string[]>(name);
    const { getFieldProps } = useFormikContext();
    const [isDragging, setIsDragging] = useState(false);
    const [layout, setLayout] = useState<LayoutMode>(defaultLayout);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    let images: string[] = [];
    if (multiple) {
        images = (field.value as string[]) || [];
    } else if (field.value) {
        images = [field.value as string];
    }

    const handleFiles = useCallback(
        async (files: File[]) => {
            const imageFiles = files.filter((file) => file.type.startsWith("image/"));
            if (imageFiles.length === 0) return;

            if (!multiple && imageFiles.length > 0) {
                const publicUrl = await upload_to_s3(imageFiles[0], uploadPrefix);
                helpers.setValue(publicUrl);
            } else if (multiple) {
                const currentFieldProps = getFieldProps(name);
                const currentImages = (currentFieldProps.value as string[]) || [];
                const remainingSlots = maxFiles - currentImages.length;
                const filesToProcess = imageFiles.slice(0, remainingSlots);

                if (filesToProcess.length === 0) return;

                try {
                    const uploadedUrls = await Promise.all(
                        filesToProcess.map((file) => upload_to_s3(file))
                    );

                    const latestFieldProps = getFieldProps(name);
                    const latestImages = (latestFieldProps.value as string[]) || [];
                    helpers.setValue([...latestImages, ...uploadedUrls]);
                } catch (err) {
                    console.error(err);
                }
            }
        },
        [helpers, maxFiles, multiple, getFieldProps, name]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const files = Array.from(e.dataTransfer.files);
                handleFiles(files);
            }
        },
        [handleFiles]
    );

    const removeImage = (index: number) => {
        if (multiple) {
            const newImages = [...(field.value as string[])];
            newImages.splice(index, 1);
            helpers.setValue(newImages);
        } else {
            helpers.setValue("");
        }
    };

    const handleImageDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleImageDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null) return;
        setDragOverIndex(index);
    };

    const handleImageDragEnd = () => {
        if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
            const newImages = [...(field.value as string[])];
            const draggedImage = newImages[draggedIndex];

            newImages.splice(draggedIndex, 1);

            if (dragOverIndex > draggedIndex) {
                newImages.splice(dragOverIndex - 1, 0, draggedImage);
            } else {
                newImages.splice(dragOverIndex, 0, draggedImage);
            }

            helpers.setValue(newImages);
        }

        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const canAddMore = multiple ? images.length < maxFiles : images.length === 0;

    return (
        <div className="flex flex-col w-full gap-4">
            {canAddMore && (
                <div
                    className={`flex flex-col min-h-22.5 py-8 items-center justify-center gap-2 bg-gray-1 border border-gray-1 rounded-[10px] transition-all cursor-pointer hover:bg-orange-light-1/50 ${
                        isDragging ? "border-orange-main bg-orange-light-1" : ""
                    }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        if (draggedIndex === null) {
                            setIsDragging(true);
                        }
                    }}
                    onDragLeave={() => {
                        if (draggedIndex === null) {
                            setIsDragging(false);
                        }
                    }}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone"
                    role="button"
                    data-name="컴퓨터에서 업로드"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            handleFiles(files);
                        }}
                        className="hidden"
                    />

                    <div className="flex items-center justify-center gap-2.5">
                        <Upload className="size-4 text-gray-4" />
                        <p className="body3_r text-gray-4">컴퓨터에서 업로드</p>
                    </div>

                    {multiple && images.length > 0 && (
                        <p className="body4_r text-gray-4">
                            {images.length}/{maxFiles}개 업로드됨
                        </p>
                    )}
                </div>
            )}

            {images.length > 0 && (
                <>
                    {multiple && images.length > 1 && (
                        <div className="flex items-center justify-between">
                            <p className="flex items-center gap-1 text-sm text-gray-500">
                                <GripVertical className="w-4 h-4" />
                                드래그하여 순서 변경
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setLayout("full")}
                                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                        layout === "full"
                                            ? "bg-gray-200 text-gray-700"
                                            : "text-gray-400 hover:text-gray-600"
                                    }`}
                                    title="Full width view"
                                >
                                    <Rows className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLayout("grid")}
                                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                        layout === "grid"
                                            ? "bg-gray-200 text-gray-700"
                                            : "text-gray-400 hover:text-gray-600"
                                    }`}
                                    title="Grid view"
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {layout === "full" && (
                        <div className="flex flex-col">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`relative group overflow-hidden ${
                                        multiple ? "cursor-move" : ""
                                    } ${
                                        dragOverIndex === index && draggedIndex !== index
                                            ? "ring-2 ring-orange-main ring-offset-2"
                                            : ""
                                    }`}
                                    style={{
                                        marginBottom: index < images.length - 1 ? "1px" : "0",
                                        opacity: draggedIndex === index ? 0.5 : 1,
                                    }}
                                    draggable={multiple}
                                    onDragStart={() => handleImageDragStart(index)}
                                    onDragOver={(e) => handleImageDragOver(e, index)}
                                    onDragEnd={handleImageDragEnd}
                                >
                                    <img
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        className="object-cover w-full h-auto"
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 transition-all duration-300 bg-black/0 group-hover:bg-black/50" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute p-2 transition-all duration-300 rounded-full shadow-lg opacity-0 cursor-pointer top-4 right-4 bg-white/90 backdrop-blur-sm group-hover:opacity-100 hover:bg-white"
                                    >
                                        <X className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <div className="absolute transition-opacity duration-300 opacity-0 bottom-4 left-4 group-hover:opacity-100">
                                        <p className="px-3 py-1 text-sm font-medium text-white rounded-full bg-black/50 backdrop-blur-sm">
                                            {index + 1} / {images.length}
                                        </p>
                                    </div>
                                    {multiple && (
                                        <div className="absolute transition-opacity duration-300 opacity-0 top-4 left-4 group-hover:opacity-100">
                                            <div className="p-2 text-white rounded-full bg-black/50 backdrop-blur-sm">
                                                <GripVertical className="w-5 h-5" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {layout === "grid" && (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`relative group aspect-square overflow-hidden rounded-[8px] ${
                                        multiple ? "cursor-move" : ""
                                    } ${
                                        dragOverIndex === index && draggedIndex !== index
                                            ? "ring-2 ring-orange-main"
                                            : ""
                                    }`}
                                    style={{
                                        opacity: draggedIndex === index ? 0.5 : 1,
                                    }}
                                    draggable={multiple}
                                    onDragStart={() => handleImageDragStart(index)}
                                    onDragOver={(e) => handleImageDragOver(e, index)}
                                    onDragEnd={handleImageDragEnd}
                                >
                                    <img
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 transition-all duration-300 bg-black/0 group-hover:bg-black/50" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white cursor-pointer"
                                    >
                                        <X className="w-4 h-4 text-gray-700" />
                                    </button>
                                    <div className="absolute transition-opacity duration-300 opacity-0 bottom-4 left-4 group-hover:opacity-100">
                                        <p className="px-3 py-1 text-sm font-medium text-white rounded-full bg-black/50 backdrop-blur-sm">
                                            {index + 1} / {images.length}
                                        </p>
                                    </div>
                                    {multiple && (
                                        <div className="absolute transition-opacity duration-300 opacity-0 top-2 left-2 group-hover:opacity-100">
                                            <div className="text-white bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                                                <GripVertical className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {meta.touched && meta.error && (
                <p className="body5_r text-red-500 mt-2.5">{meta.error}</p>
            )}
        </div>
    );
}
