import Form from "./form";

export default function Page() {
  return (
    <article className="w-full flex flex-row justify-center items-start mt-10 px-10">
      <div className="w-1/3 h-[35rem] bg-white">
      </div>
      <section className="w-[66%]">
        <Form />
      </section>

    </article>

  );
}
