import type { NextPageContext, InferGetServerSidePropsType } from "next";
type ProductProps = {
  id: string;
  price: number;
  title: string;
  stock: number;
  description: string;
};
export default function SSRPage<NextPage>({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <section
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "5px",
          fontFamily: "sans-serif",
          padding: "10px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          border: "solid 1px white",
        }}
      >
        <h1>Server side rendering</h1>
        <h3>
          <span>Producto: </span>
          {data.title}
        </h3>
        <p>Descripcion: {data.description}</p>
        <div>
          <h3>Precio: ${data.price}</h3>
        </div>
      </section>
    </>
  );
}
export const getServerSideProps = async (context: NextPageContext) => {
  const id = context.query.id;
  const res = await fetch(
    `https://backend-e-comerce.vercel.app/api/products/${id}`
  );
  const data: ProductProps = await res.json();
  return {
    props: { data },
  };
};
