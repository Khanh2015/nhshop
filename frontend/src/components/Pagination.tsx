import { Link, useSearchParams } from "react-router-dom";

type PaginationProps = {
    totalPages: number;
};

const Pagination = ({ totalPages }: PaginationProps) => {
    const [params] = useSearchParams();
    const page = params.get("page");
    return (
        <div className="pagination flex justify-center items-center my-10">
            {Array.from({ length: totalPages }, (_, i) => (
                <Link
                    key={i + 1}
                    to={`?page=${i + 1}`}
                    className={
                        parseInt(page || "1") === i + 1
                            ? "py-2 px-5 ml-1 rounded border bg-[#fed39b] font-semibold text-lg"
                            : "py-2 px-5 ml-1 rounded border bg-[#fbecd9] font-semibold text-lg"
                    }
                >
                    {i + 1}
                </Link>
            ))}
        </div>
    );
};

export default Pagination;
