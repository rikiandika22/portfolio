interface AboutStatementProps {
  className?: string;
}

export default function AboutStatement({ className = "" }: AboutStatementProps) {
  return (
    <div className={`about-animate-statement ${className}`}>
      <p className="text-sm sm:text-base lg:text-xl font-extrabold leading-[1.4] text-base-dark tracking-normal uppercase max-w-sm sm:max-w-md">
        I COMBINE THOUGHTFUL DESIGN
        <br />
        AND STRUCTURED DEVELOPMENT
        <br />
        TO CREATE USEFUL DIGITAL PRODUCTS.
      </p>
    </div>
  );
}
