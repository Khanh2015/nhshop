import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { IProduct } from "@/common/types/product";
import { addProduct } from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/common/lib/utils";
import { useState } from "react";
import axios from "axios";
import { ICategory } from "@/common/types/category";
import { getAllCategories } from "@/services/category";
import { useNavigate } from "react-router-dom";

type Inputs = {
    name: string;
    price: number;
    category: string;
    gallery: string[];
    image: string;
    description: string;
    discount: number;
    countInStock: number;
    featured: boolean;
};

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Tên sản phẩm không được để trống",
        "string.base": "Tên sản phẩm phải là chữ cái",
        "any.required": "Tên sản phẩm là bắt buộc",
    }),
    price: Joi.number().min(0).required().messages({
        "number.empty": "Giá sản phẩm không được để trống",
        "any.required": "Giá sản phẩm là bắt buộc",
        "number.base": "Giá sản phẩm phải là số",
        "number.min": "Giá sản phẩm phải lớn hơn hoặc bằng 0",
    }),
    category: Joi.string().required().messages({
        "string.base": "Danh mục sản phẩm phải là chữ cái",
        "string.empty": "Danh mục sản phẩm không được để trống",
        "any.required": "Danh mục sản phẩm là bắt buộc",
    }),
    gallery: Joi.array().items(Joi.string()).messages({
        "array.base": "Danh sách ảnh sản phẩm phải là mảng",
        "string.base": "Ảnh sản phẩm phải là chuỗi",
    }),
    image: Joi.string().allow("").messages({
        "string.base": "Ảnh sản phẩm phải là chuỗi",
    }),
    description: Joi.string().allow("").messages({
        "string.base": "Mô tả sản phẩm phải là chuỗi",
    }),
    discount: Joi.number().min(0).messages({
        "number.base": "Giảm giá sản phẩm phải là số",
        "number.min": "Giảm giá sản phẩm phải lớn hơn hoặc bằng 0",
    }),
    featured: Joi.boolean(),
    countInStock: Joi.number().min(0).messages({
        "number.base": "Số lượng sản phẩm phải là số",
        "number.min": "Số lượng sản phẩm phải lớn hơn hoặc bằng 0",
    }),
});

const AddProductPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [gallery, setGallery] = useState<any[]>([]);
    const [image, setImage] = useState<string>("");
    const form = useForm({
        resolver: joiResolver(productSchema),
        defaultValues: {
            name: "",
            price: 0,
            category: "",
            gallery: [],
            image: "",
            description: "",
            discount: 0,
            countInStock: 0,
            featured: false,
        },
    });

    const { data: categories } = useQuery({
        queryKey: ["CATEGORY_KEY"],
        queryFn: () => getAllCategories(),
    });

    const mutation = useMutation({
        mutationFn: (product: IProduct) => addProduct(product),
        onSuccess: () => {
            form.reset();
            toast({
                title: "Thêm sản phẩm thành công!",
                variant: "success",
            });
            navigate("/admin/products");
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (product: IProduct) => {
        const newGallery = gallery.map((item) => item.url);
        mutation.mutate({ ...product, gallery: newGallery, image: image });
    };
    return (
        <div className="bg-gray-100">
            <h1 className="text-center font-bold text-3xl py-5">Add product</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 p-10"
                >
                    <div className="grid grid-cols-3 gap-5 items-end">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel htmlFor="name">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel htmlFor="price">
                                            Price
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel htmlFor="category">
                                            Category
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                            >
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories?.map(
                                                        (
                                                            category: ICategory,
                                                            index: number,
                                                        ) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={
                                                                    category._id as string
                                                                }
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel htmlFor="image">Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            {...field}
                                            onChange={async (e) => {
                                                const files = Array.from(
                                                    e.target.files as FileList,
                                                );
                                                const results =
                                                    await Promise.all(
                                                        files.map((file) =>
                                                            uploadFile(file),
                                                        ),
                                                    );
                                                setImage(results[0].secure_url);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    {image && (
                        <img src={image} alt="" className="w-[150px] border" />
                    )}

                    <FormField
                        control={form.control}
                        name="gallery"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel htmlFor="gallery">
                                        Gallery
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            multiple
                                            {...field}
                                            onChange={async (e) => {
                                                const files = Array.from(
                                                    e.target.files as FileList,
                                                );
                                                const results =
                                                    await Promise.all(
                                                        files.map((file) =>
                                                            uploadFile(file),
                                                        ),
                                                    );
                                                setGallery(results);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    {gallery?.map((item, index) => {
                        return (
                            <div className="inline-block border mx-2">
                                <img
                                    key={index}
                                    src={item.url}
                                    alt=""
                                    className="w-[150px]"
                                />
                            </div>
                        );
                    })}

                    <div className="grid grid-cols-3 gap-5 items-end">
                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel htmlFor="discount">
                                            Discount
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="countInStock"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel htmlFor="countInStock">
                                            Count In Stock
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="featured"
                            render={({ field }) => {
                                return (
                                    <FormItem className="bg-white flex items-end p-4 h-fit space-x-3 space-y-0 rounded-md border">
                                        <div className="leading-none">
                                            <FormLabel>Featured?</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel htmlFor="description">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <Button variant="destructive" type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddProductPage;
