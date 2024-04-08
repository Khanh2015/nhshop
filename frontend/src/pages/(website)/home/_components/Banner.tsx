type BannerProps = {
    title: string;
    subTitle: string;
};

const Banner = ({ title, subTitle }: BannerProps) => {
    return (
        <section className="banner">
            <div className="relative">
                <img src="/src/assets/banner.png" alt="" className="w-full" />
                <div className="absolute flex flex-col items-center gap-[100px] w-full top-[50%] translate-y-[-50%]">
                    <h1 className="text-[48px] font-medium">{title}</h1>
                    <span className="font-medium">{subTitle}</span>
                </div>
            </div>
        </section>
    );
};

export default Banner;
