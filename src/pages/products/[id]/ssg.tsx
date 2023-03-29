import type { InferGetServerSidePropsType } from "next";
type TodosProps = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export default function SSGPage<NextPage>({ data }: any) {
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
        <h1>Server Static Props</h1>
        <h3>Tareas:</h3>
        <div>
          <h4>Title: {data.title}</h4>
          <h5>UserID: {data.userId}</h5>
        </div>
      </section>
    </>
  );
}
const pullData = async (id: string) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/" + id);
  const data: TodosProps = await res.json();
  return data;
};
export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "10" } },
      { params: { id: "11" } },
      { params: { id: "12" } },
      { params: { id: "13" } },
    ],
    fallback: "blocking",
  };
};
export const getStaticProps = async (context: any) => {
  const data: TodosProps = await pullData(context.params.id as string);
  return {
    props: { data },
  };
};
